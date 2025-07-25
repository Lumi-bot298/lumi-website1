import { useState } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

export default function Checkout() {
  const { data: session } = useSession()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const { plan } = router.query
  const [selectedPlan, setSelectedPlan] = useState(plan || 'premium')

  const plans = {
    premium: {
      name: 'Premium',
      price: 19,
      features: [
        '37 comandos completos',
        'IA conversacional avançada',
        'Música ilimitada do YouTube',
        'Analytics em tempo real',
        'Mini-games premium',
        'Suporte prioritário'
      ]
    },
    enterprise: {
      name: 'Enterprise',
      price: 49,
      features: [
        'Todos recursos Premium',
        'Personalização total',
        'Dashboard exclusivo',
        'API personalizada',
        'Suporte 24/7',
        'SLA garantido'
      ]
    }
  }

  const handlePayment = async () => {
    if (!session) {
      router.push('/api/auth/signin?callbackUrl=' + encodeURIComponent(window.location.href))
      return
    }

    setIsProcessing(true)

    try {
      // Integração com Mercado Pago
      const response = await fetch('/api/payments/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: selectedPlan,
          user: session.user,
          amount: plans[selectedPlan].price
        })
      })

      const preference = await response.json()
      
      if (preference.init_point) {
        window.location.href = preference.init_point
      } else {
        throw new Error('Erro ao criar preferência de pagamento')
      }
    } catch (error) {
      console.error('Erro no pagamento:', error)
      alert('Erro ao processar pagamento. Tente novamente.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <>
      <Head>
        <title>Checkout - Lumi Bot</title>
        <meta name="description" content="Finalizar compra do plano premium da Lumi" />
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

      <div className="checkout-page">
        <div className="container">
          <h1>Finalizar Assinatura Premium</h1>

          <div className="checkout-grid">
            {/* Plan Selection */}
            <div className="plan-selection">
              <h2>Escolha seu Plano</h2>
              
              {Object.entries(plans).map(([key, plan]) => (
                <div 
                  key={key}
                  className={`plan-option ${selectedPlan === key ? 'selected' : ''}`}
                  onClick={() => setSelectedPlan(key)}
                >
                  <div className="plan-header">
                    <h3>{plan.name}</h3>
                    <div className="plan-price">
                      R$ {plan.price}<span>/mês</span>
                    </div>
                  </div>
                  <ul className="plan-features">
                    {plan.features.map((feature, index) => (
                      <li key={index}>✅ {feature}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Checkout Form */}
            <div className="checkout-summary">
              <h2>Resumo do Pedido</h2>
              
              {session ? (
                <div className="user-info">
                  <div className="user-details">
                    <img 
                      src={session.user.image} 
                      alt={session.user.name}
                      className="user-avatar"
                    />
                    <div>
                      <div className="user-name">{session.user.name}</div>
                      <div className="user-email">{session.user.email}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="login-required">
                  <p>Você precisa fazer login para continuar</p>
                  <button
                    onClick={() => router.push('/api/auth/signin?callbackUrl=' + encodeURIComponent(window.location.href))}
                    className="btn-discord"
                  >
                    Fazer Login com Discord
                  </button>
                </div>
              )}

              <div className="order-details">
                <div className="order-item">
                  <span>Plano {plans[selectedPlan].name}</span>
                  <span>R$ {plans[selectedPlan].price}/mês</span>
                </div>
                <div className="order-info">
                  <span>Cobrança mensal recorrente</span>
                  <span>Cancele quando quiser</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={isProcessing || !session}
                className="checkout-btn"
              >
                {isProcessing ? 'Processando...' : `💳 Assinar por R$ ${plans[selectedPlan].price}/mês`}
              </button>

              <div className="payment-info">
                <p>🔒 Pagamento seguro via Mercado Pago</p>
                <p>✅ Cancele quando quiser, sem taxas</p>
                <p>🎯 Ativação imediata após confirmação</p>
              </div>
            </div>
          </div>

          <div className="back-link">
            <Link href="/">← Voltar ao início</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .checkout-page {
          padding: 120px 2rem 60px;
          min-height: 100vh;
        }
        
        .checkout-page h1 {
          text-align: center;
          color: #a855f7;
          margin-bottom: 3rem;
          font-size: 2.5rem;
        }
        
        .checkout-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .plan-selection, .checkout-summary {
          background: rgba(255, 255, 255, 0.05);
          padding: 2rem;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .plan-selection h2, .checkout-summary h2 {
          color: #a855f7;
          margin-bottom: 2rem;
          font-size: 1.5rem;
        }
        
        .plan-option {
          padding: 1.5rem;
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          margin-bottom: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .plan-option:hover {
          border-color: #a855f7;
        }
        
        .plan-option.selected {
          border-color: #a855f7;
          background: rgba(168, 85, 247, 0.1);
        }
        
        .plan-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        
        .plan-header h3 {
          color: white;
          font-size: 1.25rem;
          margin: 0;
        }
        
        .plan-price {
          color: white;
          font-size: 1.5rem;
          font-weight: bold;
        }
        
        .plan-price span {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
        }
        
        .plan-features {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .plan-features li {
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }
        
        .user-details {
          display: flex;
          align-items: center;
          margin-bottom: 2rem;
        }
        
        .user-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          margin-right: 1rem;
        }
        
        .user-name {
          color: white;
          font-weight: bold;
          margin-bottom: 0.25rem;
        }
        
        .user-email {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
        }
        
        .login-required {
          text-align: center;
          padding: 2rem;
          background: rgba(251, 191, 36, 0.1);
          border: 1px solid rgba(251, 191, 36, 0.3);
          border-radius: 12px;
          margin-bottom: 2rem;
        }
        
        .login-required p {
          color: rgba(251, 191, 36, 0.9);
          margin-bottom: 1rem;
        }
        
        .btn-discord {
          background: #5865F2;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        
        .btn-discord:hover {
          background: #4752C4;
        }
        
        .order-details {
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          padding-top: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .order-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          font-size: 1.1rem;
        }
        
        .order-item span:first-child {
          color: rgba(255, 255, 255, 0.8);
        }
        
        .order-item span:last-child {
          color: white;
          font-weight: bold;
        }
        
        .order-info {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
        }
        
        .checkout-btn {
          width: 100%;
          background: linear-gradient(45deg, #a855f7, #ec4899);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 2rem;
        }
        
        .checkout-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(168, 85, 247, 0.3);
        }
        
        .checkout-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .payment-info {
          text-align: center;
        }
        
        .payment-info p {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }
        
        .back-link {
          text-align: center;
          margin-top: 3rem;
        }
        
        .back-link a {
          color: #a855f7;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        
        .back-link a:hover {
          color: white;
        }
      `}</style>
    </>
  )
}