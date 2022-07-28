import type { NextPage } from "next"
import dynamic from "next/dynamic"
import { useSession, signIn, signOut } from "next-auth/react"
import { PrimaryButton, SecondaryButton } from "src/components/buttons"
import Icon from "src/components/icon/Icon"
import LogoIcon from "src/components/logo/LogoIcon"
import Link from "next/link"

const Layout = dynamic(() => import("src/components/layout/Layout"))
const PrimaryHeading = dynamic(
  () => import("src/components/headings/PrimaryHeading")
)
const Home: NextPage = () => {
  const { data: session, status } = useSession()
  const isAuthenticated = status !== "loading" && status === "authenticated"
  console.log(session?.user)
  return (
    <Layout enforceAuth={false}>
      <div className="flex flex-col items-center justify-center translate-y-2">
        <LogoIcon className="w-20 h-20" animated />

        <h1 className="title-font leading-none text-indigo-200 text-3xl lg:text-4xl -translate-y-2">
          Drafty
        </h1>
      </div>
      <h2 className="text-lg text-indigo-300 leading-none mb-4 max-w-xs">
        Making twitter drafts a <strong>breeze💨</strong>
      </h2>

      {!isAuthenticated && (
        <PrimaryButton
          handleClick={() => signIn("twitter")}
          title="Sign in with my Twitter"
        >
          Sign in with my Twitter
        </PrimaryButton>
      )}
      {isAuthenticated && (
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex flex-col items-center justify-center gap-4">
            <PrimaryButton
              title="Create a new draft"
              isInternalLink
              isDisplay
              linkPath="/new"
            >
              <strong>Create</strong> a new draft
            </PrimaryButton>
            <Link href="/drafts" passHref>
              <a
                title="Go to my drafts"
                className="text-sm text-white hover:text-amber-300"
              >
                Go to my <strong>drafts</strong>
              </a>
            </Link>
          </div>
          <SecondaryButton
            handleClick={() => signOut()}
            title="Sign out of my account"
            tertiary
          >
            Sign out
          </SecondaryButton>
        </div>
      )}
    </Layout>
  )
}

export default Home
