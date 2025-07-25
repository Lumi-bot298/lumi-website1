import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'

export default function Enterprise() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    servers: '',
    requirements: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Redirect to Discord support for enterprise inquiries
    window.open('https://discord.gg/lumi-enterprise', '_blank')
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <Head>
        <title>Enterprise - Lumi Discord Bot</title>
        <meta name="description" content="Soluções Enterprise da Lumi para grandes servidores e organizações." />
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
              <a href="/docs" className="text-white hover:text-purple-300 transition-colors">Docs</a>
              <a href="/support" className="text-white hover:text-purple-300 transition-colors">Suporte</a>
            </nav>
          </div>
        </header>

        {/* Content */}
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-5xl font-bold text-white mb-8 text-center">
              Soluções Enterprise
            </h1>
            <p className="text-xl text-gray-200 text-center mb-12">
              Poderosos recursos para grandes servidores e organizações
            </p>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Benefits */}
              <div className="space-y-8">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
                  <h2 className="text-3xl font-bold text-white mb-6">Por que Enterprise?</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white text-xl">
                        🏢
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">Escalabilidade Total</h3>
                        <p className="text-gray-300">Suporte para servidores com 50.000+ membros sem limitações de performance.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xl">
                        ⚙️
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">Customização Completa</h3>
                        <p className="text-gray-300">Dashboard personalizado, comandos exclusivos e integração com suas APIs.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center text-white text-xl">
                        🛡️
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">Suporte Dedicado</h3>
                        <p className="text-gray-300">Acesso direto ao desenvolvedor com suporte 24/7 e SLA garantido.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center text-white text-xl">
                        📊
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">Analytics Avançados</h3>
                        <p className="text-gray-300">Relatórios detalhados, exportação de dados e integração com BI.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-lg rounded-xl p-8 border border-purple-500/30">
                  <h2 className="text-3xl font-bold text-white mb-6 text-center">Enterprise</h2>
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-white">R$ 49<span className="text-xl">/mês</span></div>
                    <p className="text-gray-300 mt-2">ou sob consulta para grandes volumes</p>
                  </div>
                  
                  <ul className="space-y-3 text-gray-200 mb-8">
                    <li className="flex items-center space-x-3">
                      <span className="text-green-400">✅</span>
                      <span>Todos recursos Premium</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="text-green-400">✅</span>
                      <span>Personalização total</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="text-green-400">✅</span>
                      <span>Dashboard exclusivo</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="text-green-400">✅</span>
                      <span>API personalizada</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="text-green-400">✅</span>
                      <span>Suporte 24/7 dedicado</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="text-green-400">✅</span>
                      <span>SLA de 99.9% uptime</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="text-green-400">✅</span>
                      <span>Treinamento da equipe</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="text-green-400">✅</span>
                      <span>Backup dedicado</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
                <h2 className="text-3xl font-bold text-white mb-6">Fale com Nosso Time</h2>
                <p className="text-gray-300 mb-8">
                  Conte-nos sobre suas necessidades e criaremos uma solução personalizada.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-semibold mb-2">Nome *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-purple-400"
                        placeholder="Seu nome completo"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white font-semibold mb-2">Empresa</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-purple-400"
                        placeholder="Nome da empresa"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">Email Corporativo *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-purple-400"
                      placeholder="contato@empresa.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">Número de Servidores</label>
                    <select
                      name="servers"
                      value={formData.servers}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:border-purple-400"
                    >
                      <option value="">Selecione uma opção</option>
                      <option value="1-5">1-5 servidores</option>
                      <option value="5-20">5-20 servidores</option>
                      <option value="20-50">20-50 servidores</option>
                      <option value="50+">50+ servidores</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">Requisitos Específicos</label>
                    <textarea
                      name="requirements"
                      value={formData.requirements}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-purple-400"
                      placeholder="Descreva suas necessidades específicas, integrações desejadas, volume de usuários, etc."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors"
                  >
                    Solicitar Demonstração Enterprise
                  </button>
                  
                  <p className="text-sm text-gray-400 text-center">
                    Resposta em até 2 horas úteis
                  </p>
                </form>
              </div>
            </div>

            {/* Features Grid */}
            <div className="mt-16">
              <h2 className="text-4xl font-bold text-white text-center mb-12">Recursos Enterprise Exclusivos</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                    🔧
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Comandos Personalizados</h3>
                  <p className="text-gray-300">Criamos comandos específicos para suas necessidades de negócio.</p>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                    🔗
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Integrações API</h3>
                  <p className="text-gray-300">Conecte com seus sistemas existentes (CRM, ERP, ferramentas internas).</p>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                    📈
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Relatórios Avançados</h3>
                  <p className="text-gray-300">Business Intelligence com dados em tempo real e exportação personalizada.</p>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
                  <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                    🛡️
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Segurança Avançada</h3>
                  <p className="text-gray-300">Auditoria completa, logs detalhados e compliance empresarial.</p>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                    ⚡
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Performance Dedicada</h3>
                  <p className="text-gray-300">Recursos dedicados para máxima performance e disponibilidade.</p>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
                  <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                    🎓
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Treinamento</h3>
                  <p className="text-gray-300">Capacitação completa da equipe e documentação personalizada.</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-lg rounded-xl p-8 border border-purple-500/30">
                <h2 className="text-3xl font-bold text-white mb-4">Pronto para Revolucionar seu Servidor?</h2>
                <p className="text-xl text-gray-200 mb-8">
                  Junte-se às organizações que já confiam na Lumi Enterprise
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="/premium/checkout?plan=enterprise"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-lg transition-colors text-lg font-semibold inline-block"
                  >
                    Comprar Enterprise
                  </a>
                  <a href="/support" className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-lg transition-colors text-lg">
                    Falar com Especialista
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}