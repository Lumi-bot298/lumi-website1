const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração básica
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session simples para serverless
app.use(session({
  secret: process.env.SESSION_SECRET || 'lumi-secret-2025',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 
  }
}));

// Cache simples para usuários
const userCache = new Map();

// Configurar Discord OAuth
passport.use(new DiscordStrategy({
  clientID: process.env.DISCORD_CLIENT_ID,
  clientSecret: process.env.DISCORD_CLIENT_SECRET,
  callbackURL: process.env.DISCORD_REDIRECT_URI || 'https://www.lumidiscord.xyz/auth/discord/callback',
  scope: ['identify', 'email', 'guilds']
}, (accessToken, refreshToken, profile, done) => {
  const userData = {
    id: profile.id,
    username: profile.username,
    avatar: profile.avatar,
    email: profile.email,
    guilds: profile.guilds || []
  };
  userCache.set(profile.id, userData);
  return done(null, userData);
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  const user = userCache.get(id);
  done(null, user || false);
});

app.use(passport.initialize());
app.use(passport.session());

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'Lumi Website' });
});

// Auth routes
app.get('/auth/discord', passport.authenticate('discord'));

app.get('/auth/discord/callback', 
  passport.authenticate('discord', { failureRedirect: '/oauth-error' }),
  (req, res) => res.redirect('/dashboard')
);

app.get('/logout', (req, res) => {
  req.logout(() => res.redirect('/'));
});

// Main routes
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Lumi - O Bot Discord Mais Avançado do Brasil',
    user: req.user || null
  });
});

app.get('/dashboard', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/auth/discord');
  }
  res.render('dashboard', {
    title: 'Dashboard - Lumi',
    user: req.user
  });
});

app.get('/premium/plans', (req, res) => {
  res.render('premium/plans', {
    title: 'Planos Premium - Lumi',
    user: req.user || null
  });
});

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

// Error handlers
app.get('/oauth-error', (req, res) => {
  res.render('oauth-error', { 
    title: 'Erro de Autenticação - Lumi',
    user: null
  });
});

app.use((req, res) => {
  res.status(404).render('404', {
    title: '404 - Página não encontrada',
    user: req.user || null
  });
});

// Para desenvolvimento local
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Lumi website running on port ${PORT}`);
  });
}

module.exports = app;