import dynamic from "next/dynamic"
import { GetServerSideProps } from "next"
import { useGlobalState } from "state/hooks/useGlobalState"

const Layout = dynamic(() => import("components/layout/Layout"))
const PrimaryHeading = dynamic(
  () => import("components/headings/PrimaryHeading")
)
interface DashboardPage {
  drafts: string[]
}

const DraftsPage: React.FC<DashboardPage> = ({ drafts }) => {
  const { togglePopover } = useGlobalState()

  if (drafts != null && drafts.length < 1) {
    return (
      <Layout enforceAuth>
        <PrimaryHeading>No drafts yet!</PrimaryHeading>
      </Layout>
    )
  }
  return (
    <Layout enforceAuth>
      <PrimaryHeading>Drafts</PrimaryHeading>
    </Layout>
  )
}

export default DraftsPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      drafts: []
    }
  }
}
