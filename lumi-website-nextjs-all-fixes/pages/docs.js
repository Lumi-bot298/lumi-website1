import Head from 'next/head'
import Image from 'next/image'

export default function Docs() {
  return (
    <>
      <Head>
        <title>Documentação - Lumi Discord Bot</title>
        <meta name="description" content="Documentação completa do Lumi Discord Bot - comandos, configuração e guias." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        {/* Header */}
        <header className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image
                src="/lumi-avatar.png"
                alt="Lumi Bot Avatar"
                width={48}
                height={48}
                className="rounded-full"
              />
              <span className="text-white text-2xl font-bold">Lumi</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-white hover:text-purple-300 transition-colors">Início</a>
              <a href="#features" className="text-white hover:text-purple-300 transition-colors">Recursos</a>
              <a href="/premium" className="text-white hover:text-purple-300 transition-colors">Planos</a>
              <a href="/support" className="text-white hover:text-purple-300 transition-colors">Suporte</a>
            </nav>
          </div>
        </header>

        {/* Content */}
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-white mb-8 text-center">
              Documentação da Lumi
            </h1>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Comandos Básicos */}
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-4">Comandos Básicos</h2>
                <div className="space-y-3 text-gray-200">
                  <div><code className="bg-purple-600/50 px-2 py-1 rounded">!ajuda</code> - Lista todos os comandos</div>
                  <div><code className="bg-purple-600/50 px-2 py-1 rounded">!sobre</code> - Informações da Lumi</div>
                  <div><code className="bg-purple-600/50 px-2 py-1 rounded">!ping</code> - Verifica latência</div>
                  <div><code className="bg-purple-600/50 px-2 py-1 rounded">!stats</code> - Estatísticas do servidor</div>
                </div>
              </div>

              {/* Moderação */}
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-4">Moderação</h2>
                <div className="space-y-3 text-gray-200">
                  <div><code className="bg-red-600/50 px-2 py-1 rounded">!moderacao</code> - Painel de moderação</div>
                  <div><code className="bg-red-600/50 px-2 py-1 rounded">!antispam</code> - Configurar anti-spam</div>
                  <div><code className="bg-red-600/50 px-2 py-1 rounded">!automod</code> - Moderação automática</div>
                  <div><code className="bg-red-600/50 px-2 py-1 rounded">!logs</code> - Sistema de logs</div>
                </div>
              </div>

              {/* Economia */}
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-4">Sistema de Economia</h2>
                <div className="space-y-3 text-gray-200">
                  <div><code className="bg-green-600/50 px-2 py-1 rounded">!economia</code> - Painel de economia</div>
                  <div><code className="bg-green-600/50 px-2 py-1 rounded">!perfil</code> - Seu perfil e saldo</div>
                  <div><code className="bg-green-600/50 px-2 py-1 rounded">!ranking</code> - Ranking de usuários</div>
                  <div><code className="bg-green-600/50 px-2 py-1 rounded">!nivel</code> - Sistema de níveis</div>
                </div>
              </div>

              {/* IA e Entretenimento */}
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-4">IA e Diversão</h2>
                <div className="space-y-3 text-gray-200">
                  <div><code className="bg-blue-600/50 px-2 py-1 rounded">!ia</code> - IA conversacional</div>
                  <div><code className="bg-blue-600/50 px-2 py-1 rounded">!minigames</code> - Mini-jogos interativos</div>
                  <div><code className="bg-blue-600/50 px-2 py-1 rounded">!musica</code> - Sistema de música</div>
                  <div><code className="bg-blue-600/50 px-2 py-1 rounded">!diversao</code> - Comandos de diversão</div>
                </div>
              </div>

              {/* Configuração */}
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-4">Configuração</h2>
                <div className="space-y-3 text-gray-200">
                  <div><code className="bg-yellow-600/50 px-2 py-1 rounded">!dashboard</code> - Painel do servidor</div>
                  <div><code className="bg-yellow-600/50 px-2 py-1 rounded">!personalizacao</code> - Personalizar servidor</div>
                  <div><code className="bg-yellow-600/50 px-2 py-1 rounded">!temas</code> - Temas visuais</div>
                  <div><code className="bg-yellow-600/50 px-2 py-1 rounded">!welcomer</code> - Mensagens de boas-vindas</div>
                </div>
              </div>

              {/* Premium */}
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-4">Recursos Premium</h2>
                <div className="space-y-3 text-gray-200">
                  <div><code className="bg-gradient-to-r from-purple-600 to-pink-600 px-2 py-1 rounded">!demo</code> - Ativar demo premium</div>
                  <div><code className="bg-gradient-to-r from-purple-600 to-pink-600 px-2 py-1 rounded">!analytics</code> - Analytics avançadas</div>
                  <div><code className="bg-gradient-to-r from-purple-600 to-pink-600 px-2 py-1 rounded">!interface</code> - Interface avançada</div>
                  <div><code className="bg-gradient-to-r from-purple-600 to-pink-600 px-2 py-1 rounded">!auto-reparo</code> - Sistema de auto-reparo</div>
                </div>
              </div>
            </div>

            {/* Guia de Início */}
            <div className="mt-12 bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">Guia de Início Rápido</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">1</div>
                  <h3 className="text-xl font-bold text-white mb-2">Convide a Lumi</h3>
                  <p className="text-gray-300">Adicione a Lumi ao seu servidor Discord</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">2</div>
                  <h3 className="text-xl font-bold text-white mb-2">Configure</h3>
                  <p className="text-gray-300">Use !dashboard para configurar a Lumi</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">3</div>
                  <h3 className="text-xl font-bold text-white mb-2">Aproveite</h3>
                  <p className="text-gray-300">Explore todos os 37+ comandos únicos</p>
                </div>
              </div>
            </div>

            {/* Links Úteis */}
            <div className="mt-8 text-center">
              <div className="flex justify-center space-x-4">
                <a href="/support" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors">
                  Precisa de Ajuda?
                </a>
                <a href="/premium" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg transition-colors">
                  Upgrade Premium
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}