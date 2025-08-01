import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function AuthError() {
  const router = useRouter()
  const { error } = router.query

  const getErrorMessage = (error) => {
    switch (error) {
      case 'OAuthAccountNotLinked':
        return 'Esta conta já está vinculada a outro método de login.'
      case 'OAuthCallback':
        return 'Erro na autenticação com o Discord. Tente novamente.'
      case 'OAuthCreateAccount':
        return 'Não foi possível criar sua conta. Tente novamente.'
      case 'EmailCreateAccount':
        return 'Não foi possível criar uma conta com este email.'
      case 'Callback':
        return 'Erro no processo de autenticação. Tente novamente.'
      case 'OAuthSignin':
        return 'Erro ao fazer login com o Discord.'
      case 'EmailSignin':
        return 'Erro ao fazer login com email.'
      case 'CredentialsSignin':
        return 'Credenciais inválidas.'
      case 'SessionRequired':
        return 'É necessário fazer login para acessar esta página.'
      default:
        return 'Ocorreu um erro durante o login. Tente novamente.'
    }
  }

  return (
    <>
      <Head>
        <title>Erro de Autenticação - Lumi Discord Bot</title>
        <meta name="description" content="Erro durante o processo de autenticação" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto p-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 text-center">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <Image
                src="/lumi-avatar.png"
                alt="Lumi Bot Avatar"
                width={64}
                height={64}
                className="rounded-full"
              />
            </div>

            {/* Error Icon */}
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-white mb-4">
              Erro de Autenticação
            </h1>

            <p className="text-gray-300 mb-6">
              {getErrorMessage(error)}
            </p>

            <div className="space-y-3">
              <button
                onClick={() => router.push('/api/auth/signin')}
                className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.196.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                <span>Tentar Login Novamente</span>
              </button>

              <button
                onClick={() => router.push('/')}
                className="w-full bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Voltar ao Início
              </button>
            </div>

            <div className="mt-6 text-sm text-gray-400">
              <p>Se o problema persistir, entre em contato com nosso suporte.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}