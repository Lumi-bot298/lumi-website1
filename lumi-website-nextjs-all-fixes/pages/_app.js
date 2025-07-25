import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Lumi - O Bot Discord Mais Avançado do Brasil</title>
        <meta name="description" content="Bot Discord brasileiro com IA conversacional, música do YouTube, sistema de economia e 37+ comandos únicos." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Favicon da Lumi */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  )
}