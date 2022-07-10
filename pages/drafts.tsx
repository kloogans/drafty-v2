import dynamic from "next/dynamic"
import { GetServerSideProps } from "next"
const Layout = dynamic(() => import("components/layout/Layout"))
const PrimaryHeading = dynamic(
  () => import("components/headings/PrimaryHeading")
)
interface DashboardPage {
  drafts: string[]
}

const DraftsPage: React.FC<DashboardPage> = ({ drafts }) => {
  if (drafts != null && drafts.length < 1) {
    return (
      <Layout enforceAuth={true}>
        <PrimaryHeading>No drafts yet!</PrimaryHeading>
      </Layout>
    )
  }
  return <div>Drafts</div>
}

export default DraftsPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      drafts: []
    }
  }
}
