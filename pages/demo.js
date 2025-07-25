import { useSession, getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Demo() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isActivating, setIsActivating] = useState(false)
  const [demoActivated, setDemoActivated] = useState(false)

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/api/auth/signin')
      return
    }
  }, [session, status, router])

  const activateDemo = async () => {
    setIsActivating(true)
    
    try {
      // Simular ativação do demo
      await new Promise(resolve => setTimeout(resolve, 2000))
      setDemoActivated(true)
    } catch (error) {
      console.error('Erro ao ativar demo:', error)
    } finally {
      setIsActivating(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-8">
            Demo Premium da Lumi
          </h1>
          
          <div className="glass-effect p-8 mb-8">
            <div className="flex items-center justify-center mb-6">
              <img 
                src={session.user.image} 
                alt={session.user.name}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div className="text-left">
                <h2 className="text-2xl font-bold text-white">{session.user.name}</h2>
                <p className="text-gray-300">{session.user.email}</p>
              </div>
            </div>

            {!demoActivated ? (
              <div>
                <p className="text-xl text-gray-200 mb-8">
                  Ative sua versão demo premium por 7 dias gratuitamente!
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🤖</div>
                    <h3 className="text-lg font-bold text-white">IA Conversacional</h3>
                    <p className="text-gray-300">Chat inteligente com personalidade</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-2">🎵</div>
                    <h3 className="text-lg font-bold text-white">Música Premium</h3>
                    <p className="text-gray-300">YouTube ilimitado e alta qualidade</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-2">📊</div>
                    <h3 className="text-lg font-bold text-white">Analytics Avançados</h3>
                    <p className="text-gray-300">Dados reais do seu servidor</p>
                  </div>
                </div>

                <button
                  onClick={activateDemo}
                  disabled={isActivating}
                  className="btn-primary text-xl px-12 py-4 disabled:opacity-50"
                >
                  {isActivating ? 'Ativando Demo...' : '🚀 Ativar Demo Premium (7 dias)'}
                </button>
              </div>
            ) : (
              <div>
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Demo Ativada com Sucesso!
                </h2>
                <p className="text-xl text-gray-200 mb-8">
                  Você tem 7 dias de acesso premium completo à Lumi.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="https://discord.com/api/oauth2/authorize?client_id=1389439603618963497&permissions=8&scope=bot%20applications.commands"
                    className="btn-primary px-8 py-3"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🤖 Adicionar ao Discord
                  </a>
                  <a href="/dashboard" className="btn-secondary px-8 py-3">
                    📊 Ir para Dashboard
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="text-center">
            <a href="/" className="text-purple-300 hover:text-white transition-colors">
              ← Voltar ao início
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  
  return {
    props: {
      session
    }
  }
}