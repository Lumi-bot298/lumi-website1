const express = require('express');
const router = express.Router();

// Middleware para verificar autenticação
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth/discord');
}

// Middleware para verificar autenticação em todas as rotas do dashboard
router.use(ensureAuthenticated);

// Dashboard principal
router.get('/', (req, res) => {
  res.render('dashboard-fixed', {
    title: 'Dashboard - Lumi',
    user: req.user,
    page: 'dashboard'
  });
});

// Lista de servidores
router.get('/servers', (req, res) => {
  res.render('dashboard/servers', {
    title: 'Meus Servidores - Lumi',
    user: req.user,
    page: 'servers'
  });
});

// Configurações do servidor
router.get('/server/:id', (req, res) => {
  const serverId = req.params.id;
  
  // Verificar se usuário tem acesso ao servidor
  const userGuilds = req.user?.guilds || [];
  const hasAccess = userGuilds.some(guild => guild.id === serverId);
  
  if (!hasAccess) {
    return res.redirect('/dashboard/servers');
  }
  
  res.render('dashboard/server', {
    title: 'Configurações do Servidor - Lumi',
    user: req.user,
    page: 'server',
    serverId: serverId
  });
});

// Módulos do bot (música, moderação, etc.) - Redirecionam para dashboard principal por enquanto
router.get('/server/:id/music', (req, res) => {
  const serverId = req.params.id;
  res.redirect(`/dashboard/server/${serverId}?module=music`);
});

router.get('/server/:id/moderation', (req, res) => {
  const serverId = req.params.id;
  res.redirect(`/dashboard/server/${serverId}?module=moderation`);
});

router.get('/server/:id/ai', (req, res) => {
  const serverId = req.params.id;
  res.redirect(`/dashboard/server/${serverId}?module=ai`);
});

router.get('/server/:id/analytics', (req, res) => {
  const serverId = req.params.id;
  res.redirect(`/dashboard/server/${serverId}?module=analytics`);
});

router.get('/server/:id/analytics', (req, res) => {
  const serverId = req.params.id;
  
  res.render('dashboard/modules/analytics', {
    title: 'Analytics do Servidor - Lumi',
    user: req.user,
    page: 'analytics',
    serverId: serverId
  });
});

router.get('/server/:id/ai', (req, res) => {
  const serverId = req.params.id;
  
  res.render('dashboard/modules/ai', {
    title: 'Configurações de IA - Lumi',
    user: req.user,
    page: 'ai',
    serverId: serverId
  });
});

router.get('/server/:id/themes', (req, res) => {
  const serverId = req.params.id;
  
  res.render('dashboard/modules/themes', {
    title: 'Temas e Personalização - Lumi',
    user: req.user,
    page: 'themes',
    serverId: serverId
  });
});

// API endpoints do dashboard
router.post('/api/server/:id/settings', (req, res) => {
  const serverId = req.params.id;
  const settings = req.body;
  
  // Aqui você salvaria as configurações no banco de dados
  console.log('Salvando configurações para servidor:', serverId, settings);
  
  res.json({ success: true, message: 'Configurações salvas com sucesso!' });
});

router.get('/api/server/:id/stats', (req, res) => {
  const serverId = req.params.id;
  
  // Aqui você buscaria as estatísticas reais do servidor
  const stats = {
    members: 1250,
    messages_today: 340,
    commands_used: 89,
    music_sessions: 12,
    moderation_actions: 5,
    ai_conversations: 23
  };
  
  res.json(stats);
});

module.exports = router;