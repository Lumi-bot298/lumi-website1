import { useSession, signIn } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'

export default function Support() {
  const { data: session } = useSession()

  return (
    <>
      <Head>
        <title>Suporte - Lumi</title>
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

      <main className="support-page">
        <div className="container">
          <h1>Suporte</h1>
          <p>Precisa de ajuda? Estamos aqui para você!</p>

          <div className="support-grid">
            <div className="support-card">
              <h3>📧 Email</h3>
              <p>Envie um email para nossa equipe de suporte</p>
              <a href="mailto:suporte@lumidiscord.xyz" className="btn-secondary">
                Enviar Email
              </a>
            </div>

            <div className="support-card">
              <h3>📋 Comandos</h3>
              <p>Use !ajuda no Discord para ver todos os comandos disponíveis</p>
              <div className="command-example">
                <code>!ajuda</code>
              </div>
            </div>
          </div>

          <div className="faq-section">
            <h2>Perguntas Frequentes</h2>
            
            <div className="faq-item">
              <h4>Como adicionar a Lumi ao meu servidor?</h4>
              <p>Use o link de convite oficial na página inicial e selecione seu servidor.</p>
            </div>

            <div className="faq-item">
              <h4>A Lumi é gratuita?</h4>
              <p>Sim! A Lumi tem funcionalidades gratuitas e planos premium com recursos avançados.</p>
            </div>

            <div className="faq-item">
              <h4>Como ativar o sistema de música?</h4>
              <p>Use o comando !musica para acessar o painel completo de música.</p>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .support-page {
          padding: 120px 2rem 60px;
        }
        
        .support-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }
        
        .support-card {
          background: rgba(255, 255, 255, 0.05);
          padding: 2rem;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
        }
        
        .support-card h3 {
          color: #a855f7;
          margin-bottom: 1rem;
          font-size: 1.25rem;
          font-weight: 600;
        }
        
        .command-example {
          background: rgba(0, 0, 0, 0.3);
          padding: 1rem;
          border-radius: 8px;
          margin-top: 1rem;
        }
        
        .faq-section {
          margin-top: 4rem;
        }
        
        .faq-section h2 {
          color: #a855f7;
          margin-bottom: 2rem;
          text-align: center;
        }
        
        .faq-item {
          background: rgba(255, 255, 255, 0.05);
          padding: 1.5rem;
          border-radius: 12px;
          margin-bottom: 1rem;
        }
        
        .faq-item h4 {
          color: #a855f7;
          margin-bottom: 0.5rem;
        }
      `}</style>
    </>
  )
}