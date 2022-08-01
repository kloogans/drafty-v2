import dynamic from "next/dynamic"
import { useSession } from "next-auth/react"
import Error from "next/error"
import { useGlobalState } from "src/state/hooks/useGlobalState"
import { LayoutProps } from "./types"
import { PrimaryButton, SecondaryButton } from "src/components/buttons"
const Popover = dynamic(() => import("src/components/popover/Popover"))

const Layout: React.FC<LayoutProps> = ({
  children,
  enforceAuth = false,
  className
}) => {
  const { togglePopover, popoverTitle, popoverContent, popoverConfirmAction } =
    useGlobalState()
  const { status } = useSession()
  const isAuthenticated = status !== "loading" && status === "authenticated"

  const mainClass =
    "w-full h-full min-h-screen flex flex-col items-center justify-center bg-indigo-900 overflow-x-hidden"
  const innerClass =
    "w-full h-full flex flex-col items-center justify-center relative"

  if (status === "loading") {
    return (
      <main className={`${mainClass}`}>
        <div className={`${innerClass} ${className}`}>
          <p className="text-sm text-white">
            <strong>Loading</strong>
          </p>
        </div>
      </main>
    )
  }

  if (enforceAuth && !isAuthenticated) {
    return <Error statusCode={404} title="Not found" />
  }

  const handleConfirm = async () => {
    popoverConfirmAction()
    togglePopover()
  }

  return (
    <>
      <main className={`${mainClass}`}>
        <div className={`${innerClass} ${className}`}>{children}</div>
      </main>
      <Popover id="main-layout-popover">
        <div className="bg-zinc-800 lg:min-w-[532px] overflow-y-auto scrollbar-blue p-10 rounded-2xl shadow-md flex flex-col items-center justify-start">
          <p className="text-xl font-bold tracking-wide leading-none text-zinc-100 mb-2">
            {popoverTitle}
          </p>
          <p className="text-md tracking-wide leading-none text-zinc-200 mb-4">
            {popoverContent}
          </p>
          <div className="flex gap-2">
            <SecondaryButton
              tertiary
              handleClick={togglePopover}
              title="Cancel"
              className="px-4"
            >
              Cancel
            </SecondaryButton>
            <PrimaryButton
              isDisplay
              handleClick={handleConfirm}
              title="Confirm"
            >
              <strong>Confirm</strong>
            </PrimaryButton>
          </div>
        </div>
      </Popover>
    </>
  )
}

export default Layout
