import GlobalStateProvider from "src/state/global/globalStateProvider"
import { SessionProvider } from "next-auth/react"
import Navbar from "src/components/navbar/Navbar"
import type { AppProps } from "next/app"
import { ThemeProvider } from "next-themes"
import "../styles/globals.css"
import Drawer from "src/components/drawer/Drawer"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import NextNProgress from "nextjs-progressbar"
function Drafty({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
      <GlobalStateProvider>
        <ThemeProvider attribute="class">
          {/* <NextNProgress color="#fbbf24" height={4} showOnShallow={true} /> */}
          <Navbar />
          <Component {...pageProps} />
          <Drawer />
          <ToastContainer
            position="top-center"
            autoClose={1500}
            hideProgressBar={true}
            newestOnTop
            closeOnClick
            limit={1}
            rtl={false}
            draggable
            pauseOnHover
            closeButton={false}
          />
        </ThemeProvider>
      </GlobalStateProvider>
    </SessionProvider>
  )
}

export default Drafty
