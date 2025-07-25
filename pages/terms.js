import Head from 'next/head'
import Image from 'next/image'

export default function Terms() {
  return (
    <>
      <Head>
        <title>Termos de Uso - Lumi Discord Bot</title>
        <meta name="description" content="Termos de uso e condições de serviço do Lumi Discord Bot." />
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
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-white mb-8 text-center">
              Termos de Uso
            </h1>
            <p className="text-xl text-gray-200 text-center mb-12">
              Última atualização: 25 de janeiro de 2025
            </p>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 space-y-8">
              
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. Aceitação dos Termos</h2>
                <div className="text-gray-200 space-y-3">
                  <p>Ao usar o bot Lumi, você concorda com estes termos de uso.</p>
                  <p>Se não concordar, não use nossos serviços.</p>
                  <p>Estes termos se aplicam a todos os usuários do bot.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. Descrição do Serviço</h2>
                <div className="text-gray-200 space-y-3">
                  <p>• <strong>Lumi</strong> é um bot Discord para gerenciamento e entretenimento de servidores</p>
                  <p>• Oferece recursos de moderação, economia virtual, IA conversacional e mini-jogos</p>
                  <p>• Disponível em versão gratuita e premium</p>
                  <p>• Desenvolvido e mantido por Guilherme Almeida (Dy. Black)</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. Uso Adequado</h2>
                <div className="text-gray-200 space-y-3">
                  <p><strong>Você PODE:</strong></p>
                  <p>• Usar o bot para fins legítimos de entretenimento e moderação</p>
                  <p>• Configurar o bot conforme as necessidades do seu servidor</p>
                  <p>• Participar dos sistemas de economia e jogos</p>
                  <p>• Reportar bugs e sugerir melhorias</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. Uso Proibido</h2>
                <div className="text-gray-200 space-y-3">
                  <p><strong>Você NÃO PODE:</strong></p>
                  <p>• Usar o bot para atividades ilegais ou prejudiciais</p>
                  <p>• Tentar hackear, reverter ou explorar vulnerabilidades</p>
                  <p>• Spam, flood ou abuso dos comandos</p>
                  <p>• Revender ou redistribuir o bot sem autorização</p>
                  <p>• Usar para assédio, discriminação ou conteúdo ofensivo</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Economia Virtual</h2>
                <div className="text-gray-200 space-y-3">
                  <p>• LumiCoins são moeda virtual sem valor monetário real</p>
                  <p>• Não podem ser trocadas por dinheiro real</p>
                  <p>• Podem ser resetadas por manutenção ou violação de termos</p>
                  <p>• Sistema sujeito a mudanças e balanceamento</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Planos Premium</h2>
                <div className="text-gray-200 space-y-3">
                  <p>• Pagamentos processados via Mercado Pago</p>
                  <p>• Recursos premium ativados imediatamente após confirmação</p>
                  <p>• Cancelamento disponível a qualquer momento</p>
                  <p>• Reembolsos seguem política do Mercado Pago</p>
                  <p>• Recursos podem mudar com notificação prévia</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">7. Disponibilidade do Serviço</h2>
                <div className="text-gray-200 space-y-3">
                  <p>• Esforçamo-nos para manter 99%+ de uptime</p>
                  <p>• Manutenções podem causar indisponibilidade temporária</p>
                  <p>• Não garantimos disponibilidade 100% ininterrupta</p>
                  <p>• Usuários premium têm prioridade no suporte</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">8. Propriedade Intelectual</h2>
                <div className="text-gray-200 space-y-3">
                  <p>• Lumi e seu código são propriedade de Guilherme Almeida</p>
                  <p>• Usuários mantêm direitos sobre seu conteúdo no Discord</p>
                  <p>• Proibida cópia, modificação ou redistribuição do bot</p>
                  <p>• Marca "Lumi" é protegida e de uso exclusivo</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">9. Limitação de Responsabilidade</h2>
                <div className="text-gray-200 space-y-3">
                  <p>• Bot fornecido "como está" sem garantias expressas</p>
                  <p>• Não somos responsáveis por danos indiretos</p>
                  <p>• Usuários são responsáveis pelo uso adequado</p>
                  <p>• Limitamos responsabilidade ao valor pago (se aplicável)</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">10. Suspensão e Banimento</h2>
                <div className="text-gray-200 space-y-3">
                  <p><strong>Podemos suspender o acesso por:</strong></p>
                  <p>• Violação destes termos</p>
                  <p>• Uso abusivo ou malicioso</p>
                  <p>• Atividades que prejudiquem outros usuários</p>
                  <p>• Tentativas de fraude ou hacking</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">11. Modificações nos Termos</h2>
                <div className="text-gray-200 space-y-3">
                  <p>• Podemos alterar estes termos a qualquer momento</p>
                  <p>• Mudanças significativas serão notificadas</p>
                  <p>• Uso continuado implica aceite das alterações</p>
                  <p>• Versão atual sempre disponível no site</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">12. Lei Aplicável</h2>
                <div className="text-gray-200 space-y-3">
                  <p>• Estes termos são regidos pela lei brasileira</p>
                  <p>• Foro da cidade de residência do desenvolvedor</p>
                  <p>• Tentativa de resolução amigável antes de processo judicial</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">13. Contato</h2>
                <div className="text-gray-200 space-y-3">
                  <p><strong>Para questões sobre estes termos:</strong></p>
                  <p>• Discord: Servidor de suporte oficial</p>
                  <p>• Site: <a href="/support" className="text-purple-300 hover:text-purple-200">Central de Suporte</a></p>
                  <p>• Desenvolvedor: Guilherme Almeida (Dy. Black)</p>
                </div>
              </section>

            </div>

            {/* Voltar */}
            <div className="mt-8 text-center">
              <a href="/" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors">
                ← Voltar ao Início
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}