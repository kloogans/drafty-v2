import dynamic from "next/dynamic"
import { GetServerSideProps } from "next"
import { useGlobalState } from "state/hooks/useGlobalState"

const Layout = dynamic(() => import("components/layout/Layout"))
const PrimaryHeading = dynamic(
  () => import("components/headings/PrimaryHeading")
)
interface DraftPage {
  draft: any
}

const DraftByIdPage: React.FC<DraftPage> = ({ draft }) => {
  const { togglePopover } = useGlobalState()

  if (draft == null) {
    return (
      <Layout enforceAuth={true}>
        <PrimaryHeading>Nothing's here!</PrimaryHeading>
      </Layout>
    )
  }
  return (
    <Layout enforceAuth={true}>
      <PrimaryHeading>Draft</PrimaryHeading>
      {/* draft editor */}
    </Layout>
  )
}

export default DraftByIdPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      draft: {}
    }
  }
}
