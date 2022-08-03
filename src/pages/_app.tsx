import GlobalStateProvider from "src/state/global/globalStateProvider"
import { SessionProvider } from "next-auth/react"
import Navbar from "src/components/navbar/Navbar"
import type { AppProps } from "next/app"
import "../styles/globals.css"
import Drawer from "src/components/drawer/Drawer"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import TagManager from "react-gtm-module"
import { AnalyticsProvider } from "use-analytics"
import { analytics } from "src/lib/analytics"
import { useEffect } from "react"
import PaperTexture from "src/components/PaperTexture"
const TAG_MANAGER_CONFIG = {
  gtmId: "GTM-N27253L"
}
function Drafty({ Component, pageProps }: AppProps) {
  useEffect(() => {
    analytics.page()
    TagManager.initialize(TAG_MANAGER_CONFIG)
  }, [])
  return (
    <SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
      <GlobalStateProvider>
        <AnalyticsProvider instance={analytics}>
          <PaperTexture />
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
        </AnalyticsProvider>
      </GlobalStateProvider>
    </SessionProvider>
  )
}

export default Drafty
