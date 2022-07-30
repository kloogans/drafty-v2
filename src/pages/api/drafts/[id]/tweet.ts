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

  // const client = new Twitter({
  //   subdomain: "api",
  //   consumer_key: process.env.TWITTER_API_KEY as string,
  //   consumer_secret: process.env.TWITTER_API_SECRET as string,
  //   access_token_key: accessToken,
  //   access_token_secret: accessSecret
  // })

  const twitter = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY as string,
    appSecret: process.env.TWITTER_API_SECRET as string,
    accessToken,
    accessSecret
  })

  const uploadAttachmentsAndReceiveMediaIds = async (
    attachments: string[]
  ): Promise<string[]> => {
    const mediaIds = []

    for (const attachment of attachments) {
      const imageDataRes = await fetch(attachment)
      const imageArrayBuffer = await imageDataRes.arrayBuffer()
      const imageBuffer = Buffer.from(imageArrayBuffer)

      try {
        mediaIds.push(
          await twitter.v1.uploadMedia(imageBuffer, {
            mimeType: "Buffer"
          })
        )
      } catch (e) {
        console.log("Error in image upload: ", e.data.errors)
      }
    }

    return [...mediaIds]
  }

  try {
    const thread: TweetThreadObject[] = []
    const tweetThread = async (sections: DraftSection[]) => {
      let lastTweetID = ""
      for (const section of sections) {
        console.log(`uploading media for section ${section.id}`)
        const media = await uploadAttachmentsAndReceiveMediaIds(
          section.attachments
        )
        console.log(`media uploaded for section ${section.id}`)

        section.attachments.length > 0
          ? thread.push({
              text: section.text,
              media: { media_ids: media }
            })
          : thread.push({ text: section.text })

        const isLastSection = sections.indexOf(section) === sections.length - 1
        if (isLastSection) {
          try {
            console.log("tweeting thread with attachments...")
            await twitter.v2.tweetThread(thread)
            console.log("tweet sent √")
          } catch (e) {
            console.log("tweet thread error: ")
            console.log(e.data.errors)
          }
        }
      }
    }

    await tweetThread(sections)

    // TODO: mark draft (draftId) as tweeted

    res.status(200).json({ success: true })
  } catch (error) {
    // console.log(error)
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
