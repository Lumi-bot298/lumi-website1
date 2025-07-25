import { useSession, getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Head from 'next/head'

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
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        {/* Header */}
        <header className="bg-black/20 backdrop-blur-sm border-b border-purple-500/30">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src="/lumi-avatar.png" alt="Lumi" className="w-10 h-10 rounded-full" />
              <h1 className="text-2xl font-bold text-white">Dashboard Lumi</h1>
            </div>
            <div className="flex items-center space-x-4">
              <img src={session.user.image} alt={session.user.name} className="w-8 h-8 rounded-full" />
              <span className="text-white">{session.user.name}</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Welcome Card */}
            <div className="col-span-full bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
              <h2 className="text-2xl font-bold text-white mb-2">
                Bem-vindo, {session.user.name}! 👋
              </h2>
              <p className="text-purple-200">
                Gerencie suas configurações da Lumi e monitore a atividade dos seus servidores.
              </p>
            </div>

            {/* Server Stats */}
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
              <h3 className="text-xl font-bold text-white mb-4">📊 Estatísticas</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-purple-200">Servidores:</span>
                  <span className="text-white font-bold">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200">Comandos hoje:</span>
                  <span className="text-white font-bold">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200">Usuários ativos:</span>
                  <span className="text-white font-bold">0</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
              <h3 className="text-xl font-bold text-white mb-4">⚡ Ações Rápidas</h3>
              <div className="space-y-3">
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors">
                  Convidar Lumi
                </button>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                  Ver Comandos
                </button>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors">
                  Suporte
                </button>
              </div>
            </div>

            {/* Premium Status */}
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
              <h3 className="text-xl font-bold text-white mb-4">💎 Status Premium</h3>
              <div className="text-center">
                <div className="bg-orange-600 text-white py-2 px-4 rounded-lg mb-3">
                  Plano Gratuito
                </div>
                <p className="text-purple-200 text-sm mb-4">
                  Upgrade para desbloquear recursos premium
                </p>
                <button 
                  onClick={() => router.push('/premium')}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Fazer Upgrade
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="col-span-full bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
              <h3 className="text-xl font-bold text-white mb-4">📈 Atividade Recente</h3>
              <div className="text-center py-8">
                <p className="text-purple-200">Nenhuma atividade recente</p>
                <p className="text-purple-300 text-sm mt-2">
                  Convide a Lumi para o seu servidor para começar!
                </p>
              </div>
            </div>

          </div>
        </main>
      </div>
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