import shortUUID from "short-uuid"
import { NextApiRequest, NextApiResponse } from "next"
import dbConnect from "lib/dbConnect"
import { getSession } from "next-auth/react"
import Drafts from "models/drafts"
import { DraftSection } from "components/draftEditor/types"
import { uploadFileToS3 } from "lib/media"
interface ApiResponse {
  success: boolean
  message?: string
  draftUrl?: string
}

const ACCEPTED_METHODS = ["POST"]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const { method, body } = req
  await dbConnect()
  const session = await getSession({ req })

  if (!ACCEPTED_METHODS.includes(method as string))
    res.status(401).json({ success: false, message: "Method not supported" })

  const { id, sections } = JSON.parse(body)

  const isNewDraft = !id
  const incomingSecions = [...sections] as DraftSection[]
  //@ts-ignore
  const uid = session?.user?.uid as string

  if (isNewDraft) {
    const newDraftId = shortUUID.generate()

    incomingSecions.map(async (section: DraftSection, index: number) => {
      if (section.attachments) {
        section.attachments.map(
          async (attachment: string, attachmentIndex: number) => {
            const uploadResponse = await uploadFileToS3(
              attachment,
              newDraftId,
              uid,
              "jpg"
            )
            if (uploadResponse.success) {
              incomingSecions[index].attachments[attachmentIndex] =
                uploadResponse.url as string
            }
            return
          }
        )
      }
    })

    const newDraft = new Drafts({
      //@ts-ignore
      uid: session?.user?.uid as string,
      drafts: [{ id: newDraftId, sections: incomingSecions }]
    })

    await newDraft.save()
    res.status(200).json({ success: true, draftUrl: `/drafts/${newDraftId}` })
    return
  }

  incomingSecions.map(async (section: DraftSection, index: number) => {
    if (section.attachments) {
      section.attachments.map(
        async (attachment: string, attachmentIndex: number) => {
          if (!attachment.includes("https://")) {
            const uploadResponse = await uploadFileToS3(
              attachment,
              id,
              uid,
              "jpg"
            )
            if (uploadResponse.success) {
              incomingSecions[index].attachments[attachmentIndex] =
                uploadResponse.url as string
            }
          }
          return
        }
      )
    }
  })

  try {
    await Drafts.updateOne(
      { uid, "drafts.id": id },
      { $set: { "drafts.$.sections": incomingSecions } },
      { new: true }
    ).lean()

    res.status(200).json({ success: true })
  } catch (error) {
    res.status(500).json({ success: false, message: "Error saving draft" })
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "15mb"
    }
  }
}
