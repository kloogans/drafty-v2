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
import Twitter from "twitter-lite"

type MediaProps = {
  media_ids: string[]
}
interface TweetThreadObject {
  text: string
  media?: MediaProps
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const { method, body, query } = req
  await dbConnect()
  const session = await getSession({ req })
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET
  })

  enforceHttpMethodsAndAuthentication(
    req,
    res,
    method as string,
    ACCEPTED_METHODS
  )

  const uid = session?.user?.uid as string
  const draftId = query.id as string
  const accessToken = token?.accessToken as string
  const accessSecret = token?.refreshToken as string

  const { sections } = JSON.parse(body)
  const incomingSections = [...sections]

  const client = new Twitter({
    subdomain: "api",
    consumer_key: process.env.TWITTER_API_KEY as string,
    consumer_secret: process.env.TWITTER_API_SECRET as string,
    access_token_key: accessToken,
    access_token_secret: accessSecret
  })

  try {
    const thread: TweetThreadObject[] = []
    // const tweetThread = async () => {
    //   let lastTweetId: string = ""
    //   incomingSections.map(async (section: DraftSection, index: number) => {
    //     const { attachments, text } = section
    //     // if (attachments.length > 0) {
    //     //   attachments.map(async (attachment: string, idx: number) => {
    //     //     try {
    //     //       const file = await imageToBase64(attachment)
    //     //       const buffer = Buffer.from(file, "base64")
    //     //       const mediaId = await twitter.v1.uploadMedia(buffer)
    //     //       section.attachments[idx] = mediaId
    //     //     } catch (e) {
    //     //       console.log("error uploading twitter media: ", e.message)
    //     //       return
    //     //     }
    //     //   })
    //     // }
    //     // attachments.length > 0
    //     //   ? thread.push({ text, media: { media_ids: attachments } })
    //     //   : thread.push({ text })
    //     // await twitter.v1.tweet(section.text)
    //     try {
    //       const tw = await client.post("statuses/update", {
    //         status: section.text,
    //         in_reply_to_status_id: lastTweetId,
    //         auto_populate_reply_metadata: true
    //       })
    //       lastTweetId = tw.id_str
    //       console.log(await tw)
    //     } catch (e) {
    //       console.log(e.message)
    //     }
    //   })
    // }

    // await tweetThread()

    await client.post("statuses/update", {
      status: sections[0].text
      // in_reply_to_status_id: lastTweetId,
      // auto_populate_reply_metadata: true
    })

    // console.log("thread: ", thread)
    // await twitter.v2.tweetThread(thread)

    // TODO: mark draft (draftId) as tweeted

    res.status(200).json({ success: true })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: `twitter response error: ${error.message}`
    })
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "15mb"
    }
  }
}
