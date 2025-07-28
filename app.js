const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');
const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

// Criar classes simplificadas para evitar dependências externas
class PaymentGatewayManager {
  constructor() {
    this.gateways = ['mercadopago'];
  }
  
  convertPrice(plan, currency = 'BRL') {
    const prices = {
      premium: { BRL: 9.90, USD: 1.99, EUR: 1.79 },
      vitalicio: { BRL: 79.90, USD: 15.99, EUR: 14.99 }
    };
    return prices[plan]?.[currency] || prices[plan]?.BRL || 0;
  }
  
  getAvailableGateways(country = 'BR') {
    return country === 'BR' ? ['mercadopago'] : ['stripe'];
  }
}

class I18nManager {
  constructor() {
    this.languages = ['pt-BR', 'en-US'];
  }
  
  detectLanguage(req) {
    return req.headers['accept-language']?.includes('pt') ? 'pt-BR' : 'en-US';
  }
  
  t(key, lang = 'pt-BR') {
    const translations = {
      'pricing.title': lang === 'pt-BR' ? 'Preços' : 'Pricing'
    };
    return translations[key] || key;
  }
}

// Configurar Mercado Pago diretamente
process.env.MERCADOPAGO_ACCESS_TOKEN = 'APP_USR-5969941047594277-072320-3fc5aed7b0ad7b2151d05821111b6c72-661679798';

const app = express();
const PORT = parseInt(process.env.PORT) || 5000;

// Inicializar sistemas internacionais
const paymentGateway = new PaymentGatewayManager();
const i18n = new I18nManager();

// Health check endpoint para deployment
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'Lumi Web Panel'
  });
});

// Middleware básico para serverless
app.use((req, res, next) => {
  const host = req.get('host');
  console.log(`🌐 Acesso via: ${host}`);
  next();
});

// Middleware de segurança mínimo para serverless
app.use(helmet({
  contentSecurityPolicy: false // Desabilitar CSP complexo para evitar problemas
}));

app.use(cors({
  origin: true, // Permitir todos os origins
  credentials: true
}));

app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting básico
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // 100 requests por IP
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Middleware para log
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('combined'));
}

// Middleware internacional
app.use((req, res, next) => {
  const country = req.get('cf-ipcountry') || 'BR';
  const language = i18n.detectLanguage(req);
  
  res.locals.country = country;
  res.locals.language = language;
  res.locals.currency = country === 'BR' ? 'BRL' : 'USD';
  res.locals.t = (key) => i18n.t(key, language);
  
  next();
});

// Session configuration para Vercel serverless
app.use(session({
  secret: process.env.SESSION_SECRET || 'lumi-secret-key-ultra-seguro-2025',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 24 horas
  }
}));

// Configurar Passport
function configurePassport() {
  // Limpar estratégia existente para evitar duplicação
  if (passport._strategies && passport._strategies.discord) {
    delete passport._strategies.discord;
  }
  
  passport.use(new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: process.env.DISCORD_REDIRECT_URI || 'https://www.lumidiscord.xyz/auth/discord/callback',
    scope: ['identify', 'email', 'guilds']
  }, async (accessToken, refreshToken, profile, done) => {
  try {
    // Salvando usuário completo com guilds
    const userData = {
      id: profile.id,
      username: profile.username,
      discriminator: profile.discriminator,
      avatar: profile.avatar,
      email: profile.email,
      verified: profile.verified,
      guilds: profile.guilds || [],
      accessToken: accessToken,
      refreshToken: refreshToken
    };
    
    console.log(`✅ Login Discord: ${userData.username}#${userData.discriminator}`);
    return done(null, userData);
  } catch (error) {
    console.error('Erro no Discord OAuth:', error);
    return done(error, null);
  }
}));
};

// Configurar Passport
configurePassport();
console.log('✅ Discord OAuth configurado para serverless');

// Cache de usuários simples para serverless
const userCache = new Map();

