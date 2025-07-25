import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white text-center mb-12">
            Finalizar Assinatura Premium
          </h1>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Plan Selection */}
            <div className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Escolha seu Plano</h2>
              
              {Object.entries(plans).map(([key, plan]) => (
                <div 
                  key={key}
                  className={`p-4 rounded-lg border-2 cursor-pointer mb-4 transition-all ${
                    selectedPlan === key 
                      ? 'border-purple-400 bg-purple-500/20' 
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                  onClick={() => setSelectedPlan(key)}
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    <div className="text-2xl font-bold text-white">
                      R$ {plan.price}<span className="text-sm">/mês</span>
                    </div>
                  </div>
                  <ul className="text-gray-200 space-y-1">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="text-sm">✅ {feature}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Checkout Form */}
            <div className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Resumo do Pedido</h2>
              
              {session ? (
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <img 
                      src={session.user.image} 
                      alt={session.user.name}
                      className="w-12 h-12 rounded-full mr-3"
                    />
                    <div>
                      <div className="text-white font-bold">{session.user.name}</div>
                      <div className="text-gray-300 text-sm">{session.user.email}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mb-6 p-4 bg-yellow-500/20 border border-yellow-500 rounded-lg">
                  <p className="text-yellow-200 mb-3">
                    Você precisa fazer login para continuar
                  </p>
                  <button
                    onClick={() => router.push('/api/auth/signin?callbackUrl=' + encodeURIComponent(window.location.href))}
                    className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 mx-auto"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.196.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                    <span>Fazer Login com Discord</span>
                  </button>
                </div>
              )}

              <div className="border-t border-gray-600 pt-4 mb-6">
                <div className="flex justify-between text-lg">
                  <span className="text-gray-200">Plano {plans[selectedPlan].name}</span>
                  <span className="text-white font-bold">R$ {plans[selectedPlan].price}/mês</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400 mt-1">
                  <span>Cobrança mensal recorrente</span>
                  <span>Cancele quando quiser</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={isProcessing || !session}
                className="w-full btn-primary text-lg py-4 disabled:opacity-50"
              >
                {isProcessing ? 'Processando...' : `💳 Assinar por R$ ${plans[selectedPlan].price}/mês`}
              </button>

              <div className="mt-6 text-center text-sm text-gray-400">
                <p>🔒 Pagamento seguro via Mercado Pago</p>
                <p>✅ Cancele quando quiser, sem taxas</p>
                <p>🎯 Ativação imediata após confirmação</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <a href="/" className="text-purple-300 hover:text-white transition-colors">
              ← Voltar ao início
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}