import { useSession, getSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // Still loading
    if (!session) router.push('/premium') // Not logged in
  }, [session, status])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-400"></div>
      </div>
    )
  }

  if (!session) {
    return null // Will redirect
  }

  return (
    <>
      <Head>
        <title>Dashboard - Lumi Bot</title>
        <meta name="description" content="Painel de controle da Lumi Bot" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
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
            <button onClick={() => signOut()} className="btn-logout">
              Sair
            </button>
          </div>
        </div>
      </nav>

      <div className="dashboard-page">

        <div className="container">
          <div className="dashboard-header">
            <div className="user-info">
              <img src={session.user.image} alt={session.user.name} className="user-avatar" />
              <div>
                <h1>Dashboard</h1>
                <p>Bem-vindo, {session.user.name}!</p>
              </div>
            </div>
          </div>

          <div className="dashboard-grid">
            {/* Server Stats */}
            <div className="dashboard-card">
              <h3>📊 Estatísticas</h3>
              <div className="stats-list">
                <div className="stat-item">
                  <span>Servidores:</span>
                  <span>0</span>
                </div>
                <div className="stat-item">
                  <span>Comandos hoje:</span>
                  <span>0</span>
                </div>
                <div className="stat-item">
                  <span>Usuários ativos:</span>
                  <span>0</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="dashboard-card">
              <h3>⚡ Ações Rápidas</h3>
              <div className="actions-list">
                <button className="action-btn primary">Convidar Lumi</button>
                <Link href="/docs" className="action-btn secondary">Ver Comandos</Link>
                <Link href="/support" className="action-btn tertiary">Suporte</Link>
              </div>
            </div>

            {/* Premium Status */}
            <div className="dashboard-card">
              <h3>💎 Status Premium</h3>
              <div className="premium-status">
                <div className="status-badge free">Plano Gratuito</div>
                <p>Upgrade para desbloquear recursos premium</p>
                <Link href="/premium" className="action-btn premium">
                  Fazer Upgrade
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .dashboard-page {
          padding: 120px 2rem 60px;
          min-height: 100vh;
        }
        
        .dashboard-header {
          margin-bottom: 3rem;
        }
        
        .user-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .user-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 3px solid #a855f7;
        }
        
        .user-info h1 {
          margin: 0;
          color: #a855f7;
          font-size: 2rem;
        }
        
        .user-info p {
          margin: 0.5rem 0 0 0;
          color: rgba(255, 255, 255, 0.7);
        }
        
        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
        
        .dashboard-card {
          background: rgba(255, 255, 255, 0.05);
          padding: 2rem;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .dashboard-card h3 {
          color: #a855f7;
          margin-bottom: 1.5rem;
          font-size: 1.25rem;
        }
        
        .stats-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .stat-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .stat-item span:first-child {
          color: rgba(255, 255, 255, 0.7);
        }
        
        .stat-item span:last-child {
          color: white;
          font-weight: bold;
        }
        
        .actions-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .action-btn {
          padding: 0.75rem 1rem;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          text-align: center;
          transition: all 0.3s ease;
          font-weight: 500;
        }
        
        .action-btn.primary {
          background: #a855f7;
          color: white;
        }
        
        .action-btn.primary:hover {
          background: #9333ea;
        }
        
        .action-btn.secondary {
          background: #3b82f6;
          color: white;
        }
        
        .action-btn.secondary:hover {
          background: #2563eb;
        }
        
        .action-btn.tertiary {
          background: #10b981;
          color: white;
        }
        
        .action-btn.tertiary:hover {
          background: #059669;
        }
        
        .action-btn.premium {
          background: linear-gradient(45deg, #a855f7, #ec4899);
          color: white;
        }
        
        .action-btn.premium:hover {
          background: linear-gradient(45deg, #9333ea, #db2777);
        }
        
        .premium-status {
          text-align: center;
        }
        
        .status-badge {
          display: inline-block;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          margin-bottom: 1rem;
          font-weight: 500;
        }
        
        .status-badge.free {
          background: #f59e0b;
          color: white;
        }
        
        .premium-status p {
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 1.5rem;
        }
        
        .btn-logout {
          background: #ef4444;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        
        .btn-logout:hover {
          background: #dc2626;
        }
      `}</style>
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  
  if (!session) {
    return {
      redirect: {
        destination: '/premium',
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}