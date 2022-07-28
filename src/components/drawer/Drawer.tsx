import { useEffect, useRef } from "react"
import { useGlobalState } from "src/state/hooks/useGlobalState"
import { useClickAway } from "react-use"
import Link from "next/link"
import { signOut } from "next-auth/react"
import { useRouter } from "next/router"
const Drawer = () => {
  const router = useRouter()
  const { toggleDrawer, drawerIsOpen } = useGlobalState()
  const drawerContainer = useRef(null)

  useClickAway(drawerContainer, () => {
    drawerIsOpen && toggleDrawer()
  })

  let transformState = `translate-x-[100%]`

  if (drawerIsOpen) transformState = `translate-x-[0])`

  useEffect(() => {
    drawerIsOpen && toggleDrawer()

    return () => {
      drawerIsOpen && toggleDrawer()
    }
  }, [router.pathname])

  return (
    <aside
      ref={drawerContainer}
      style={{ height: "calc(100% - 121px)" }}
      className={`rounded-l-2xl fixed right-0 bg-zinc-800 scrollbar-zinc border-4 border-amber-400 border-r-0 top-[101px] shadow-md shadow-md w-[30rem] p-4 flex flex-col items-center justify-start transition duration-200 ease-in-out ${transformState} z-40 overflow-y-auto`}
    >
      <div className={`w-full flex flex-col items-center justify-center`}>
        <div className="w-full flex flex-col items-center justify-center">
          <p className="text-xs text-zinc-400 pt-4 pb-2 border-b-2 border-b-zinc-400 mb-4">
            Menu
          </p>

          <ul className="w-full flex flex-col items-center justify-center gap-2">
            <li className="w-full">
              <Link href="/">
                <a
                  href="#"
                  className="w-full flex flex-col items-center justify-center px-4 py-5 hover:bg-zinc-700 rounded-2xl text-white hover:text-amber-400 focus:text-amber-400"
                >
                  Home
                </a>
              </Link>
            </li>
            <li className="w-full">
              <Link href="/new">
                <a
                  href="#"
                  className="w-full flex flex-col items-center justify-center px-4 py-5 hover:bg-zinc-700 rounded-2xl text-white hover:text-amber-400 focus:text-amber-400"
                >
                  Create a New Draft
                </a>
              </Link>
            </li>
            <li className="w-full">
              <Link href="/drafts">
                <a
                  href="#"
                  className="w-full flex flex-col items-center justify-center px-4 py-5 hover:bg-zinc-700 rounded-2xl text-white hover:text-amber-400 focus:text-amber-400"
                >
                  My Drafts
                </a>
              </Link>
            </li>
            <li className="w-full">
              <Link href="/settings">
                <a
                  href="#"
                  className="w-full flex flex-col items-center justify-center px-4 py-5 hover:bg-zinc-700 rounded-2xl text-white hover:text-amber-400 focus:text-amber-400"
                >
                  Settings
                </a>
              </Link>
            </li>
            <li className="w-full">
              <button
                className="w-full flex flex-col items-center justify-center px-4 py-5 hover:bg-zinc-700 rounded-2xl text-white hover:text-amber-400 focus:text-amber-400"
                onClick={() => signOut()}
              >
                Sign out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  )
}

export default Drawer
