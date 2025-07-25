// pages/api/payments/create-preference.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { plan, user, amount } = req.body

    if (!plan || !user || !amount) {
      return res.status(400).json({ error: 'Dados incompletos' })
    }

    // Verificar se o plano é válido
    const validPlans = ['premium', 'premium-plus', 'enterprise']
    if (!validPlans.includes(plan)) {
      return res.status(400).json({ error: 'Plano inválido' })
    }

    // Sistema demo até configurar Mercado Pago
    if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
      console.log(`Demo: Simulando pagamento para ${user.name} - Plano ${plan} - R$ ${amount}`)
      
      return res.json({
        success: true,
        demo: true,
        message: 'Sistema demo ativo. Configure MERCADOPAGO_ACCESS_TOKEN para pagamentos reais.',
        init_point: `/premium/success?plan=${plan}&demo=true&user=${encodeURIComponent(user.name)}`
      })
    }

    // Integração real com Mercado Pago (quando configurado)
    try {
      const mercadopago = require('mercadopago')
      
      mercadopago.configure({
        access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
      })

      const preference = {
        items: [{
          title: `Lumi ${plan.charAt(0).toUpperCase() + plan.slice(1).replace('-', ' ')}`,
          description: `Plano ${plan} da Lumi Bot - Assinatura mensal`,
          quantity: 1,
          currency_id: 'BRL',
          unit_price: parseFloat(amount)
        }],
        payer: {
          name: user.name,
          email: user.email || `${user.name.replace(/\s+/g, '').toLowerCase()}@discord.user`
        },
        back_urls: {
          success: `${req.headers.origin}/premium/success?plan=${plan}`,
          failure: `${req.headers.origin}/premium/failure?plan=${plan}`,
          pending: `${req.headers.origin}/premium/pending?plan=${plan}`
        },
        auto_return: 'approved',
        external_reference: `lumi_${plan}_${user.id}_${Date.now()}`,
        notification_url: `${req.headers.origin}/api/payments/webhook`
      }

      const response = await mercadopago.preferences.create(preference)
      
      res.json({
        success: true,
        init_point: response.body.init_point,
        id: response.body.id
      })

    } catch (mpError) {
      console.error('Erro Mercado Pago:', mpError)
      res.status(500).json({ 
        error: 'Erro na integração com Mercado Pago',
        details: mpError.message 
      })
    }

  } catch (error) {
    console.error('Erro geral:', error)
    res.status(500).json({ 
      error: 'Erro interno do servidor',
      details: error.message 
    })
  }
}