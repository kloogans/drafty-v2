import { NextApiRequest, NextApiResponse } from "next"
import dbConnect from "src/lib/dbConnect"
import { getSession } from "next-auth/react"
import { TwitterApi } from "twitter-api-v2"
import Drafts from "src/models/drafts"
import { DraftSection } from "src/components/draftEditor/types"
import { ApiResponse } from "src/types/api"
import { enforceHttpMethodsAndAuthentication } from "src/lib/api"
import { getToken } from "next-auth/jwt"
import imageToBase64 from "image-to-base64/browser"
const ACCEPTED_METHODS = ["POST"]

type MediaProps = {
  media_ids: string[]
}
interface TweetThreadObject {
  text: string
  media: MediaProps
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const { method, body } = req
  await dbConnect()
  const session = await getSession({ req })
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET
  })
  const uid = session?.user?.uid as string
  const accessToken = token?.accessToken as string
  const refreshToken = token?.refreshToken as string

  enforceHttpMethodsAndAuthentication(
    req,
    res,
    method as string,
    ACCEPTED_METHODS
  )

  const { id, sections } = JSON.parse(body)
  const incomingSections = [...sections]

  const twitter = new TwitterApi({
    //@ts-ignore
    appKey: process.env.TWITTER_API_KEY as string,
    appSecret: process.env.TWITTER_API_SECRET,
    accessToken: accessToken,
    accessSecret: refreshToken
  })

  try {
    const thread: TweetThreadObject[] = []
    incomingSections.map((section: DraftSection) => {
      const { attachments, text } = section
      if (attachments.length > 0) {
        attachments.map(async (attachment: string, idx: number) => {
          const file = await imageToBase64(attachment)
          const buffer = Buffer.from(file, "base64")
          const mediaId = await twitter.v1.uploadMedia(buffer)
          section.attachments[idx] = mediaId
        })
      }
      thread.push({ text, media: { media_ids: attachments } })
    })
    await twitter.v2.tweetThread(thread)
    // TODO: mark draft as tweeted
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
