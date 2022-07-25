import dynamic from "next/dynamic"
import { useGlobalState } from "state/hooks/useGlobalState"
import { DraftEditorProvider } from "components/draftEditor/state/DraftEditorProvider"
import { GetServerSideProps } from "next"
import shortUUID from "short-uuid"
const Layout = dynamic(() => import("components/layout/Layout"))
const PrimaryHeading = dynamic(
  () => import("components/headings/PrimaryHeading")
)
const DraftEditor = dynamic(() => import("components/draftEditor/DraftEditor"))

const NewDraftPage = () => {
  const { togglePopover } = useGlobalState()
  return (
    <DraftEditorProvider>
      <Layout enforceAuth className="min-h-screen !justify-start pt-32">
        <PrimaryHeading className="mb-4">
          Create a new <strong>draft</strong>
        </PrimaryHeading>
        <DraftEditor />
      </Layout>
    </DraftEditorProvider>
  )
}

export default NewDraftPage

// export const getServerSideProps: GetServerSideProps = async () => {
//   const newId = shortUUID.generate()
//   return {
//     props: {
//       id: newId
//     }
//   }
// }
