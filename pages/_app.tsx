import GlobalStateProvider from "state/global/globalStateProvider"
import { SessionProvider } from "next-auth/react"
import Navbar from "components/navbar/Navbar"
import type { AppProps } from "next/app"
import { ThemeProvider } from "next-themes"
import "../styles/globals.css"
import Drawer from "components/drawer/Drawer"

function Drafty({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
      <GlobalStateProvider>
        <ThemeProvider attribute="class">
          <Navbar />
          <Component {...pageProps} />
          <Drawer />
        </ThemeProvider>
      </GlobalStateProvider>
    </SessionProvider>
  )
}

export default Drafty
