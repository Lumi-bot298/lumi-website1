import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'
import '../styles/globals.css'

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}) {
  return (
    <>
      <Head>
        <title>Lumi - Bot Discord Brasileiro</title>
        <meta name="description" content="O melhor bot Discord do Brasil com IA, música, moderação e muito mais!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  )
}