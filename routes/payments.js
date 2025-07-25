const express = require('express');
const { MercadoPagoConfig, Preference } = require('mercadopago');
const router = express.Router();

// Middleware para verificar autenticação
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth/discord');
}

// Configurar Mercado Pago (será configurado quando tiver as credenciais)
let mercadopago = null;

function initMercadoPago() {
  if (process.env.MERCADOPAGO_ACCESS_TOKEN) {
    try {
      const client = new MercadoPagoConfig({ 
        accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
        options: { timeout: 5000 }
      });
      mercadopago = new Preference(client);
      console.log('✅ Mercado Pago configurado com sucesso');
      return true;
    } catch (error) {
      console.error('❌ Erro ao configurar Mercado Pago:', error);
      return false;
    }
  }
  return false;
}

// Inicializar Mercado Pago
const mpConfigured = initMercadoPago();

// Configurações dos planos
const planos = {
  pro: {
    title: 'Lumi Pro',
    price: 15.00,
    description: 'IA Avançada + Analytics + 15+ Temas + Música Premium',
    features: [
      'Tudo do Free',
      'IA Avançada com Memória', 
      'Analytics de 30 Dias',
      '15+ Temas Premium',
      'Música Premium 320kbps',
      'Suporte VIP < 2h'
    ]
  },
  enterprise: {
    title: 'Lumi Enterprise', 
    price: 45.00,
    description: 'IA Personalizada + Analytics Ilimitados + Suporte 24/7',
    features: [
      'Tudo do Pro',
      'IA Personalizada Exclusiva',
      'Analytics Ilimitados', 
      'Suporte 24/7 Dedicado',
      'Consultoria de Crescimento',
      'Recursos Personalizados'
    ]
  }
};

// Rota para criar pagamento
router.post('/create-payment', ensureAuthenticated, async (req, res) => {
  try {
    const { plan } = req.body;
    
    if (!plan || !planos[plan]) {
      return res.status(400).json({ 
        success: false, 
        error: 'Plano inválido' 
      });
    }

    const planConfig = planos[plan];
    const user = req.user;

    // Se Mercado Pago não estiver configurado, usar sistema demo
    if (!mpConfigured) {
      // Sistema demo - simular checkout
      const demoUrl = `/premium/demo-payment?plan=${plan}&user=${user.id}`;
      return res.json({
        success: true,
        checkout_url: demoUrl,
        demo: true,
        message: 'Sistema demo ativo - Mercado Pago será configurado em produção'
      });
    }

    // Criar preferência de pagamento no Mercado Pago
    const preference = {
      items: [
        {
          title: planConfig.title,
          description: planConfig.description,
          quantity: 1,
          currency_id: 'BRL',
          unit_price: planConfig.price
        }
      ],
      payer: {
        name: user.username,
        email: user.email || `${user.username}@discord.user`
      },
      back_urls: {
        success: `${req.protocol}://${req.get('host')}/premium/success`,
        failure: `${req.protocol}://${req.get('host')}/premium/failure`,
        pending: `${req.protocol}://${req.get('host')}/premium/pending`
      },
      auto_return: 'approved',
      external_reference: `lumi_${plan}_${user.id}_${Date.now()}`,
      metadata: {
        user_id: user.id,
        plan: plan,
        username: user.username
      }
    };

    const response = await mercadopago.create({ body: preference });
    
    res.json({
      success: true,
      checkout_url: response.init_point,
      payment_id: response.id
    });

  } catch (error) {
    console.error('Erro ao criar pagamento:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// Rota demo para simular pagamento
router.get('/demo-payment', ensureAuthenticated, (req, res) => {
  const { plan } = req.query;
  const planConfig = planos[plan];
  
  if (!planConfig) {
    return res.redirect('/premium/plans');
  }

  res.render('premium/demo-payment', {
    title: `Pagamento Demo - ${planConfig.title}`,
    user: req.user,
    plan: plan,
    planConfig: planConfig
  });
});

// Webhook do Mercado Pago (para confirmar pagamentos)
router.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  try {
    // Processar notificação do Mercado Pago
    const notification = req.body;
    console.log('📝 Webhook Mercado Pago:', notification);
    
    // Aqui você processaria o pagamento confirmado
    // Ativar premium para o usuário, etc.
    
    res.status(200).send('OK');
  } catch (error) {
    console.error('Erro no webhook:', error);
    res.status(500).send('Erro');
  }
});

module.exports = router;