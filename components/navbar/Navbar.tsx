import dynamic from "next/dynamic"
import Icon from "components/icon/Icon"
import { useSession } from "next-auth/react"
// import nightwind from "nightwind/helper"
import { useTheme } from "next-themes"
import { useGlobalState } from "state/hooks/useGlobalState"
const UserAvatar = dynamic(() => import("components/avatar/Avatar"))

const NavbarContent = () => {
  const { data: session, status } = useSession()
  //   const {  }
  const { theme, setTheme } = useTheme()
  return (
    <div className="flex items-center gap-4">
      <button
        className="px-4 py-1 text-sm text-gray-700 bg-indigo-300 rounded-xl capitalize"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme}
      </button>
      <button
        className="w-12 h-12"
        onClick={() => console.log("toggle nav drawer")}
      >
        <UserAvatar
          url={session?.user ? (session?.user.image as string) : ""}
          username={session?.user ? (session?.user.name as string) : ""}
          size="12"
          //   className={`border-4 transition duration-200 ease-in-out ${
          //     globalState.drawerIsOpen &&
          //     globalState.drawerContentType === "navigation"
          //       ? "border-pink-600 dark:border-pink-500"
          //       : "border-zinc-100 dark:border-zinc-500"
          //   }`}
        />
      </button>
    </div>
  )
}

const Navbar = () => {
  const { data: session, status } = useSession()
  return (
    <nav className="fixed top-0 left-0 flex items-center justify-between px-5 w-full h-20">
      <Icon
        className={`w-10 h-10 bg-white`}
        url={`/assets/logo/drafty-icon.svg`}
      />
      <NavbarContent />
    </nav>
  )
}

export default Navbar
