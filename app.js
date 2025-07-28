const express = require('express');
const session = require('express-session');
const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');

// Load environment variables
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security and compression middleware
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));
app.use(compression());
app.use(cors());

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration for Vercel
app.use(session({
  secret: process.env.SESSION_SECRET || 'lumi-session-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());

// Discord OAuth Strategy
if (process.env.DISCORD_CLIENT_ID && process.env.DISCORD_CLIENT_SECRET) {
  passport.use(new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: process.env.DISCORD_REDIRECT_URI || '/auth/discord/callback',
    scope: ['identify', 'email', 'guilds']
  }, async (accessToken, refreshToken, profile, done) => {
    try {
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
}

// Passport serialization
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

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para detectar domínio e SSL
app.use((req, res, next) => {
  const host = req.get('host');
  console.log(`🌐 Acesso via: ${host}`);
  
  // Detector de problemas SSL/domínio
  if (host && host.includes('lumidiscord.xyz')) {
    console.log('⚠️ ATENÇÃO: Acesso via lumidiscord.xyz - possível problema SSL');
    
    const protocol = req.get('x-forwarded-proto') || (req.secure ? 'https' : 'http');
    if (protocol === 'https') {
      console.log('🔒 SSL detectado - pode estar causando erro');
    }
  }
  
  console.log('🔄 Domínio aceito - processando requisição');
  next();
});

// Routes
app.get('/', (req, res) => {
  try {
    const host = req.get('host') || 'unknown';
    console.log(`🏠 Requisição para página inicial de: ${host}`);
    
    res.render('index', {
      title: 'Lumi - O Bot Discord Mais Avançado do Brasil',
      user: req.user || null
    });
  } catch (error) {
    console.error('❌ Erro na rota principal:', error);
    res.status(500).send('<h1>Erro Temporário</h1><p>Por favor, tente novamente em alguns instantes.</p>');
  }
});

// Auth routes
app.get('/auth/discord', passport.authenticate('discord'));

app.get('/auth/discord/callback', 
  passport.authenticate('discord', { failureRedirect: '/oauth-error' }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) console.error('Erro no logout:', err);
    res.redirect('/');
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

// Support and docs
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

// Invite route
app.get('/invite', (req, res) => {
  const botClientId = process.env.DISCORD_CLIENT_ID;
  if (botClientId) {
    const inviteURL = `https://discord.com/api/oauth2/authorize?client_id=${botClientId}&permissions=8&scope=bot%20applications.commands`;
    res.redirect(inviteURL);
  } else {
    res.redirect('/');
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error('❌ ERRO CRÍTICO DO SERVIDOR:', err);
  console.error('📍 URL:', req.url);
  console.error('🌐 Host:', req.get('host'));
  
  try {
    res.status(500).render('error', {
      title: 'Erro - Lumi',
      error: process.env.NODE_ENV === 'production' ? 'Algo deu errado!' : err.message,
      user: req.user || null
    });
  } catch (renderError) {
    console.error('❌ Erro ao renderizar página de erro:', renderError);
    res.status(500).send(`<h1>Erro do Servidor</h1><p>${err.message}</p>`);
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', {
    title: 'Página não encontrada - Lumi',
    user: req.user || null
  });
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log('✅ Lumi Web Panel ONLINE');
    console.log(`🌐 Porta: ${PORT}`);
    console.log('🔐 OAuth: Discord OK');
    console.log('🚀 Status: PRONTO PARA PRODUÇÃO');
  });
}

module.exports = app;