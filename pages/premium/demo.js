import Head from 'next/head'

export default function Demo() {
  return (
    <>
      <Head>
        <title>Demo Premium - Lumi Discord Bot</title>
        <meta name="description" content="Teste gratuitamente todos os recursos premium da Lumi" />
      </Head>

      <div style={{
        background: 'linear-gradient(135deg, #0f0f17 0%, #1a1a2e 100%)',
        minHeight: '100vh',
        color: 'white',
        padding: '4rem 2rem'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{
            fontSize: '3rem',
            marginBottom: '2rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Demo Premium Grátis
          </h1>

          <p style={{
            fontSize: '1.25rem',
            color: 'rgba(255, 255, 255, 0.8)',
            marginBottom: '3rem'
          }}>
            Experimente todos os recursos premium da Lumi por 7 dias, completamente grátis!
          </p>

          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            padding: '3rem',
            marginBottom: '3rem'
          }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#667eea' }}>
              O que você ganha no demo:
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              {[
                '🤖 IA Conversacional Completa',
                '🎵 Música Ilimitada',
                '📊 Analytics Premium',
                '🎨 Personalização Avançada',
                '⚡ Todos os 37 Comandos',
                '🛡️ Moderação Automática'
              ].map((feature, index) => (
                <div key={index} style={{
                  padding: '1rem',
                  background: 'rgba(102, 126, 234, 0.1)',
                  borderRadius: '10px',
                  border: '1px solid rgba(102, 126, 234, 0.3)'
                }}>
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '2rem',
            borderRadius: '20px',
            marginBottom: '2rem'
          }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
              🎉 Ativação Instantânea
            </h3>
            <p style={{ marginBottom: '2rem', opacity: 0.9 }}>
              Clique no botão abaixo e ganhe acesso imediato a todos os recursos premium
            </p>
            
            <button style={{
              background: 'white',
              color: '#667eea',
              border: 'none',
              padding: '1rem 3rem',
              borderRadius: '50px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'transform 0.3s ease'
            }}>
              🚀 Ativar Demo Premium Grátis
            </button>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            flexWrap: 'wrap'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', color: '#667eea', fontWeight: 'bold' }}>7 dias</div>
              <div style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Teste gratuito</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', color: '#667eea', fontWeight: 'bold' }}>37</div>
              <div style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Comandos premium</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', color: '#667eea', fontWeight: 'bold' }}>24/7</div>
              <div style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Suporte premium</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}