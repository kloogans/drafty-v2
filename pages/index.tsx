import type { NextPage } from "next"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react"
const Layout = dynamic(() => import("components/layout/Layout"))
const PrimaryHeading = dynamic(
  () => import("components/headings/PrimaryHeading")
)
const Home: NextPage = () => {
  const { data: session, status } = useSession()
  const isAuthenticated = status !== "loading" && status === "authenticated"
  return (
    <Layout enforceAuth={false}>
      <PrimaryHeading className="mb-2">
        <strong>Drafty</strong>
      </PrimaryHeading>

      {!isAuthenticated && (
        <button
          className="text-md px-3 py-2 bg-amber-300 rounded-2xl border-4 border-yellow-100"
          onClick={() => signIn("twitter")}
        >
          Connect with my Twitter
        </button>
      )}
      {isAuthenticated && (
        <div className="flex items-center justify-center gap-2">
          <Link href="/drafts">
            <a
              className="text-md px-3 py-2 bg-amber-300 rounded-2xl border-4 border-yellow-100"
              title="View my drafts"
            >
              Go to my <strong>drafts</strong>
            </a>
          </Link>
          <button
            className="text-md px-3 py-2 rounded-2xl border-4 border-white text-white"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
      )}
    </Layout>
  )
}

export default Home
