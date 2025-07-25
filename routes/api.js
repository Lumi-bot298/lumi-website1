const express = require('express');
const router = express.Router();

// Demo Premium activation endpoint
router.post('/activate-demo', (req, res) => {
  try {
    console.log('🎯 Ativação de demo solicitada');
    
    // Simulate demo activation with immediate response
    res.json({
      success: true,
      message: 'Demo Premium ativado com sucesso!',
      demoExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      features: [
        'IA Avançada Premium',
        'Analytics Detalhados',
        'Música Premium',
        'Personalização Completa',
        'Suporte VIP'
      ]
    });
    
    console.log('✅ Demo ativado com sucesso');
    
  } catch (error) {
    console.error('❌ Erro ao ativar demo:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor. Tente novamente.'
    });
  }
});

// Middleware para verificar autenticação
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ success: false, error: 'Não autenticado' });
}

// API para buscar servidores do usuário
router.get('/user-guilds', ensureAuthenticated, (req, res) => {
  try {
    // Retornar guilds do usuário logado
    const guilds = req.user?.guilds || [];
    
    res.json({
      success: true,
      guilds: guilds
    });
  } catch (error) {
    console.error('Erro ao buscar guilds:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

router.get('/guilds', ensureAuthenticated, (req, res) => {
  try {
    // Retornar guilds do usuário logado
    const guilds = req.user?.guilds || [];
    
    // Filtrar apenas servidores onde o usuário tem permissões de admin
    const managedGuilds = guilds.filter(guild => 
      (guild.permissions & 0x8) === 0x8 || // ADMINISTRATOR
      (guild.permissions & 0x20) === 0x20   // MANAGE_GUILD
    );

    res.json({
      success: true,
      guilds: managedGuilds
    });
  } catch (error) {
    console.error('Erro ao buscar guilds:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// API para configurações específicas de servidor
router.get('/guild/:id', ensureAuthenticated, (req, res) => {
  const guildId = req.params.id;
  
  // Verificar se usuário tem acesso ao servidor
  const userGuilds = req.user?.guilds || [];
  const hasAccess = userGuilds.some(guild => guild.id === guildId);
  
  if (!hasAccess) {
    return res.status(403).json({
      success: false,
      error: 'Acesso negado ao servidor'
    });
  }

  // Buscar configurações da Lumi para este servidor
  // Por enquanto, retornar configurações padrão
  res.json({
    success: true,
    guild: {
      id: guildId,
      settings: {
        prefix: '!',
        musicEnabled: true,
        moderationEnabled: true,
        aiEnabled: true,
        analyticsEnabled: true,
        welcomeMessages: false,
        autoRoles: false
      }
    }
  });
});

// API para criar sessão de checkout Stripe (placeholder - implementar quando Stripe estiver configurado)
router.get('/create-checkout-session', ensureAuthenticated, async (req, res) => {
  try {
    const plan = req.query.plan;
    const userId = req.user.id;
    
    if (!plan || !['pro', 'enterprise'].includes(plan)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Plano inválido' 
      });
    }

    // Configurações dos planos
    const planConfig = {
      pro: {
        price: 1500, // R$ 15.00 em centavos
        name: 'Lumi Pro',
        description: 'IA avançada, analytics de 30 dias, 15+ temas premium'
      },
      enterprise: {
        price: 4500, // R$ 45.00 em centavos  
        name: 'Lumi Enterprise',
        description: 'IA personalizada, analytics ilimitados, suporte 24/7'
      }
    };

    const selectedPlan = planConfig[plan];
    
    // Por enquanto, simular checkout - depois integrar Stripe real
    const mockSessionId = 'cs_test_' + Math.random().toString(36).substring(7);
    
    // Simular redirecionamento para Stripe (depois será URL real)
    const checkoutUrl = `/premium/success?session_id=${mockSessionId}&plan=${plan}`;
    
    res.redirect(checkoutUrl);
    
  } catch (error) {
    console.error('Erro ao criar sessão de checkout:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// API para atualizar configurações
router.post('/guild/:id/settings', ensureAuthenticated, (req, res) => {
  const guildId = req.params.id;
  const settings = req.body;
  
  // Verificar acesso
  const userGuilds = req.user?.guilds || [];
  const hasAccess = userGuilds.some(guild => guild.id === guildId);
  
  if (!hasAccess) {
    return res.status(403).json({
      success: false,
      error: 'Acesso negado ao servidor'
    });
  }

  // Salvar configurações (implementar persistência)
  console.log(`💾 Configurações atualizadas para servidor ${guildId}:`, settings);
  
  res.json({
    success: true,
    message: 'Configurações salvas com sucesso!'
  });
});

// API para analytics básicos
router.get('/guild/:id/analytics', ensureAuthenticated, (req, res) => {
  const guildId = req.params.id;
  
  // Verificar acesso
  const userGuilds = req.user?.guilds || [];
  const hasAccess = userGuilds.some(guild => guild.id === guildId);
  
  if (!hasAccess) {
    return res.status(403).json({
      success: false,
      error: 'Acesso negado ao servidor'
    });
  }

  // Dados de exemplo - em produção, buscar do banco de dados
  res.json({
    success: true,
    analytics: {
      members: Math.floor(Math.random() * 1000) + 100,
      messages: Math.floor(Math.random() * 10000) + 1000,
      commands: Math.floor(Math.random() * 500) + 50,
      musicPlayed: Math.floor(Math.random() * 200) + 20
    }
  });
});

module.exports = router;