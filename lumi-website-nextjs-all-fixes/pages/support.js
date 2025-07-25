import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'

export default function Support() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Redirect to Discord support server
    window.open('https://discord.gg/lumi-support', '_blank')
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
        <title>Suporte - Lumi Discord Bot</title>
        <meta name="description" content="Precisa de ajuda com a Lumi? Entre em contato conosco ou acesse nossa base de conhecimento." />
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
              <a href="/docs" className="text-white hover:text-purple-300 transition-colors">Docs</a>
              <a href="/premium" className="text-white hover:text-purple-300 transition-colors">Planos</a>
            </nav>
          </div>
        </header>

        {/* Content */}
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-white mb-8 text-center">
              Central de Suporte
            </h1>
            <p className="text-xl text-gray-200 text-center mb-12">
              Estamos aqui para ajudar! Encontre respostas ou entre em contato conosco.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* FAQ Rápido */}
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">Perguntas Frequentes</h2>
                
                <div className="space-y-4">
                  <details className="group">
                    <summary className="cursor-pointer text-white font-semibold mb-2 group-open:text-purple-300">
                      Como adicionar a Lumi ao meu servidor?
                    </summary>
                    <p className="text-gray-300 pl-4">
                      Clique no botão "Adicionar ao Discord" na página inicial e siga as instruções de autorização.
                    </p>
                  </details>
                  
                  <details className="group">
                    <summary className="cursor-pointer text-white font-semibold mb-2 group-open:text-purple-300">
                      A Lumi é gratuita?
                    </summary>
                    <p className="text-gray-300 pl-4">
                      Sim! A Lumi oferece muitos recursos gratuitos. O plano Premium desbloqueia recursos avançados como IA ilimitada e analytics.
                    </p>
                  </details>
                  
                  <details className="group">
                    <summary className="cursor-pointer text-white font-semibold mb-2 group-open:text-purple-300">
                      Como configurar a moderação automática?
                    </summary>
                    <p className="text-gray-300 pl-4">
                      Use o comando <code className="bg-purple-600/50 px-1 rounded">!automod</code> para acessar o painel de configuração da moderação automática.
                    </p>
                  </details>
                  
                  <details className="group">
                    <summary className="cursor-pointer text-white font-semibold mb-2 group-open:text-purple-300">
                      A música funciona em todos os servidores?
                    </summary>
                    <p className="text-gray-300 pl-4">
                      Sim! O sistema de música da Lumi funciona em qualquer servidor com integração real do YouTube.
                    </p>
                  </details>
                  
                  <details className="group">
                    <summary className="cursor-pointer text-white font-semibold mb-2 group-open:text-purple-300">
                      Como ativar o demo premium?
                    </summary>
                    <p className="text-gray-300 pl-4">
                      Use o comando <code className="bg-purple-600/50 px-1 rounded">!demo</code> para ativar 7 dias grátis de todos os recursos premium.
                    </p>
                  </details>
                </div>
              </div>

              {/* Formulário de Contato */}
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">Entre em Contato</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">Nome</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-purple-400"
                      placeholder="Seu nome"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-purple-400"
                      placeholder="seu.email@exemplo.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">Assunto</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:border-purple-400"
                      required
                    >
                      <option value="">Selecione um assunto</option>
                      <option value="bug">Reportar Bug</option>
                      <option value="feature">Sugerir Recurso</option>
                      <option value="premium">Questões Premium</option>
                      <option value="configuration">Ajuda com Configuração</option>
                      <option value="other">Outro</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">Mensagem</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-purple-400"
                      placeholder="Descreva sua dúvida ou problema..."
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                  >
                    Enviar Mensagem
                  </button>
                </form>
              </div>
            </div>

            {/* Canais de Suporte */}
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                  📚
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Documentação</h3>
                <p className="text-gray-300 mb-4">Guias completos e exemplos de uso</p>
                <a href="/docs" className="text-purple-300 hover:text-purple-200 transition-colors">
                  Ver Documentação →
                </a>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                  💬
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Discord</h3>
                <p className="text-gray-300 mb-4">Suporte em tempo real na nossa comunidade</p>
                <a href="https://discord.gg/lumi-support" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 transition-colors">
                  Entrar no Discord →
                </a>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                  ⚡
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Status</h3>
                <p className="text-gray-300 mb-4">Verifique o status dos serviços</p>
                <a href="https://status.lumidiscord.xyz" target="_blank" rel="noopener noreferrer" className="text-green-300 hover:text-green-200 transition-colors">
                  Ver Status →
                </a>
              </div>
            </div>

            {/* Informações de Contato */}
            <div className="mt-12 text-center">
              <p className="text-gray-300 mb-4">
                Desenvolvido com ❤️ por <strong className="text-white">Guilherme Almeida (Dy. Black)</strong>
              </p>
              <p className="text-gray-400 text-sm">
                Tempo médio de resposta: 2-6 horas | Suporte Premium: &lt;1 hora
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}