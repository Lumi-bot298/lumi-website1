// pages/api/payments/create-preference.js
import mercadopago from 'mercadopago'

// Configurar Mercado Pago
mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { plan, user, amount } = req.body

    const preference = {
      items: [
        {
          title: `Lumi Discord Bot - Plano ${plan}`,
          description: `Assinatura mensal do plano ${plan} da Lumi`,
          quantity: 1,
          currency_id: 'BRL',
          unit_price: parseFloat(amount)
        }
      ],
      payer: {
        name: user.name,
        email: user.email,
        identification: {
          type: 'Email',
          number: user.email
        }
      },
      back_urls: {
        success: `${process.env.NEXTAUTH_URL}/premium/success`,
        failure: `${process.env.NEXTAUTH_URL}/premium/failure`,
        pending: `${process.env.NEXTAUTH_URL}/premium/pending`
      },
      auto_return: 'approved',
      external_reference: `lumi_${plan}_${user.id}_${Date.now()}`,
      notification_url: `${process.env.NEXTAUTH_URL}/api/payments/webhook`,
      expires: true,
      expiration_date_from: new Date().toISOString(),
      expiration_date_to: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 horas
    }

    const response = await mercadopago.preferences.create(preference)
    
    res.status(200).json({
      id: response.body.id,
      init_point: response.body.init_point,
      sandbox_init_point: response.body.sandbox_init_point
    })

  } catch (error) {
    console.error('Erro ao criar preferência:', error)
    res.status(500).json({ 
      error: 'Erro interno do servidor',
      details: error.message 
    })
  }
}