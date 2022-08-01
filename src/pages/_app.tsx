import GlobalStateProvider from "src/state/global/globalStateProvider"
import { SessionProvider } from "next-auth/react"
import Navbar from "src/components/navbar/Navbar"
import type { AppProps } from "next/app"
import "../styles/globals.css"
import Drawer from "src/components/drawer/Drawer"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
function Drafty({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
      <GlobalStateProvider>
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
      </GlobalStateProvider>
    </SessionProvider>
  )
}

export default Drafty
