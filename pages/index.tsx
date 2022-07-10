import type { NextPage } from "next"
import dynamic from "next/dynamic"
import { useSession, signIn, signOut } from "next-auth/react"
import { PrimaryButton, SecondaryButton } from "components/buttons"

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
        <PrimaryButton
          handleClick={() => signIn("twitter")}
          title="Sign in with my Twitter"
        >
          Sign in with my Twitter
        </PrimaryButton>
      )}
      {isAuthenticated && (
        <div className="flex items-center justify-center gap-2">
          <PrimaryButton
            title="Go to my drafts"
            isInternalLink={true}
            linkPath="/drafts"
          >
            Go to my <strong>drafts</strong>
          </PrimaryButton>
          <SecondaryButton
            handleClick={() => signOut()}
            title="Sign out of my account"
          >
            Sign out
          </SecondaryButton>
        </div>
      )}
    </Layout>
  )
}

export default Home
