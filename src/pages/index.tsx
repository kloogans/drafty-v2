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
  return (
    <Layout enforceAuth={false}>
      <div className="flex flex-col items-center justify-center translate-y-2">
        <LogoIcon className="w-20 h-20" animated showDebris />

        <h1 className="title-font leading-none text-indigo-200 text-3xl lg:text-4xl -translate-y-2">
          Drafty
        </h1>
      </div>
      <h2 className="text-lg text-indigo-300 leading-none mb-4 max-w-xs">
        Making twitter drafts a <strong>breeze💨</strong>
      </h2>

      {!isAuthenticated ? (
        <PrimaryButton
          handleClick={() => signIn("twitter")}
          title="Sign in with my Twitter"
        >
          Sign in with my Twitter
        </PrimaryButton>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4">
          <PrimaryButton
            title="Create a new draft"
            isInternalLink
            linkPath="/new"
            className="group"
            isCTA
          >
            <span className="flex items-center justify-center h-full gap-1 scale-100 group-hover:scale-95">
              <Icon
                url="/assets/icons/pencil.svg"
                className="w-4 h-4 bg-white group-hover:bg-indigo-800 transition duration-200 ease-in-out"
              />
              Start a <strong>new</strong> draft
            </span>
          </PrimaryButton>

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
    </Layout>
  )
}

export default Home
