import dynamic from "next/dynamic"
import { useGlobalState } from "src/state/hooks/useGlobalState"
import { DraftEditorProvider } from "src/components/draftEditor/state/DraftEditorProvider"
import { GetServerSideProps } from "next"
import shortUUID from "short-uuid"
import Head from "next/head"
const Layout = dynamic(() => import("src/components/layout/Layout"))
const PrimaryHeading = dynamic(
  () => import("src/components/headings/PrimaryHeading")
)
const DraftEditor = dynamic(
  () => import("src/components/draftEditor/DraftEditor")
)

const NewDraftPage: React.FC<{ id: string }> = ({ id }) => {
  const { togglePopover } = useGlobalState()
  return (
    <DraftEditorProvider>
      <Layout enforceAuth className="min-h-screen !justify-start pt-32">
        <Head>
          <title>New Draft</title>
        </Head>
        <PrimaryHeading className="mb-4">
          Create a new <strong>draft</strong>
        </PrimaryHeading>
        <DraftEditor id={id} />
      </Layout>
    </DraftEditorProvider>
  )
}

export default NewDraftPage

export const getServerSideProps: GetServerSideProps = async () => {
  const newId = shortUUID.generate()
  return {
    props: {
      id: newId
    }
  }
}
