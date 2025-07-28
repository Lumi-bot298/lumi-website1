import Head from 'next/head'

export default function Premium() {
  const handlePayment = (plan) => {
    // Redirect para Mercado Pago
    const paymentData = {
      premium: 'https://mpago.la/2EKYyUx', // Link de pagamento premium
      enterprise: 'https://mpago.la/3FLZzVy' // Link de pagamento enterprise
    }
    
    window.location.href = paymentData[plan] || paymentData.premium
  }

  return (
    <>
      <Head>
        <title>Planos Premium - Lumi Discord Bot</title>
        <meta name="description" content="Assine o Lumi Premium e tenha acesso a todos os recursos avançados do melhor bot Discord brasileiro." />
      </Head>

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        padding: '2rem 1rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h1 style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '1rem'
            }}>
              Planos Premium
            </h1>
            <p style={{
              fontSize: '1.2rem',
              color: 'rgba(255,255,255,0.8)'
            }}>
              Desbloqueie todo o potencial da Lumi
            </p>
          </header>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {/* Premium Plan */}
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              border: '2px solid #8B5FBF',
              borderRadius: '16px',
              padding: '2rem',
              textAlign: 'center',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'linear-gradient(135deg, #8B5FBF 0%, #5865F2 100%)',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontWeight: 'bold'
              }}>
                Mais Popular
              </div>
              
              <h3 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>
                Premium
              </h3>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'white', marginBottom: '2rem' }}>
                R$ 19<span style={{ fontSize: '1rem' }}>/mês</span>
              </div>
              
              <ul style={{
                listStyle: 'none',
                padding: 0,
                marginBottom: '2rem',
                textAlign: 'left'
              }}>
                {[
                  '37 comandos completos',
                  'IA conversacional avançada',
                  'Música ilimitada YouTube',
                  'Analytics em tempo real',
                  'Mini-games premium',
                  'Suporte prioritário'
                ].map((feature, index) => (
                  <li key={index} style={{
                    color: 'rgba(255,255,255,0.9)',
                    marginBottom: '0.8rem',
                    paddingLeft: '1.5rem',
                    position: 'relative'
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      color: '#4CAF50'
                    }}>✅</span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => handlePayment('premium')}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  padding: '1rem',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)'
                  e.target.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)'
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = 'none'
                }}
              >
                Assinar Premium
              </button>
            </div>

            {/* Enterprise Plan */}
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '16px',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <h3 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>
                Enterprise
              </h3>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'white', marginBottom: '2rem' }}>
                R$ 49<span style={{ fontSize: '1rem' }}>/mês</span>
              </div>
              
              <ul style={{
                listStyle: 'none',
                padding: 0,
                marginBottom: '2rem',
                textAlign: 'left'
              }}>
                {[
                  'Todos recursos Premium',
                  'Personalização total',
                  'Dashboard exclusivo',
                  'API personalizada',
                  'Suporte 24/7',
                  'SLA garantido'
                ].map((feature, index) => (
                  <li key={index} style={{
                    color: 'rgba(255,255,255,0.9)',
                    marginBottom: '0.8rem',
                    paddingLeft: '1.5rem',
                    position: 'relative'
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      color: '#4CAF50'
                    }}>✅</span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => handlePayment('enterprise')}
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  padding: '1rem',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = 'rgba(255,255,255,0.2)'
                  e.target.style.transform = 'translateY(-2px)'
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'rgba(255,255,255,0.1)'
                  e.target.style.transform = 'translateY(0)'
                }}
              >
                Assinar Enterprise
              </button>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <a href="/" style={{ color: '#8B5FBF', fontSize: '1.1rem', textDecoration: 'none' }}>
              ← Voltar ao início
            </a>
          </div>
        </div>
      </div>
    </>
  )
}