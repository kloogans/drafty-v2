import dynamic from "next/dynamic"
import { useSession } from "next-auth/react"
import Error from "next/error"
import { useGlobalState } from "state/hooks/useGlobalState"
import { LayoutProps } from "./types"
const Popover = dynamic(() => import("components/popover/Popover"))

const Layout: React.FC<LayoutProps> = ({ children, enforceAuth = false }) => {
  const { togglePopover } = useGlobalState()
  const { status } = useSession()
  const isAuthenticated = status !== "loading" && status === "authenticated"

  if (status === "loading") {
    return (
      <div className="w-full h-full min-h-screen flex flex-col items-center justify-center bg-indigo-600">
        <main className="w-full h-full flex flex-col items-center justify-center">
          <p className="text-sm text-white">
            <strong>Loading</strong>
          </p>
        </main>
      </div>
    )
  }

  if (enforceAuth && !isAuthenticated) {
    return <Error statusCode={404} title="Not found" />
  }

  return (
    <>
      <div className="w-full h-full min-h-screen flex flex-col items-center justify-center bg-indigo-600">
        <main className="w-full h-full flex flex-col items-center justify-center">
          {children}
        </main>
      </div>
      <Popover id="main-layout-popover">
        <div className="bg-zinc-700 min-h-[70vh] lg:max-h-[70vh] lg:min-w-[532px] overflow-y-auto scrollbar-blue p-10 rounded-2xl shadow-md flex flex-col items-center justify-start">
          <p className="text-lg font-bold tracking-wide text-zinc-100 mb-4">
            popover
          </p>
        </div>

        <button
          className="mt-10 text-zinc-500 dark:text-zinc-300 dark:hover:text-zinc-400 hover:text-zinc-700 mx-auto w-full text-md"
          title="Close popover"
          onClick={togglePopover}
        >
          Save and Close
        </button>
      </Popover>
    </>
  )
}

export default Layout
