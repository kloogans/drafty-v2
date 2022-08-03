import type { NextPage } from "next"
import dynamic from "next/dynamic"
import { useSession, signIn, signOut } from "next-auth/react"
import { PrimaryButton, SecondaryButton } from "src/components/buttons"
import Icon from "src/components/icon/Icon"
import LogoIcon from "src/components/logo/LogoIcon"
import Link from "next/link"
import Head from "next/head"
import Footer from "src/components/footer/Footer"

const Layout = dynamic(() => import("src/components/layout/Layout"))
const PrimaryHeading = dynamic(
  () => import("src/components/headings/PrimaryHeading")
)
const Home: NextPage = () => {
  const { data: session, status } = useSession()
  const isAuthenticated = status !== "loading" && status === "authenticated"
  return (
    <>
      <Layout className="min-h-screen" enforceAuth={false}>
        <Head>
          <title>Drafty - Making Twitter drafts a breeze</title>
        </Head>

        <div className="w-full flex flex-col items-center justify-center flex-auto">
          <div className="flex items-center justify-center relative">
            <h1 className="title-font leading-none text-indigo-200 text-5xl sm:text-7xl select-none">
              Drafty
            </h1>
            <LogoIcon className="w-16 h-16 sm:w-20 sm:h-20 bg-indigo-200 absolute right-[-3.5rem] top-[-1.3rem] sm:right-[-4rem] sm:top-[-1rem]" />
          </div>
          <h2 className="text-lg text-indigo-300 leading-none mb-4 max-w-xs">
            Making twitter drafts a{" "}
            <strong>
              <em>breeze</em>
            </strong>
          </h2>

          {!isAuthenticated ? (
            <button
              onClick={() => signIn("twitter")}
              title="Sign in with Twitter"
              className="px-4 py-2 text-md border-2 border-bg-white text-white hover:bg-amber-400 hover:text-indigo-800 hover:border-amber-400 group rounded-2xl transition duration-200 ease-in-out"
            >
              <span className="flex items-center justify-center h-full gap-1 scale-100 group-hover:scale-95">
                <Icon
                  url="/assets/icons/twitter.svg"
                  className="w-5 h-5 bg-white group-hover:bg-indigo-800 transition duration-200 ease-in-out"
                />
                Sign in with <strong>Twitter</strong>
              </span>
            </button>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4">
              <Link href="/new">
                <a
                  title="Create a new draft"
                  className="px-4 py-2 text-md border-2 border-bg-white text-white hover:bg-amber-400 hover:text-indigo-800 hover:border-amber-400 group rounded-2xl transition duration-200 ease-in-out"
                >
                  <span className="flex items-center justify-center h-full gap-1 scale-100 group-hover:scale-95">
                    <Icon
                      url="/assets/icons/pencil.svg"
                      className="w-5 h-5 bg-white group-hover:bg-indigo-800 transition duration-200 ease-in-out"
                    />
                    Create a <strong>new</strong> draft
                  </span>
                </a>
              </Link>

              <SecondaryButton
                linkPath="/drafts"
                title="Go to my drafts"
                isInternalLink
                tertiary
              >
                Go to my <strong>drafts</strong>
              </SecondaryButton>
              <SecondaryButton
                handleClick={() => signOut()}
                title="Sign out of my account"
                tertiary
              >
                Sign out
              </SecondaryButton>
            </div>
          )}
        </div>
        <Footer className="absolute bottom-0" />
      </Layout>
    </>
  )
}

export default Home
