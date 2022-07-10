import { useSession } from "next-auth/react"
import Error from "next/error"

interface LayoutProps {
  children: React.ReactNode
  enforceAuth?: boolean
}

const Layout: React.FC<LayoutProps> = ({ children, enforceAuth = false }) => {
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
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-center bg-indigo-600">
      <main className="w-full h-full flex flex-col items-center justify-center">
        {children}
      </main>
    </div>
  )
}

export default Layout
