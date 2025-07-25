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
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                L
              </div>
              <span className="text-white text-2xl font-bold">Lumi</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-white hover:text-purple-300 transition-colors">Recursos</a>
              <a href="#pricing" className="text-white hover:text-purple-300 transition-colors">Planos</a>
              <a href="/docs" className="text-white hover:text-purple-300 transition-colors">Docs</a>
              <a href="/support" className="text-white hover:text-purple-300 transition-colors">Suporte</a>
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
              <a href="/contact" className="btn-secondary w-full block">
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