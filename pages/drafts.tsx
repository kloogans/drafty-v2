import React from "react"
import { GetServerSideProps } from "next"
import Layout from "components/layout/Layout"

interface DashboardPage {
  drafts: string[]
}

const DraftsPage: React.FC<DashboardPage> = ({ drafts }) => {
  if (drafts != null && drafts.length < 1) {
    return (
      <Layout enforceAuth={true}>
        <h1 className="text-xl text-white">No drafts found</h1>
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
