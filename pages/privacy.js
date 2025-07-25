import Head from 'next/head'
import Image from 'next/image'

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Política de Privacidade - Lumi Discord Bot</title>
        <meta name="description" content="Política de privacidade e proteção de dados do Lumi Discord Bot." />
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
              Política de Privacidade
            </h1>
            <p className="text-xl text-gray-200 text-center mb-12">
              Última atualização: 25 de janeiro de 2025
            </p>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 space-y-8">
              
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. Informações que Coletamos</h2>
                <div className="text-gray-200 space-y-3">
                  <p><strong>Dados do Discord:</strong> ID do usuário, nome de usuário, avatar, ID do servidor</p>
                  <p><strong>Dados de Uso:</strong> Comandos utilizados, mensagens processadas, atividade no servidor</p>
                  <p><strong>Dados de Economia:</strong> Saldo virtual, transações, rankings (apenas dentro do bot)</p>
                  <p><strong>Dados de Configuração:</strong> Preferências do servidor, configurações personalizadas</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. Como Usamos seus Dados</h2>
                <div className="text-gray-200 space-y-3">
                  <p>• <strong>Funcionalidade:</strong> Fornecer recursos do bot (economia, moderação, entretenimento)</p>
                  <p>• <strong>Personalização:</strong> Adaptar a experiência às preferências do servidor</p>
                  <p>• <strong>Analytics:</strong> Melhorar o desempenho e desenvolver novos recursos</p>
                  <p>• <strong>Suporte:</strong> Resolver problemas e fornecer assistência técnica</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. Proteção de Dados</h2>
                <div className="text-gray-200 space-y-3">
                  <p>• <strong>Criptografia:</strong> Todos os dados são armazenados com criptografia</p>
                  <p>• <strong>Acesso Limitado:</strong> Apenas desenvolvedores autorizados têm acesso</p>
                  <p>• <strong>Backups Seguros:</strong> Backups automáticos com proteção adicional</p>
                  <p>• <strong>Monitoramento:</strong> Sistemas de detecção de acesso não autorizado</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. Compartilhamento de Dados</h2>
                <div className="text-gray-200 space-y-3">
                  <p><strong>NÃO compartilhamos</strong> seus dados pessoais com terceiros, exceto:</p>
                  <p>• Discord API (necessário para funcionamento do bot)</p>
                  <p>• Processadores de pagamento (apenas para transações premium)</p>
                  <p>• Quando exigido por lei</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Seus Direitos</h2>
                <div className="text-gray-200 space-y-3">
                  <p>• <strong>Acesso:</strong> Solicitar cópia dos seus dados</p>
                  <p>• <strong>Correção:</strong> Corrigir informações incorretas</p>
                  <p>• <strong>Exclusão:</strong> Deletar seus dados (comando !deletar-dados)</p>
                  <p>• <strong>Portabilidade:</strong> Exportar seus dados em formato legível</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Retenção de Dados</h2>
                <div className="text-gray-200 space-y-3">
                  <p>• <strong>Dados Ativos:</strong> Mantidos enquanto usar o bot</p>
                  <p>• <strong>Dados Inativos:</strong> Removidos após 12 meses de inatividade</p>
                  <p>• <strong>Logs:</strong> Mantidos por 90 dias para fins de segurança</p>
                  <p>• <strong>Backups:</strong> Removidos após 1 ano</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">7. Cookies e Tecnologias</h2>
                <div className="text-gray-200 space-y-3">
                  <p>• <strong>Cookies Essenciais:</strong> Para autenticação e funcionalidade</p>
                  <p>• <strong>Analytics:</strong> Para melhorar a experiência (anonimizados)</p>
                  <p>• <strong>Não usamos:</strong> Cookies de rastreamento ou publicidade</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">8. Menores de Idade</h2>
                <div className="text-gray-200 space-y-3">
                  <p>• Seguimos as diretrizes do Discord (13+ anos)</p>
                  <p>• Não coletamos intencionalmente dados de menores de 13 anos</p>
                  <p>• Pais podem solicitar remoção de dados de menores</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">9. Mudanças na Política</h2>
                <div className="text-gray-200 space-y-3">
                  <p>• Notificaremos sobre mudanças significativas</p>
                  <p>• Uso continuado implica aceite das alterações</p>
                  <p>• Histórico de versões disponível sob solicitação</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">10. Contato</h2>
                <div className="text-gray-200 space-y-3">
                  <p><strong>Desenvolvedor:</strong> Guilherme Almeida (Dy. Black)</p>
                  <p><strong>Discord:</strong> Entre no servidor de suporte</p>
                  <p><strong>Site:</strong> <a href="/support" className="text-purple-300 hover:text-purple-200">Central de Suporte</a></p>
                  <p><strong>Para exercer direitos:</strong> Use o comando !privacidade no Discord</p>
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