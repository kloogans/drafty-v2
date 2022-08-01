import dynamic from "next/dynamic"
import { GetServerSideProps } from "next"
import { useGlobalState } from "src/state/hooks/useGlobalState"
import Drafts from "src/models/drafts"
import { getSession } from "next-auth/react"
import { DraftProps } from "src/components/draftEditor/types"
import dbConnect from "src/lib/dbConnect"
import DraftPreview from "src/components/drafts/DraftPreview"
import Link from "next/link"
import Icon from "src/components/icon/Icon"
import Head from "next/head"
import { useRouter } from "next/router"
import { PrimaryButton } from "src/components/buttons"
import { useAutoAnimate } from "@formkit/auto-animate/react"

const Layout = dynamic(() => import("src/components/layout/Layout"))
const PrimaryHeading = dynamic(
  () => import("src/components/headings/PrimaryHeading")
)
interface DashboardPage {
  drafts: DraftProps[]
}

const removeDraft = async (id: string) => {
  try {
    await fetch("/api/drafts/delete", {
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
  const [listRef] = useAutoAnimate<HTMLDivElement>()

  if (drafts != null && drafts.length < 1) {
    return (
      <Layout enforceAuth>
        <Head>
          <title>Your Drafts</title>
        </Head>
        <Icon
          url={`/assets/placeholders/writing.svg`}
          className="w-32 h-32 bg-white"
        />
        <PrimaryHeading className="mb-2">
          No drafts - <strong>yet</strong>!
        </PrimaryHeading>
        <Link href="/new">
          <a className="px-4 py-2 text-sm border-2 border-bg-white text-white hover:bg-amber-400 hover:text-indigo-800 hover:border-amber-400 group rounded-2xl transition duration-200 ease-in-out">
            <span className="flex items-center justify-center h-full gap-1 scale-100 group-hover:scale-95">
              <Icon
                url="/assets/icons/pencil.svg"
                className="w-4 h-4 bg-white group-hover:bg-indigo-800 transition duration-200 ease-in-out"
              />
              Start a <strong>new</strong> draft
            </span>
          </a>
        </Link>
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
      <div ref={listRef} className="w-full max-w-xl px-2">
        {drafts.map((draft, index) => {
          return (
            <div
              className="relative w-full max-w-[85%] md:max-w-lg border-2 border-white rounded-2xl py-6 px-4 mb-2 hover:bg-indigo-700 transition duration-200 ease-in-out"
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
                className="text-white h-full flex items-center absolute right-0 top-0 translate-x-12 group"
              >
                <Icon
                  url={`/assets/icons/delete.svg`}
                  className="w-6 h-6 bg-white opacity-30 group-hover:opacity-100 group-hover:bg-rose-400 group-focus:bg-rose-400 z-10 transition duration-200 ease-in-out"
                />
                <div className="absolute left-1/2 -translate-x-1/2 rounded-full h-12 w-12 bg-white/10 scale-0 group-hover:scale-100 group-focus:scale-100 hover:!scale-130 z-0 transition duration-200 ease-in-out" />
              </button>
            </div>
          )
        })}
      </div>
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
