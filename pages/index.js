import { useState } from 'react'
import Head from 'next/head'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)

  const handleDemo = async () => {
    setIsLoading(true)
    // Redirect para login Discord
    window.location.href = 'https://discord.com/api/oauth2/authorize?client_id=1389439603618963497&response_type=code&redirect_uri=https%3A%2F%2Flumidiscord.xyz%2Fauth%2Fcallback&scope=identify+email+guilds'
  }

  const handlePremium = () => {
    window.location.href = '/premium'
  }

  return (
    <>
      <Head>
        <title>Lumi - O Bot Discord Mais Avançado do Brasil</title>
        <meta name="description" content="Bot Discord brasileiro com IA conversacional, música do YouTube, sistema de economia e 37+ comandos únicos." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
      }}>
        {/* Header */}
        <header style={{ padding: '2rem 1rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '50px',
                height: '50px',
                background: 'linear-gradient(135deg, #8B5FBF 0%, #5865F2 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '24px',
                fontWeight: 'bold'
              }}>
                L
              </div>
              <span style={{ color: 'white', fontSize: '32px', fontWeight: 'bold' }}>Lumi</span>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main style={{ padding: '4rem 1rem', textAlign: 'center' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '2rem',
              lineHeight: '1.2'
            }}>
              O Bot Discord Mais<br />
              <span style={{
                background: 'linear-gradient(135deg, #FFD700 0%, #FF6B6B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Avançado do Brasil
              </span>
            </h1>
            
            <p style={{
              fontSize: '1.25rem',
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '3rem',
              lineHeight: '1.6'
            }}>
              Primeiro bot brasileiro com IA conversacional real, música do YouTube, 
              37+ comandos únicos e sistema de economia avançado.
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button 
                onClick={handleDemo}
                disabled={isLoading}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  padding: '1rem 2rem',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  opacity: isLoading ? 0.7 : 1
                }}
                onMouseOver={(e) => {
                  if (!isLoading) {
                    e.target.style.transform = 'translateY(-2px)'
                    e.target.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)'
                  }
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = 'none'
                }}
              >
                {isLoading ? 'Carregando...' : '🚀 Demo Grátis'}
              </button>
              
              <button 
                onClick={handlePremium}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  padding: '1rem 2rem',
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
                💎 Ver Planos Premium
              </button>
            </div>
          </div>
        </main>

        {/* Features Section */}
        <section style={{ padding: '4rem 1rem', background: 'rgba(255,255,255,0.05)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              marginBottom: '3rem'
            }}>
              Recursos Únicos da Lumi
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}>
              {[
                {
                  icon: '🤖',
                  title: 'IA Conversacional',
                  description: 'Primeira IA brasileira real em Discord bot com aprendizado e personalidade única.'
                },
                {
                  icon: '🎵',
                  title: 'Música do YouTube',
                  description: 'Sistema completo de música com integração real do YouTube e controles avançados.'
                },
                {
                  icon: '📊',
                  title: 'Analytics Reais',
                  description: 'Dados autênticos do servidor com métricas detalhadas e insights profissionais.'
                },
                {
                  icon: '🎮',
                  title: '6 Mini-Games',
                  description: 'Jogos interativos com estado persistente e rankings competitivos.'
                },
                {
                  icon: '💎',
                  title: 'Sistema de Economia',
                  description: 'LumiCoins, banco virtual, trabalhos e sistema de níveis integrado.'
                },
                {
                  icon: '🛡️',
                  title: 'Moderação Avançada',
                  description: 'Auto-moderação, filtros inteligentes e sistema de punições automáticas.'
                }
              ].map((feature, index) => (
                <div key={index} style={{
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '16px',
                  padding: '2rem',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{feature.icon}</div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.6' }}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ padding: '3rem 1rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '1rem' }}>
            © 2025 Lumi Discord Bot. Desenvolvido por Guilherme Almeida (Dy. Black)
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <a href="/privacy" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Privacidade</a>
            <a href="/terms" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Termos</a>
            <a href="/support" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Suporte</a>
          </div>
        </footer>
      </div>
    </>
  )
}