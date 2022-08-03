import { SecondaryButton } from "src/components/buttons"
import Drafts from "src/models/drafts"
import { GetServerSideProps } from "next"
import { getSession, signOut } from "next-auth/react"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { useState } from "react"
import { useGlobalState } from "src/state/hooks/useGlobalState"
const UserAvatar = dynamic(() => import("src/components/avatar/Avatar"))
const Layout = dynamic(() => import("src/components/layout/Layout"))
const PrimaryHeading = dynamic(
  () => import("src/components/headings/PrimaryHeading")
)

interface SettingsPage {
  numberOfDrafts: number
  username: string
  image: string
}

const deleteUser = async () => {
  try {
    await fetch(`/api/users/delete`, {
      method: "POST"
    })
    return { success: true }
  } catch (e) {
    console.error(e.message)
    return { success: false }
  }
}

const deleteAllDrafts = async () => {
  try {
    await fetch("/api/drafts/delete/all", {
      method: "POST"
    })
    return { success: true }
  } catch (e) {
    console.error(e.message)
    return { success: false }
  }
}

const SettingsPage: React.FC<SettingsPage> = ({
  numberOfDrafts,
  username,
  image
}) => {
  const { openPopover } = useGlobalState()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDeleteUser = async () => {
    const { success } = await deleteUser()
    if (success) {
      //toast
      signOut()
      router.push("/")
    }
  }

  const handleDeleteDrafts = async () => {
    setLoading(true)
    const { success } = await deleteAllDrafts()
    if (success) {
      //toast
      router.replace(router.asPath)
    }
    setLoading(false)
  }

  const confirmDeleteDrafts = () => {
    openPopover(
      "Are you sure?",
      "Your drafts will be permanently deleted.",
      async () => {
        await handleDeleteDrafts()
      }
    )
  }

  const confirmDeleteAccount = () => {
    openPopover(
      "Are you sure?",
      "all of your account data will be destroyed.",
      async () => {
        await handleDeleteUser()
      }
    )
  }

  return (
    <Layout className="min-h-screen !justify-start pt-32" enforceAuth>
      <PrimaryHeading className="mb-2">
        <strong>Settings</strong>
      </PrimaryHeading>
      <UserAvatar url={image ?? ""} username={username} size="16" />
      <p className="text-sm text-white/80 mb-3">@{username}</p>
      <ul className="w-full max-w-xl mx-auto bg-indigo-800 rounded-2xl px-4 shadow-md mb-5">
        <li className="flex items-center justify-between py-5 border-b-2 border-b-white/50">
          <span className="text-md text-white/80">Number of drafts</span>
          <span className="text-md text-white/80 p-3 bg-indigo-500 rounded-2xl min-w-[4.8rem] text-center shadow-md">
            <strong>{numberOfDrafts}</strong>
          </span>
        </li>

        <li className="flex items-center justify-between py-5 border-b-2 border-b-white/50">
          <span className="text-md text-white/80">
            <strong>Delete</strong> all drafts
          </span>
          <button
            title="Delete all of my drafts"
            disabled={numberOfDrafts < 1 || loading}
            onClick={() => confirmDeleteDrafts()}
            className="text-md text-white/80 bg-rose-500 hover:bg-rose-600 focus:bg-rose-600 hover:text-white/100 focus:text-white/100 px-4 py-3 rounded-2xl disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-zinc-500 shadow-md"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </li>

        <li className="flex items-center justify-between py-5">
          <span className="text-md text-white/80">
            <strong>Delete</strong> my account
          </span>
          <button
            title="Delete my account"
            onClick={() => confirmDeleteAccount()}
            className="text-md text-white/80 bg-rose-500 hover:bg-rose-600 focus:bg-rose-600 hover:text-white/100 focus:text-white/100 px-4 py-3 rounded-2xl shadow-md"
          >
            Delete
          </button>
        </li>
      </ul>

      <SecondaryButton handleClick={() => signOut()} tertiary>
        Sign out
      </SecondaryButton>

      {/* total number of drafts */}
      {/* delete all drafts */}
      {/* delete account */}
    </Layout>
  )
}

export default SettingsPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req })
  try {
    //@ts-ignore
    const drafts = await Drafts.findOne(
      { uid: session?.user?.uid },
      { _id: 0, drafts: 1 }
    ).lean()
    const numberOfDrafts = drafts?.drafts?.length || 0
    return {
      props: {
        numberOfDrafts,
        username: session?.user?.name,
        image: session?.user?.image
      }
    }
  } catch (e) {
    console.log(e.message)
    return {
      props: {
        settings: []
      }
    }
  }
}
