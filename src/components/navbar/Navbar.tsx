import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import Icon from "src/components/icon/Icon"
import { useSession } from "next-auth/react"
// import nightwind from "nightwind/helper"
import { useTheme } from "next-themes"
import { useGlobalState } from "src/state/hooks/useGlobalState"
import Link from "next/link"
const UserAvatar = dynamic(() => import("src/components/avatar/Avatar"))

const NavbarContent = () => {
  const { data: session, status } = useSession()
  const { toggleDrawer, drawerIsOpen } = useGlobalState()
  const { theme, setTheme } = useTheme()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  return (
    <div className="flex items-center gap-4">
      {/* {!loading && (
        <button
          className={`px-4 py-1 text-sm text-gray-700 bg-indigo-300 rounded-xl capitalize`}
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme}
        </button>
      )} */}
      <Link href="/new">
        <a className="px-4 py-2 text-sm border-2 border-bg-white text-white hover:bg-amber-400 hover:text-indigo-800 hover:border-amber-400 group rounded-2xl transition duration-200 ease-in-out">
          <span className="flex items-center justify-center h-full gap-1 scale-100 group-hover:scale-95">
            <Icon
              url="/assets/icons/pencil.svg"
              className="w-4 h-4 bg-white group-hover:bg-indigo-800 transition duration-200 ease-in-out"
            />
            <strong>New</strong> draft
          </span>
        </a>
      </Link>
      <button
        className={`relative w-12 h-12 transition duration-200 ease-in-out group`}
        onClick={() => !drawerIsOpen && toggleDrawer()}
      >
        <UserAvatar
          url={session?.user ? (session?.user.image as string) : ""}
          username={session?.user ? (session?.user.name as string) : ""}
          size="12"
          className={`scale-100 group-hover:scale-[0.9] group-focus:scale-[0.9] ${
            drawerIsOpen ? "scale-[0.9]" : ""
          } transition duration-200 ease-in-out`}
        />
        <div
          className={`absolute h-full w-full bg-amber-400 rounded-full top-0 left-1/2 -translate-x-1/2 z-0 scale-0 group-hover:scale-[1.1] group-focus:scale-[1.1] ${
            drawerIsOpen ? "scale-[1.1]" : ""
          } transition duration-200 ease-in-out`}
        />
      </button>
    </div>
  )
}

const Navbar = () => {
  const { data: session, status } = useSession()
  return (
    <nav className="fixed top-0 left-0 flex items-center justify-between px-5 w-full h-20">
      <Link href="/">
        <a title="Go Home">
          <Icon
            className={`w-8 h-8 bg-white`}
            url={`/assets/logo/tornado-4.svg`}
          />
        </a>
      </Link>
      <NavbarContent />
    </nav>
  )
}

export default Navbar
