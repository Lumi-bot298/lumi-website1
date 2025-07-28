export default function Home() {
  return (
    <div>
      <style jsx global>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: system-ui, sans-serif; }
      `}</style>
      
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f0f17 0%, #1a1a2e 50%, #16213e 100%)',
        color: 'white'
      }}>
        {/* Header */}
        <header style={{
          background: 'rgba(15, 15, 23, 0.95)',
          padding: '1rem 2rem',
          position: 'fixed',
          width: '100%',
          top: 0,
          zIndex: 1000
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold'
              }}>
                L
              </div>
              <span style={{ fontSize: '24px', fontWeight: 'bold' }}>Lumi</span>
            </div>
            
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              <a href="/" style={{ color: 'white', textDecoration: 'none' }}>Início</a>
              <a href="/premium" style={{ color: 'white', textDecoration: 'none' }}>Premium</a>
              <button style={{
                background: '#5865F2',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '8px',
                cursor: 'pointer'
              }}>
                Login Discord
              </button>
            </div>
          </div>
        </header>

        {/* Hero */}
        <main style={{
          paddingTop: '120px',
          textAlign: 'center',
          padding: '120px 2rem 4rem'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{
              fontSize: '48px',
              fontWeight: 'bold',
              marginBottom: '24px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: '1.2'
            }}>
              O Bot Discord Mais Avançado do Brasil
            </h1>
            
            <p style={{
              fontSize: '20px',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '40px',
              lineHeight: '1.6'
            }}>
              IA conversacional em português, música real do YouTube, analytics premium!
            </p>

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                padding: '16px 32px',
                borderRadius: '50px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>
                Testar Demo Grátis
              </button>
              
              <button style={{
                background: 'transparent',
                color: '#667eea',
                border: '2px solid #667eea',
                padding: '16px 32px',
                borderRadius: '50px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>
                Ver Planos Premium
              </button>
            </div>
          </div>
        </main>

        {/* Features */}
        <section style={{
          background: '#0f0f17',
          padding: '4rem 2rem'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: '36px',
              textAlign: 'center',
              marginBottom: '48px',
              color: '#667eea'
            }}>
              Diferenciais Únicos
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '32px'
            }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '32px',
                borderRadius: '16px',
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎵</div>
                <h3 style={{ fontSize: '20px', marginBottom: '12px', color: '#667eea' }}>Música Real do YouTube</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Sistema mais avançado, sem limitações</p>
              </div>
              
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '32px',
                borderRadius: '16px',
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤖</div>
                <h3 style={{ fontSize: '20px', marginBottom: '12px', color: '#667eea' }}>IA Conversacional</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Primeira IA que fala português naturalmente</p>
              </div>
              
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '32px',
                borderRadius: '16px',
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🇧🇷</div>
                <h3 style={{ fontSize: '20px', marginBottom: '12px', color: '#667eea' }}>Feito para Brasileiros</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Desenvolvido para nossa comunidade</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{
          background: '#0a0a0f',
          padding: '32px',
          textAlign: 'center',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <p style={{ 
            margin: 0, 
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '14px'
          }}>
            © 2025 Lumi Discord Bot - Desenvolvido por Guilherme Almeida (Dy. Black)
          </p>
        </footer>
      </div>
    </div>
  )
}