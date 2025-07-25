import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function PaymentSuccess() {
  const router = useRouter()
  const [planInfo, setPlanInfo] = useState(null)
  const { plan, demo, user } = router.query

  useEffect(() => {
    if (plan) {
      const plans = {
        premium: { name: 'Premium', price: 9.90 },
        'premium-plus': { name: 'Premium+', price: 19.90 },
        enterprise: { name: 'Enterprise', price: 49.90 }
      }
      setPlanInfo(plans[plan])
    }
  }, [plan])

  if (!planInfo) {
    return <div>Carregando...</div>
  }

  return (
    <>
      <Head>
        <title>Pagamento Realizado - Lumi Bot</title>
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
            <Link href="/dashboard">Dashboard</Link>
          </div>
        </div>
      </nav>

      <div className="success-page">
        <div className="container">
          <div className="success-card">
            <div className="success-icon">✅</div>
            <h1>Pagamento Realizado com Sucesso!</h1>
            
            {demo ? (
              <div className="demo-notice">
                <h2>🚧 Sistema Demo Ativo</h2>
                <p>Este é um pagamento simulado para demonstração.</p>
                <p>Em produção, o Mercado Pago será configurado para pagamentos reais.</p>
              </div>
            ) : (
              <div className="payment-info">
                <h2>Obrigado pela sua compra!</h2>
                <p>Seu pagamento foi processado com sucesso.</p>
              </div>
            )}

            <div className="plan-details">
              <h3>Plano Adquirido: {planInfo.name}</h3>
              <p>Valor: R$ {planInfo.price.toFixed(2)}/mês</p>
              <p>Status: {demo ? 'Demo Ativo' : 'Ativo'}</p>
            </div>

            <div className="next-steps">
              <h3>Próximos Passos:</h3>
              <ol>
                <li>Convide a Lumi para seu servidor</li>
                <li>Use o comando !premium para ativar recursos</li>
                <li>Acesse o dashboard para configurações</li>
              </ol>
            </div>

            <div className="action-buttons">
              <Link href="/dashboard" className="btn-primary">
                Ir para Dashboard
              </Link>
              <Link href="/" className="btn-secondary">
                Voltar ao Início
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .success-page {
          padding: 120px 2rem 60px;
          min-height: 100vh;
        }
        
        .success-card {
          max-width: 600px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.05);
          padding: 3rem;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
        }
        
        .success-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }
        
        .success-card h1 {
          color: #10b981;
          margin-bottom: 2rem;
        }
        
        .demo-notice {
          background: rgba(251, 191, 36, 0.1);
          border: 1px solid rgba(251, 191, 36, 0.3);
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .demo-notice h2 {
          color: #f59e0b;
          margin-bottom: 1rem;
        }
        
        .demo-notice p {
          color: rgba(251, 191, 36, 0.9);
        }
        
        .payment-info {
          margin-bottom: 2rem;
        }
        
        .plan-details {
          background: rgba(168, 85, 247, 0.1);
          border: 1px solid rgba(168, 85, 247, 0.3);
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .plan-details h3 {
          color: #a855f7;
          margin-bottom: 1rem;
        }
        
        .next-steps {
          text-align: left;
          margin-bottom: 2rem;
        }
        
        .next-steps h3 {
          color: #a855f7;
          text-align: center;
          margin-bottom: 1rem;
        }
        
        .next-steps ol {
          color: rgba(255, 255, 255, 0.8);
        }
        
        .action-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .btn-primary, .btn-secondary {
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        
        .btn-primary {
          background: #a855f7;
          color: white;
        }
        
        .btn-primary:hover {
          background: #9333ea;
          transform: translateY(-2px);
        }
        
        .btn-secondary {
          background: transparent;
          color: #a855f7;
          border: 1px solid #a855f7;
        }
        
        .btn-secondary:hover {
          background: #a855f7;
          color: white;
        }
      `}</style>
    </>
  )
}