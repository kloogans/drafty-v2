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
import { useEffect, useState } from "react"
import CookieConsent from "react-cookie-consent"
import Link from "next/link"
import Head from "next/head"
const TAG_MANAGER_CONFIG = {
  gtmId: "GTM-N27253L"
}
function Drafty({ Component, pageProps }: AppProps) {
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  useEffect(() => {
    analytics.page()
    TagManager.initialize(TAG_MANAGER_CONFIG)
    setIsDarkTheme(window.matchMedia("(prefers-color-scheme: dark)").matches)
  }, [])
  console.log(isDarkTheme)
  return (
    <SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {isDarkTheme ? (
          <link rel="icon" href="/favicon-dark.ico" />
        ) : (
          <link rel="icon" href="/favicon.ico" />
        )}
      </Head>
      <GlobalStateProvider>
        <AnalyticsProvider instance={analytics}>
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
          <CookieConsent
            location="bottom"
            buttonText="Got it!"
            cookieName="drafty-cookie-consent"
            style={{ background: "#18181b" }}
            expires={150}
            buttonClasses="!bg-amber-400 hover:!bg-amber-500 focus:!bg-amber-500 !font-bold !text-sm !text-indigo-800 !rounded-2xl !px-4 !py-2"
            contentClasses="!text-sm !text-white"
          >
            Drafty uses cookies to handle some of its necessary internal
            workings.{" "}
            <Link href="/cookies">
              <a
                title="Cookie Policy"
                className="text-amber-400 hover:text-amber-500 focus:text-amber-500"
              >
                Learn more
              </a>
            </Link>
          </CookieConsent>
        </AnalyticsProvider>
      </GlobalStateProvider>
    </SessionProvider>
  )
}

export default Drafty