passport.serializeUser((user, done) => {
  userCache.set(user.id, user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = userCache.get(id);
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  } catch (error) {
    done(error, null);
  }
});

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Favicon route
app.get('/favicon.ico', (req, res) => {
  res.setHeader('Content-Type', 'image/png');
  res.sendFile(path.join(__dirname, 'public', 'images', 'lumi-avatar.png'));
});

// Routes
// Rota de login personalizada
app.get('/login', (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/dashboard');
  }
  res.render('login', { 
    title: 'Login - Lumi',
    returnTo: req.query.returnTo || '/dashboard'
  });
});

// Auth routes diretamente no app principal
app.get('/auth/discord', passport.authenticate('discord'));

app.get('/auth/discord/callback', 
  passport.authenticate('discord', { failureRedirect: '/oauth-error' }),
  (req, res) => {
    console.log('✅ Login Discord realizado com sucesso');
    res.redirect('/dashboard');
  }
);

app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) console.error('Erro no logout:', err);
    res.redirect('/');
  });
});

// Dashboard route
app.get('/dashboard', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/auth/discord');
  }
  
  res.render('dashboard', {
    title: 'Dashboard - Lumi',
    user: req.user
  });
});

// Premium routes
app.get('/premium/plans', (req, res) => {
  res.render('premium/plans', {
    title: 'Planos Premium - Lumi',
    user: req.user || null
  });
});

app.get('/premium/demo', (req, res) => {
  res.render('premium/demo', {
    title: 'Demo Premium - Lumi',
    user: req.user || null
  });
});

// Support and Documentation pages
app.get('/support', (req, res) => {
  res.render('support', { 
    title: 'Suporte - Lumi',
    user: req.user || null
  });
});

app.get('/docs', (req, res) => {
  res.render('docs', { 
    title: 'Documentação - Lumi',
    user: req.user || null
  });
});

// OAuth Error page
app.get('/oauth-error', (req, res) => {
  res.render('oauth-error', { 
    title: 'Erro de Autenticação - Lumi',
    user: null
  });
});

// Invite route - Redirects to Discord bot invite
app.get('/invite', (req, res) => {
  const botClientId = process.env.DISCORD_CLIENT_ID;
  if (botClientId) {
    const inviteURL = `https://discord.com/api/oauth2/authorize?client_id=${botClientId}&permissions=8&scope=bot%20applications.commands`;
    res.redirect(inviteURL);
  } else {
    res.redirect('/');
  }
});

// Rota internacional de planos
app.get('/international-plans', (req, res) => {
  const convertedPrices = {
    premium: paymentGateway.convertPrice('premium', res.locals.currency),
    vitalicio: paymentGateway.convertPrice('vitalicio', res.locals.currency)
  };
  
  const availableGateways = paymentGateway.getAvailableGateways(res.locals.country);
  
  res.render('premium/international-plans', { 
    title: res.locals.t('pricing.title') + ' - Lumi',
    user: req.user || null,
    convertedPrices: convertedPrices,
    availableGateways: availableGateways
  });
});

// Home route
app.get('/', (req, res) => {
  try {
    const host = req.get('host') || 'unknown';
    console.log(`🏠 Requisição para página inicial de: ${host}`);
    
    res.render('index', {
      title: 'Lumi - O Bot Discord Mais Avançado do Brasil',
      user: req.user || null
    });
  } catch (error) {
    console.error('Erro na página inicial:', error);
    res.status(500).render('error', {
      title: 'Erro - Lumi',
      error: 'Erro interno do servidor',
      user: null
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', {
    title: '404 - Página não encontrada',
    user: req.user || null
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Erro:', err);
  res.status(500).render('error', {
    title: 'Erro - Lumi',
    error: process.env.NODE_ENV === 'production' ? 'Erro interno do servidor' : err.message,
    user: req.user || null
  });
});

// Servidor
if (!module.parent) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log('✅ Lumi Web Panel ONLINE');
    console.log(`🌐 Porta: ${PORT}`);
    console.log('🚀 Status: PRONTO PARA PRODUÇÃO');
  });
}

module.exports = app;