import Head from 'next/head'

export default function Plans() {
  const plans = [
    {
      name: 'Básico',
      price: 'Grátis',
      features: [
        '10 comandos básicos',
        'Suporte por Discord',
        'Moderação simples',
        'Música básica'
      ]
    },
    {
      name: 'Premium',
      price: 'R$ 19,90/mês',
      popular: true,
      features: [
        '37 comandos completos',
        'IA conversacional avançada',
        'Analytics em tempo real',
        'Música ilimitada do YouTube',
        'Suporte prioritário',
        'Personalização avançada'
      ]
    },
    {
      name: 'Enterprise',
      price: 'R$ 49,90/mês',
      features: [
        'Todos os recursos Premium',
        'Servidor dedicado',
        'API personalizada',
        'Integração customizada',
        'Suporte 24/7',
        'SLA garantido'
      ]
    }
  ]

  return (
    <>
      <Head>
        <title>Planos Premium - Lumi Discord Bot</title>
        <meta name="description" content="Escolha o plano ideal para seu servidor Discord" />
      </Head>

      <div style={{
        background: 'linear-gradient(135deg, #0f0f17 0%, #1a1a2e 100%)',
        minHeight: '100vh',
        color: 'white',
        padding: '4rem 2rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '3rem',
            textAlign: 'center',
            marginBottom: '2rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Escolha Seu Plano
          </h1>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginTop: '3rem'
          }}>
            {plans.map((plan, index) => (
              <div key={index} style={{
                background: plan.popular ? 'linear-gradient(135deg, #667eea20, #764ba220)' : 'rgba(255, 255, 255, 0.05)',
                border: plan.popular ? '2px solid #667eea' : '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                padding: '2rem',
                textAlign: 'center',
                position: 'relative'
              }}>
                {plan.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#667eea',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold'
                  }}>
                    MAIS POPULAR
                  </div>
                )}

                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#667eea' }}>
                  {plan.name}
                </h3>
                
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>
                  {plan.price}
                </div>

                <ul style={{ listStyle: 'none', marginBottom: '2rem' }}>
                  {plan.features.map((feature, i) => (
                    <li key={i} style={{
                      padding: '0.5rem 0',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      ✓ {feature}
                    </li>
                  ))}
                </ul>

                <button style={{
                  background: plan.popular ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                  border: plan.popular ? 'none' : '2px solid #667eea',
                  color: 'white',
                  padding: '1rem 2rem',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  width: '100%'
                }}>
                  {plan.price === 'Grátis' ? 'Começar Grátis' : 'Assinar Agora'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}