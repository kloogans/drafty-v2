import dynamic from "next/dynamic"
import { GetServerSideProps } from "next"
import { useGlobalState } from "state/hooks/useGlobalState"
import Drafts from "models/drafts"
import { getSession } from "next-auth/react"
import { DraftProps } from "components/draftEditor/types"
import dbConnect from "lib/dbConnect"
import DraftPreview from "components/drafts/DraftPreview"
import Link from "next/link"
import Icon from "components/icon/Icon"
import Head from "next/head"
import { useRouter } from "next/router"

const Layout = dynamic(() => import("components/layout/Layout"))
const PrimaryHeading = dynamic(
  () => import("components/headings/PrimaryHeading")
)
interface DashboardPage {
  drafts: DraftProps[]
}

const removeDraft = async (id: string) => {
  try {
    await fetch("/api/drafts/remove", {
      method: "POST",
      body: JSON.stringify({ id })
    })
    return { success: true }
  } catch (e) {
    console.error(e.message)
    return { success: false }
  }
}

const DraftsPage: React.FC<DashboardPage> = ({ drafts }) => {
  const { openPopover } = useGlobalState()
  const router = useRouter()

  if (drafts != null && drafts.length < 1) {
    return (
      <Layout enforceAuth>
        <PrimaryHeading>No drafts yet!</PrimaryHeading>
      </Layout>
    )
  }

  const handleRemoveDraft = async (id: string) => {
    const { success } = await removeDraft(id)
    if (success) {
      await removeDraft(id)
      router.replace(router.asPath)
    }
  }

  const confirmDraftRemoval = (id: string) => {
    openPopover("Are you sure?", "This action cannot be undone.", async () => {
      await handleRemoveDraft(id)
    })
  }

  return (
    <Layout className="min-h-screen !justify-start pt-32" enforceAuth>
      <Head>
        <title>Your Drafts</title>
      </Head>
      <PrimaryHeading className="mb-5">
        Your <strong>drafts</strong>
      </PrimaryHeading>
      {drafts.map((draft, index) => {
        return (
          <div
            className="relative group w-full max-w-lg border-2 border-white rounded-2xl py-6 px-4 mb-2 hover:bg-indigo-700 transition duration-200 ease-in-out"
            key={draft.id}
          >
            <Link href={`/drafts/${draft.id}`}>
              <a
                className={`w-full transition duration-200 ease-in-out`}
                title="Go to draft"
              >
                <DraftPreview id={draft.id} sections={draft.sections} />
              </a>
            </Link>
            <button
              onClick={() => confirmDraftRemoval(draft.id)}
              title="Delete this draft"
              className="text-white h-full flex items-center absolute right-0 top-0 translate-x-12"
            >
              <Icon
                url={`/assets/icons/delete.svg`}
                className="w-6 h-6 bg-white opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 hover:bg-rose-400 hover:!scale-90 focus:bg-rose-400 z-10 transition duration-200 ease-in-out"
              />
              <div className="absolute left-1/2 -translate-x-1/2 rounded-full h-12 w-12 bg-white/10 scale-0 group-hover:scale-100 hover:!scale-130 z-0 transition duration-200 ease-in-out" />
            </button>
          </div>
        )
      })}
    </Layout>
  )
}

export default DraftsPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req })
  await dbConnect()

  try {
    //@ts-ignore
    const drafts = await Drafts.findOne(
      { uid: session?.user?.uid },
      { _id: 0, uid: 0 }
    ).lean()
    return {
      props: {
        drafts: drafts?.drafts ?? []
      }
    }
  } catch (e) {
    console.log(e.message)
    return {
      props: {
        drafts: null
      }
    }
  }
}
