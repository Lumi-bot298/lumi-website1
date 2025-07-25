import { useSession, signIn } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  const { data: session } = useSession()

  return (
    <>
      <Head>
        <title>Lumi - Bot Discord Brasileiro</title>
      </Head>
      
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <img src="/images/lumi-avatar.png" alt="Lumi" />
            <span>Lumi</span>
          </div>
          <div className="nav-links">
            <Link href="/">Início</Link>
            <Link href="/premium">Premium</Link>
            <Link href="/docs">Docs</Link>
            <Link href="/support">Suporte</Link>
            {session ? (
              <Link href="/dashboard" className="btn-login">Dashboard</Link>
            ) : (
              <button onClick={() => signIn('discord')} className="btn-login">
                Login Discord
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="hero">
        <div className="hero-content">
          <h1>O Bot Discord Brasileiro Mais Completo</h1>
          <p>IA conversacional, música do YouTube, moderação automática, economia virtual e muito mais!</p>
          
          <div className="hero-buttons">
            <a href="https://discord.com/api/oauth2/authorize?client_id=1388711731508805702&permissions=8&scope=bot%20applications.commands" 
               className="btn-primary" target="_blank">
              Adicionar ao Discord
            </a>
            <Link href="/premium" className="btn-secondary">
              Ver Planos Premium
            </Link>
          </div>

          <div className="features-grid">
            <div className="feature">
              <h3>🤖 IA Conversacional</h3>
              <p>Chat inteligente em português</p>
            </div>
            <div className="feature">
              <h3>🎵 Música YouTube</h3>
              <p>Sistema de música completo</p>
            </div>
            <div className="feature">
              <h3>🛡️ Moderação Auto</h3>
              <p>Proteção avançada do servidor</p>
            </div>
            <div className="feature">
              <h3>💰 Economia Virtual</h3>
              <p>Sistema de moedas e ranking</p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}