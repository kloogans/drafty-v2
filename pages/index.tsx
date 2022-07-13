import type { NextPage } from "next"
import dynamic from "next/dynamic"
import { useSession, signIn, signOut } from "next-auth/react"
import { PrimaryButton, SecondaryButton } from "components/buttons"
import Icon from "components/icon/Icon"

const Layout = dynamic(() => import("components/layout/Layout"))
const PrimaryHeading = dynamic(
  () => import("components/headings/PrimaryHeading")
)
const Home: NextPage = () => {
  const { data: session, status } = useSession()
  const isAuthenticated = status !== "loading" && status === "authenticated"
  console.log(session?.user)
  return (
    <Layout enforceAuth={false}>
      <Icon
        className={`w-20 h-20 bg-white`}
        url={`/assets/logo/drafty-icon.svg`}
      />
      <PrimaryHeading className="mb-2">
        <strong>Drafty</strong>
      </PrimaryHeading>

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
          <div className="flex items-center gap-4">
            <PrimaryButton
              title="Go to my drafts"
              isInternalLink={true}
              linkPath="/drafts"
            >
              Go to my <strong>drafts</strong>
            </PrimaryButton>
            <PrimaryButton
              title="Create a new draft"
              isInternalLink={true}
              linkPath="/new"
            >
              <strong>Create</strong> a new draft
            </PrimaryButton>
          </div>
          <SecondaryButton
            handleClick={() => signOut()}
            title="Sign out of my account"
            tertiary={true}
          >
            Sign out
          </SecondaryButton>
        </div>
      )}
    </Layout>
  )
}

export default Home
