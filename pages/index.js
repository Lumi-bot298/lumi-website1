import { useState } from 'react'
import { useSession, signIn } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(false)

  const handleDemo = async () => {
    setIsLoading(true)
    if (!session) {
      await signIn('discord')
    } else {
      // Redirect to demo
      window.location.href = '/demo'
    }
    setIsLoading(false)
  }

  return (
    <>
      <Head>
        <title>Lumi - O Bot Discord Mais Avançado do Brasil</title>
        <meta name="description" content="Bot Discord brasileiro com IA conversacional, música do YouTube, sistema de economia e 37+ comandos únicos." />
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
            <nav className="hidden md:flex space-x-8 items-center">
              <a href="#features" className="text-white hover:text-purple-300 transition-colors">Recursos</a>
              <a href="/premium" className="text-white hover:text-purple-300 transition-colors">Planos</a>
              <a href="/docs" className="text-white hover:text-purple-300 transition-colors">Docs</a>
              <a href="/support" className="text-white hover:text-purple-300 transition-colors">Suporte</a>
              {session ? (
                <div className="flex items-center space-x-3">
                  <span className="text-white">Olá, {session.user.name}</span>
                  <a href="/dashboard" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                    Dashboard
                  </a>
                </div>
              ) : (
                <button 
                  onClick={() => signIn('discord')}
                  className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.196.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                  <span>Login</span>
                </button>
              )}
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              O Bot Discord Mais
              <span className="gradient-text block">Avançado do Brasil</span>
            </h1>
            <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
              Primeiro bot brasileiro com IA conversacional real, música do YouTube, 
              37+ comandos únicos e sistema de economia avançado.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={handleDemo}
                disabled={isLoading}
                className="btn-primary text-lg px-8 py-4 disabled:opacity-50"
              >
                {isLoading ? 'Carregando...' : '🚀 Demo Grátis'}
              </button>
              <a href="#pricing" className="btn-secondary text-lg px-8 py-4">
                💎 Ver Planos Premium
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container mx-auto px-6 py-20">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Recursos Únicos da Lumi
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🤖',
                title: 'IA Conversacional',
                description: 'Primeira IA brasileira real em Discord bot com aprendizado e personalidade única.'
              },
              {
                icon: '🎵',
                title: 'Música do YouTube',
                description: 'Sistema completo de música com integração real do YouTube e controles avançados.'
              },
              {
                icon: '📊',
                title: 'Analytics Reais',
                description: 'Dados autênticos do servidor com métricas detalhadas e insights profissionais.'
              },
              {
                icon: '🎮',
                title: '6 Mini-Games',
                description: 'Jogos interativos com estado persistente e rankings competitivos.'
              },
              {
                icon: '💎',
                title: 'Sistema de Economia',
                description: 'LumiCoins, banco virtual, trabalhos e sistema de níveis integrado.'
              },
              {
                icon: '🛡️',
                title: 'Moderação Avançada',
                description: 'Auto-moderação, filtros inteligentes e sistema de punições automáticas.'
              }
            ].map((feature, index) => (
              <div key={index} className="glass-effect p-6 text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-200">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="container mx-auto px-6 py-20">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Planos e Preços
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="glass-effect p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Gratuito</h3>
              <div className="text-4xl font-bold text-white mb-6">R$ 0</div>
              <ul className="text-gray-200 space-y-3 mb-8">
                <li>✅ 20 comandos básicos</li>
                <li>✅ Moderação simples</li>
                <li>✅ Música limitada</li>
                <li>✅ Suporte comunidade</li>
              </ul>
              <button 
                onClick={handleDemo}
                className="btn-secondary w-full"
              >
                Começar Grátis
              </button>
            </div>

            {/* Premium Plan */}
            <div className="glass-effect p-8 text-center border-2 border-purple-400 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-1 rounded-full text-sm">
                Mais Popular
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Premium</h3>
              <div className="text-4xl font-bold text-white mb-6">R$ 19<span className="text-lg">/mês</span></div>
              <ul className="text-gray-200 space-y-3 mb-8">
                <li>✅ 37 comandos completos</li>
                <li>✅ IA conversacional</li>
                <li>✅ Música ilimitada YouTube</li>
                <li>✅ Analytics avançados</li>
                <li>✅ Mini-games premium</li>
                <li>✅ Suporte prioritário</li>
              </ul>
              <a href="/premium/checkout" className="btn-primary w-full block">
                Assinar Premium
              </a>
            </div>

            {/* Enterprise Plan */}
            <div className="glass-effect p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Enterprise</h3>
              <div className="text-4xl font-bold text-white mb-6">R$ 49<span className="text-lg">/mês</span></div>
              <ul className="text-gray-200 space-y-3 mb-8">
                <li>✅ Todos recursos Premium</li>
                <li>✅ Personalização total</li>
                <li>✅ Dashboard exclusivo</li>
                <li>✅ API personalizada</li>
                <li>✅ Suporte 24/7</li>
              </ul>
              <a href="/enterprise" className="btn-secondary w-full block">
                Falar com Vendas
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-6 py-12 text-center">
          <div className="border-t border-gray-700 pt-8">
            <p className="text-gray-400 mb-4">
              © 2025 Lumi Discord Bot. Desenvolvido por Guilherme Almeida (Dy. Black)
            </p>
            <div className="flex justify-center space-x-6">
              <a href="/privacy" className="text-gray-400 hover:text-white">Privacidade</a>
              <a href="/terms" className="text-gray-400 hover:text-white">Termos</a>
              <a href="/support" className="text-gray-400 hover:text-white">Suporte</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}