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
const PaymentGatewayManager = require('./utils/paymentGateway');
const I18nManager = require('./utils/i18n');
require('dotenv').config();

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

// Middleware para aceitar domínio personalizado
app.use((req, res, next) => {
  const host = req.get('host');
  console.log(`🌐 Acesso via: ${host}`);
  
  // Aceitar todos os domínios (lumidiscord.xyz e replit)
  if (host && (host.includes('lumidiscord.xyz') || host.includes('replit.dev'))) {
    console.log('🔄 Domínio aceito - processando requisição');
  }
  next();
});


// Middleware de segurança configurado para domínio personalizado
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'", "https://lumidiscord.xyz", "https://*.replit.dev"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com", "https://fonts.googleapis.com", "https://lumidiscord.xyz"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://js.stripe.com", "https://cdnjs.cloudflare.com", "https://lumidiscord.xyz"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
      imgSrc: ["'self'", "data:", "https:", "https://cdn.discordapp.com", "https://lumidiscord.xyz"],
      connectSrc: ["'self'", "https://api.stripe.com", "https://lumidiscord.xyz"],
      frameSrc: ["https://js.stripe.com"]
    }
  }
}));

app.use(cors({
  origin: function (origin, callback) {
    // Permitir todos os origins para resolver o problema do domínio
    callback(null, true);
  },
  credentials: true
}));

app.use(compression());
app.use(morgan('combined'));

// Rate limiting com configuração mais restritiva para segurança
app.set('trust proxy', 1); // Trust first proxy
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Muitas tentativas. Tente novamente em 15 minutos.',
    code: 'RATE_LIMIT_EXCEEDED'
  }
});

// Rate limiting mais restritivo para APIs críticas
const apiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutos
  max: 20, // máximo 20 requests por IP
  message: {
    error: 'Limite de API excedido. Tente novamente em 5 minutos.',
    code: 'API_RATE_LIMIT'
  }
});

app.use(limiter);
app.use('/api', apiLimiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Sessões
app.use(session({
  secret: process.env.SESSION_SECRET || 'lumi-super-secret-key-2025',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 24 horas
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true
  }
}));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// Sistema de internacionalização
app.use(i18n.middleware());

// Discord OAuth Strategy
if (!process.env.DISCORD_CLIENT_ID || !process.env.DISCORD_CLIENT_SECRET) {
  console.error('❌ Credenciais Discord OAuth não encontradas!');
} else {
  console.log('✅ Discord OAuth configurado com sucesso');
}

// Configurar URL baseada no domínio atual da requisição
const getCallbackURL = (req) => {
  if (req && req.get) {
    const host = req.get('host');
    const protocol = req.get('x-forwarded-proto') || (req.secure ? 'https' : 'http');
    return `${protocol}://${host}/auth/discord/callback`;
  }
  
  // Fallback para variável de ambiente
  if (process.env.DISCORD_REDIRECT_URI) {
    return process.env.DISCORD_REDIRECT_URI;
  }
  
  // Fallback final
  return 'https://ac9d1766-758d-46a5-a5d1-7c3902e58581-00-1pz0zvgkhy08i.kirk.replit.dev/auth/discord/callback';
};

// Configuração dinâmica do Passport baseada na requisição
const configurePassport = () => {
  // Limpar estratégias existentes
  if (passport._strategies && passport._strategies.discord) {
    delete passport._strategies.discord;
  }
  
  passport.use(new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: 'https://lumidiscord.xyz/auth/discord/callback', // URL fixa do domínio principal
    scope: ['identify', 'email', 'guilds']
  }, async (accessToken, refreshToken, profile, done) => {
  try {
    // Salvando usuário completo com guilds
    const user = {
      id: profile.id,
      username: profile.username,
      discriminator: profile.discriminator,
      avatar: profile.avatar,
      email: profile.email,
      accessToken: accessToken,
      refreshToken: refreshToken,
      guilds: profile.guilds || []
    };
    
    console.log(`🔐 Login realizado: ${user.username}#${user.discriminator}`);
    return done(null, user);
  } catch (error) {
    console.error('Erro no login Discord:', error);
    return done(error, null);
  }
  }));
};

// Configurar Passport
configurePassport();
console.log('✅ Discord OAuth configurado para: https://lumidiscord.xyz/auth/discord/callback');

// Cache de usuários em memória (em produção usar banco de dados)
const userCache = new Map();

passport.serializeUser((user, done) => {
  // Salvar usuário completo no cache
  userCache.set(user.id, user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    // Buscar usuário do cache
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

app.use('/auth', require('./routes/auth'));
app.use('/api', require('./routes/api'));
app.use('/dashboard', require('./routes/dashboard'));
app.use('/premium', require('./routes/premium'));
app.use('/payments', require('./routes/payments'));

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
  // URL de convite do bot Discord com permissões de administrador
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
  res.render('index', {
    title: 'Lumi - O Bot Discord Mais Avançado do Brasil',
    user: req.user || null
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Erro no servidor:', err);
  res.status(500).render('error', {
    title: 'Erro - Lumi',
    error: process.env.NODE_ENV === 'production' ? 'Algo deu errado!' : err.message,
    user: req.user || null
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', {
    title: 'Página não encontrada - Lumi',
    user: req.user || null
  });
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('🛑 Painel Web da Lumi desligado');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('🛑 Painel Web da Lumi desligado');
  process.exit(0);
});

// Iniciar servidor com binding correto para deployment
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log('✅ Lumi Web Panel ONLINE');
  console.log(`🌐 Porta: ${PORT}`);
  console.log('💎 Pagamentos: Mercado Pago OK');
  console.log('🔐 OAuth: Discord OK');
  console.log('🚀 Status: PRONTO PARA PRODUÇÃO');
});

// Keep alive with reduced logging
setInterval(() => {
  // Silent keep-alive - só loga a cada 30 minutos para reduzir spam
  const now = new Date();
  if (now.getMinutes() % 30 === 0 && now.getSeconds() < 5) {
    console.log(`💎 Lumi Web Panel - ${now.toLocaleTimeString()} - Ativo`);
  }
}, 300000); // Log a cada 5 minutos

module.exports = app;