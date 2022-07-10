import { GetServerSideProps } from "next"
import dynamic from "next/dynamic"
const Layout = dynamic(() => import("components/layout/Layout"))
const PrimaryHeading = dynamic(
  () => import("components/headings/PrimaryHeading")
)

interface SettingsPage {
  settings: any
}

const SettingsPage: React.FC<SettingsPage> = ({ settings }) => {
  return (
    <Layout enforceAuth={true}>
      <PrimaryHeading>
        <strong>Settings</strong>
      </PrimaryHeading>
      {/* total number of drafts */}
      {/* delete all drafts */}
      {/* delete account */}
    </Layout>
  )
}

export default SettingsPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      settings: []
    }
  }
}
