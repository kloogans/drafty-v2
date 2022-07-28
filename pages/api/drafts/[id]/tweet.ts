import { NextApiRequest, NextApiResponse } from "next"
import dbConnect from "lib/dbConnect"
import { getSession } from "next-auth/react"
import { TwitterApi } from "twitter-api-v2"
import Drafts from "models/drafts"
import { DraftSection } from "components/draftEditor/types"
import { ApiResponse } from "types/api"
import { enforceHttpMethodsAndAuthentication } from "lib/api"
// const client = new TwitterApi({
//     appKey: process.env.TWITTER_CONSUMER_KEY as string,
//     appSecret: process.env.TWITTER_CONSUMER_SECRET,
//     accessToken: process.env.TWITTER_ACCESS_TOKEN,
//     accessSecret: process.env.TWITTER_ACCESS_SECRET
//   })

const ACCEPTED_METHODS = ["POST"]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const { method, body } = req
  await dbConnect()
  const session = await getSession({ req })
  const uid = session?.user?.uid as string

  enforceHttpMethodsAndAuthentication(
    req,
    res,
    method as string,
    ACCEPTED_METHODS
  )

  const { id, sections } = JSON.parse(body)

  try {
    res.status(200).json({ success: true })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ success: false, message: error.message })
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "15mb"
    }
  }
}
