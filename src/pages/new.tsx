import dynamic from "next/dynamic"
import { useGlobalState } from "src/state/hooks/useGlobalState"
import { DraftEditorProvider } from "src/components/draftEditor/state/DraftEditorProvider"
import { GetServerSideProps } from "next"
import shortUUID from "short-uuid"
import Head from "next/head"
import { getSession } from "next-auth/react"
const Layout = dynamic(() => import("src/components/layout/Layout"))
const PrimaryHeading = dynamic(
  () => import("src/components/headings/PrimaryHeading")
)
const DraftEditor = dynamic(
  () => import("src/components/draftEditor/DraftEditor")
)

const NewDraftPage: React.FC<{ id: string; isAuthenticated: boolean }> = ({
  id,
  isAuthenticated
}) => {
  const { togglePopover } = useGlobalState()
  return (
    <DraftEditorProvider>
      <Layout
        enforceAuth
        isAuthenticated={isAuthenticated}
        className="min-h-screen !justify-start pt-20 md:pt-32"
      >
        <Head>
          <title>New Draft</title>
        </Head>

        <DraftEditor id={id} />
      </Layout>
    </DraftEditorProvider>
  )
}

export default NewDraftPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req })
  const isAuthenticated = session && session?.user
  const newId = shortUUID.generate()
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
        isAuthenticated
      }
    }
  }
  return {
    props: {
      id: newId,
      isAuthenticated
    }
  }
}
