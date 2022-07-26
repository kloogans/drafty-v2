// TODO: split this up
import { NextApiRequest, NextApiResponse } from "next"
import dbConnect from "lib/dbConnect"
import { getSession } from "next-auth/react"
import Drafts from "models/drafts"
import { DraftSection } from "components/draftEditor/types"

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
  const uid = session?.user?.uid as string
  //@ts-ignore
  const existingUserDrafts = await Drafts.findOne(
    { uid },
    { _id: 0, drafts: 1 }
  ).lean()
  //@ts-ignore
  const isExistingDraft = await Drafts.findOne(
    { uid, "drafts.id": id },
    { _id: 0, drafts: 1 }
  ).lean()

  try {
    if (existingUserDrafts == null) {
      const newDraft = new Drafts({
        uid,
        drafts: [{ id, sections }]
      })

      await newDraft.save()
      // await Drafts.updateOne({ uid }, { $set: { drafts: [{ id, sections }] } })
      res.status(200).json({ success: true, draftUrl: `/drafts/${id}` })
      return
    }

    await Drafts.updateOne({ uid }, { $push: { drafts: { id, sections } } })

    res.status(200).json({ success: true, draftUrl: `/drafts/${id}` })
  } catch (error) {
    console.log(error.message)
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
