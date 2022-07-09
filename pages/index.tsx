import type { NextPage } from "next"
import Head from "next/head"
import { useSession, signIn, signOut } from "next-auth/react"

const Home: NextPage = () => {
  const { data: session, status } = useSession()
  const isAuthenticated = status === "authenticated"
  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-center bg-indigo-600">
      <Head>
        <title>Drafty</title>
        <meta name="description" content="Your drafts lol" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full h-full flex flex-col items-center justify-center">
        <h1 className="text-2xl text-white font-bold mb-2">Drafty</h1>

        {!isAuthenticated && (
          <button
            className="text-md px-3 py-2 bg-amber-300 rounded-2xl border-4 border-yellow-100"
            onClick={() => signIn("twitter")}
          >
            Connect with my Twitter
          </button>
        )}
        {isAuthenticated && (
          <button
            className="text-md px-3 py-2 bg-amber-300 rounded-2xl border-4 border-yellow-100"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        )}
      </main>
    </div>
  )
}

export default Home
