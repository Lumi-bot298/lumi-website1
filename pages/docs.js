import { useSession, signIn } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'

export default function Docs() {
  const { data: session } = useSession()

  return (
    <>
      <Head>
        <title>Documentação - Lumi</title>
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

      <main className="docs-page">
        <div className="container">
          <h1>Documentação</h1>
          <p>Guia completo para usar a Lumi no seu servidor Discord</p>

          <div className="docs-grid">
            <div className="docs-section">
              <h2>🚀 Primeiros Passos</h2>
              <ul>
                <li>Como adicionar a Lumi ao servidor</li>
                <li>Configuração inicial</li>
                <li>Comandos básicos</li>
              </ul>
            </div>

            <div className="docs-section">
              <h2>🤖 Comandos de IA</h2>
              <ul>
                <li>!ia - Chat com inteligência artificial</li>
                <li>!ai-avancado - IA com análise avançada</li>
                <li>Personalização de respostas</li>
              </ul>
            </div>

            <div className="docs-section">
              <h2>🎵 Sistema de Música</h2>
              <ul>
                <li>!musica - Sistema completo de música</li>
                <li>Controles interativos</li>
                <li>Playlists e favoritos</li>
              </ul>
            </div>

            <div className="docs-section">
              <h2>🛡️ Moderação</h2>
              <ul>
                <li>!moderacao - Painel de moderação</li>
                <li>Sistema de avisos automático</li>
                <li>Proteção anti-spam</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .docs-page {
          padding: 120px 2rem 60px;
        }
        
        .docs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }
        
        .docs-section {
          background: rgba(255, 255, 255, 0.05);
          padding: 2rem;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .docs-section h2 {
          color: #a855f7;
          margin-bottom: 1rem;
        }
        
        .docs-section ul {
          list-style: none;
        }
        
        .docs-section li {
          padding: 0.5rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </>
  )
}