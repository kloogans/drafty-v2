import { useEffect, useRef } from "react"
import { useGlobalState } from "src/state/hooks/useGlobalState"
import { useClickAway } from "react-use"
import Link from "next/link"
import { signOut } from "next-auth/react"
import { useRouter } from "next/router"
import { menuItems } from "./data/menuItems"
interface MenuProps {
  href: string
  title: string
  active: boolean
  children: React.ReactNode
}

const MenuLink: React.FC<MenuProps> = ({ href, children, title, active }) => (
  <Link href={href}>
    <a
      title={title}
      className={`w-full flex flex-col items-center justify-center px-4 py-5 text-white rounded-2xl ${
        active
          ? "text-white bg-indigo-600"
          : "hover:bg-zinc-700 hover:text-indigo-300 focus:text-indigo-300"
      }`}
    >
      {children}
    </a>
  </Link>
)

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
      className={`rounded-l-2xl fixed right-0 bg-zinc-800 scrollbar-zinc border-4 border-indigo-600 border-r-0 top-[101px] shadow-md shadow-md w-[95%] md:w-[30rem] p-4 flex flex-col items-center justify-start transition duration-200 ease-in-out ${transformState} z-40 overflow-y-auto`}
    >
      <div className={`w-full flex flex-col items-center justify-center`}>
        <div className="w-full flex flex-col items-center justify-center">
          <p className="text-xs text-zinc-400 pt-4 pb-2 border-b-2 border-b-zinc-400 mb-4">
            Menu
          </p>

          <ul className="w-full flex flex-col items-center justify-center gap-2">
            {menuItems.map(({ href, title, children }) => (
              <li key={href} className="w-full">
                <MenuLink
                  href={href}
                  title={title}
                  active={router.pathname === href}
                >
                  {children}
                </MenuLink>
              </li>
            ))}
            <li className="w-full">
              <button
                title="Sign out of your account"
                className="w-full flex flex-col items-center justify-center px-4 py-5 hover:bg-zinc-700 rounded-2xl text-white hover:text-indigo-300 focus:text-indigo-300"
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
