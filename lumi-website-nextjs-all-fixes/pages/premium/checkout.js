import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Checkout() {
  const { data: session } = useSession()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('premium')

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
      router.push('/api/auth/signin')
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
                  <p className="text-yellow-200">
                    Você precisa fazer login para continuar
                  </p>
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