import dynamic from "next/dynamic"
import { useGlobalState } from "state/hooks/useGlobalState"
import { DraftEditorProvider } from "components/draftEditor/state/DraftEditorProvider"
const Layout = dynamic(() => import("components/layout/Layout"))
const PrimaryHeading = dynamic(
  () => import("components/headings/PrimaryHeading")
)
const DraftEditor = dynamic(() => import("components/draftEditor/DraftEditor"))

interface NewDraftPage {
  settings: any
}

const NewDraftPage: React.FC<NewDraftPage> = () => {
  const { togglePopover } = useGlobalState()
  return (
    <DraftEditorProvider>
      <Layout enforceAuth={true} className="min-h-screen !justify-start pt-32">
        <PrimaryHeading className="mb-4">
          Create a new <strong>draft</strong>
        </PrimaryHeading>
        <DraftEditor />
      </Layout>
    </DraftEditorProvider>
  )
}

export default NewDraftPage
