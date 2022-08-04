import dynamic from "next/dynamic"
import { GetServerSideProps } from "next"
import { useGlobalState } from "src/state/hooks/useGlobalState"
import { getSession } from "next-auth/react"
import Drafts from "src/models/drafts"
import {
  DraftEditorProps,
  DraftSection
} from "src/components/draftEditor/types"
import DraftEditor from "src/components/draftEditor/DraftEditor"
import { DraftEditorProvider } from "src/components/draftEditor/state/DraftEditorProvider"
import Link from "next/link"

const Layout = dynamic(() => import("src/components/layout/Layout"))
const PrimaryHeading = dynamic(
  () => import("src/components/headings/PrimaryHeading")
)
interface DraftPage {
  draft: DraftEditorProps
  isAuthenticated: boolean
}

const DraftByIdPage: React.FC<DraftPage> = ({ draft, isAuthenticated }) => {
  const { togglePopover } = useGlobalState()

  if (draft == null) {
    return (
      <Layout isAuthenticated={isAuthenticated} enforceAuth>
        <PrimaryHeading>Nothing&apos;s here!</PrimaryHeading>
      </Layout>
    )
  }

  return (
    <DraftEditorProvider>
      <Layout
        isAuthenticated={isAuthenticated}
        className="min-h-screen !justify-start pt-32"
        enforceAuth
      >
        <div className="w-full max-w-xl mb-5">
          <Link href="/drafts">
            <a className="flex items-center text-sm text-white hover:text-amber-400">
              <span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Back to drafts
            </a>
          </Link>
        </div>
        <DraftEditor id={draft.id} data={draft.sections} />
      </Layout>
    </DraftEditorProvider>
  )
}

export default DraftByIdPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req })
  const isAuthenticated = session && session?.user
  const { draftId } = context.query
  try {
    //@ts-ignore
    const draftById = await Drafts.aggregate([
      { $match: { uid: session?.user?.uid, "drafts.id": draftId } },
      {
        $project: {
          drafts: {
            $filter: {
              input: "$drafts",
              as: "draft",
              cond: { $eq: ["$$draft.id", draftId] }
            }
          },
          _id: 0
        }
      }
    ])
    return {
      props: {
        draft: draftById[0].drafts[0],
        isAuthenticated
      }
    }
  } catch (e) {
    return {
      props: {
        draft: null,
        isAuthenticated
      }
    }
  }
}
