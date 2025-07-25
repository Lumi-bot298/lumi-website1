import { useSession, signIn } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'

export default function Premium() {
  const { data: session } = useSession()

  const handlePurchase = (planId) => {
    if (!session) {
      signIn('discord')
      return
    }
    
    // Redirecionar para checkout
    window.location.href = `/premium/checkout?plan=${planId}`
  }

  return (
    <>
      <Head>
        <title>Planos Premium - Lumi</title>
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

      <main className="premium-page">
        <div className="container">
          <h1>Planos Premium</h1>
          <p>Desbloqueie todo o potencial da Lumi no seu servidor</p>

          <div className="pricing-grid">
            <div className="pricing-card">
              <h3>Premium</h3>
              <div className="price">R$ 9,90<span>/mês</span></div>
              <ul>
                <li>✅ Música sem limite</li>
                <li>✅ Comandos premium</li>
                <li>✅ Suporte prioritário</li>
                <li>✅ Dashboard avançado</li>
              </ul>
              <button 
                onClick={() => handlePurchase('premium')}
                className="btn-premium"
              >
                {session ? 'Assinar Premium' : 'Fazer Login'}
              </button>
            </div>

            <div className="pricing-card featured">
              <div className="popular-badge">Mais Popular</div>
              <h3>Premium+</h3>
              <div className="price">R$ 19,90<span>/mês</span></div>
              <ul>
                <li>✅ Tudo do Premium</li>
                <li>✅ IA ilimitada</li>
                <li>✅ Analytics avançados</li>
                <li>✅ Customização total</li>
                <li>✅ Multi-servidores</li>
              </ul>
              <button 
                onClick={() => handlePurchase('premium-plus')}
                className="btn-premium"
              >
                {session ? 'Assinar Premium+' : 'Fazer Login'}
              </button>
            </div>

            <div className="pricing-card">
              <h3>Enterprise</h3>
              <div className="price">R$ 49,90<span>/mês</span></div>
              <ul>
                <li>✅ Tudo do Premium+</li>
                <li>✅ Servidores ilimitados</li>
                <li>✅ API personalizada</li>
                <li>✅ Suporte dedicado</li>
              </ul>
              <button 
                onClick={() => handlePurchase('enterprise')}
                className="btn-premium"
              >
                {session ? 'Assinar Enterprise' : 'Fazer Login'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}