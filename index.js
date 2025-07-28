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

// Session configurada para Vercel serverless
app.use(session({
  secret: process.env.SESSION_SECRET || 'lumi-secret-2025',
  resave: false,
  saveUninitialized: false,
  name: 'lumi.sid',
  cookie: { 
    secure: false, // Forçar false para debug
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: 'lax'
  }
}));

// Cache simples para usuários
const userCache = new Map();

// Detectar ambiente automaticamente
const isProduction = process.env.NODE_ENV === 'production';
const baseURL = isProduction ? 'https://www.lumidiscord.xyz' : `https://${process.env.REPL_ID || 'ac9d1766-758d-46a5-a5d1-7c3902e58581-00-1pz0zvgkhy08i'}.kirk.replit.dev`;

console.log('🔧 Configurando OAuth para:', baseURL);

// Configurar Discord OAuth com detecção automática
passport.use(new DiscordStrategy({
  clientID: process.env.DISCORD_CLIENT_ID,
  clientSecret: process.env.DISCORD_CLIENT_SECRET,
  callbackURL: `${baseURL}/auth/discord/callback`,
  scope: ['identify', 'email']
}, (accessToken, refreshToken, profile, done) => {
  console.log('🔍 Discord Strategy executada:', {
    id: profile.id,
    username: profile.username,
    email: profile.email
  });
  
  const userData = {
    id: profile.id,
    username: profile.username,
    avatar: profile.avatar,
    email: profile.email
  };
  
  userCache.set(profile.id, userData);
  console.log('💾 Usuário salvo no cache:', userData.username);
  return done(null, userData);
}));

passport.serializeUser((user, done) => {
  console.log('🔄 Serialize user:', user.username);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('🔍 Deserialize user ID:', id);
  const user = userCache.get(id);
  console.log('👤 User found in cache:', user ? user.username : 'NOT FOUND');
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

// Middleware para detectar ambiente e redirecionar se necessário
app.use('/auth/discord', (req, res, next) => {
  const currentHost = req.get('host');
  const isReplitHost = currentHost && currentHost.includes('replit.dev');
  
  console.log('🔍 Host atual:', currentHost);
  console.log('🔍 É Replit?', isReplitHost);
  
  // Se estamos no Replit mas queremos produção, redirecionar
  if (isReplitHost && process.env.REDIRECT_TO_PRODUCTION === 'true') {
    console.log('🔄 Redirecionando para produção...');
    return res.redirect(`https://www.lumidiscord.xyz${req.originalUrl}`);
  }
  
  next();
});

// Auth routes com debug
app.get('/auth/discord', (req, res, next) => {
  console.log('🚀 Iniciando autenticação Discord');
  console.log('Session ID:', req.sessionID);
  console.log('Base URL configurado:', baseURL);
  passport.authenticate('discord')(req, res, next);
});

app.get('/auth/discord/callback', (req, res, next) => {
  console.log('📥 Recebendo callback do Discord');
  console.log('Host:', req.get('host'));
  console.log('Query params:', req.query);
  
  // Verificar se há erro no callback
  if (req.query.error) {
    console.log('❌ Discord retornou erro:', req.query.error);
    return res.redirect(`/oauth-error?error=${req.query.error}&description=${req.query.error_description || ''}`);
  }
  
  // Verificar se há código de autorização
  if (!req.query.code) {
    console.log('❌ Código de autorização não encontrado');
    return res.redirect('/oauth-error?error=no_code');
  }
  
  passport.authenticate('discord', { 
    failureRedirect: '/oauth-error?error=passport_failed',
    failureMessage: true 
  }, (err, user, info) => {
    console.log('🔍 Callback result:', { 
      err: err?.message, 
      user: user?.username, 
      info 
    });
    
    if (err) {
      console.error('❌ Erro na autenticação:', err);
      return res.redirect(`/oauth-error?error=auth_failed&details=${encodeURIComponent(err.message)}`);
    }
    
    if (!user) {
      console.error('❌ Usuário não encontrado');
      return res.redirect('/oauth-error?error=no_user');
    }
    
    req.logIn(user, (err) => {
      if (err) {
        console.error('❌ Erro no login:', err);
        return res.redirect(`/oauth-error?error=login_failed&details=${encodeURIComponent(err.message)}`);
      }
      
      console.log('✅ Login realizado com sucesso:', user.username);
      
      const redirectTo = req.session.returnTo || '/dashboard';
      delete req.session.returnTo;
      
      console.log('🎯 Redirecionando para:', redirectTo);
      res.redirect(redirectTo);
    });
  })(req, res, next);
});

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
    // Salvar URL de destino para redirecionamento após login
    req.session.returnTo = '/dashboard';
    return res.redirect('/auth/discord');
  }
  
  console.log('✅ Dashboard acessado por:', req.user?.username || 'Usuário desconhecido');
  
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

// Rota de login simples
app.get('/login', (req, res) => {
  res.redirect('/auth/discord');
});

// Rotas de pagamento 
app.post('/payments/create-payment', (req, res) => {
  const { plan } = req.body;
  
  if (!req.isAuthenticated()) {
    return res.status(401).json({ 
      success: false, 
      error: 'Login necessário',
      redirect: '/login'
    });
  }
  
  // Simular checkout para demo
  const checkoutUrls = {
    premium: '/premium/checkout?plan=premium',
    vitalicio: '/premium/checkout?plan=vitalicio'
  };
  
  res.json({
    success: true,
    demo: true,
    checkout_url: checkoutUrls[plan] || '/premium/plans',
    message: 'Redirecionando para checkout...'
  });
});

// Página de checkout
app.get('/premium/checkout', (req, res) => {
  const { plan } = req.query;
  
  if (!req.isAuthenticated()) {
    return res.redirect('/auth/discord');
  }
  
  res.render('premium/checkout', {
    title: 'Checkout - Lumi',
    user: req.user,
    plan: plan
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

// Novas rotas para páginas legais
app.get('/privacidade', (req, res) => {
  res.render('legal/privacidade', { 
    title: 'Política de Privacidade - Lumi',
    user: req.user || null
  });
});

app.get('/termos', (req, res) => {
  res.render('legal/termos', { 
    title: 'Termos de Uso - Lumi',
    user: req.user || null
  });
});

// Rota para demo interativa
app.get('/demo', (req, res) => {
  res.render('premium/demo', { 
    title: 'Demo Interativa - Lumi',
    user: req.user || null
  });
});

// Rota para adicionar bot ao Discord
app.get('/invite', (req, res) => {
  // URL oficial do bot Discord da Lumi
  const botInviteUrl = `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&permissions=8&scope=bot%20applications.commands`;
  res.redirect(botInviteUrl);
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