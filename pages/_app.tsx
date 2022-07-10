import GlobalStateProvider from "state/global/globalStateProvider"
import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import "../styles/globals.css"

function Drafty({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
      <GlobalStateProvider>
        <Component {...pageProps} />
      </GlobalStateProvider>
    </SessionProvider>
  )
}

export default Drafty
