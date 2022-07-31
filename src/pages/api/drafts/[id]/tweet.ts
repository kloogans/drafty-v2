import { NextApiRequest, NextApiResponse } from "next"
import dbConnect from "src/lib/dbConnect"
import { getSession } from "next-auth/react"
import { TwitterApi } from "twitter-api-v2"
import Drafts from "src/models/drafts"
import { DraftSection } from "src/components/draftEditor/types"
import { ApiResponse } from "src/types/api"
import { enforceHttpMethodsAndAuthentication } from "src/lib/api"
import { getToken } from "next-auth/jwt"
const ACCEPTED_METHODS = ["POST"]

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

  const twitter = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY as string,
    appSecret: process.env.TWITTER_API_SECRET as string,
    accessToken,
    accessSecret
  })

  const uploadAttachmentsAndReceiveMediaIds = async (
    attachments: string[],
    sectionId: number
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
        res.status(500).json({
          success: false,
          message: `Error uploading image in section ${sectionId}: ${e.message}`
        })
      }
    }

    return [...mediaIds]
  }

  try {
    const thread: TweetThreadObject[] = []
    const tweetThread = async (sections: DraftSection[]) => {
      for (const section of sections) {
        const media = await uploadAttachmentsAndReceiveMediaIds(
          section.attachments,
          section.id
        )

        if (section.attachments.length > 0) {
          thread.push({
            text: section.text,
            media: { media_ids: media }
          })
        } else {
          thread.push({ text: section.text })
        }

        const isLastSection = sections.indexOf(section) === sections.length - 1
        if (isLastSection) {
          try {
            await twitter.v2.tweetThread(thread)
          } catch (e) {
            res.status(500).json({
              success: false,
              message: `Error tweeting thread: ${e.message}`
            })
          }
        }
      }
    }

    await tweetThread(sections)

    // TODO: mark draft (draftId) as tweeted

    res.status(200).json({ success: true })
  } catch (error) {
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
