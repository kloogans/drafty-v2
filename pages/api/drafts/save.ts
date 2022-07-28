import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import { ApiResponse } from "types/api"
import dbConnect from "lib/dbConnect"
import Drafts from "models/drafts"

const ACCEPTED_METHODS = ["POST"]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const { method, body } = req
  await dbConnect()
  const session = await getSession({ req })
  const uid = session?.user?.uid as string

  if (!ACCEPTED_METHODS.includes(method as string))
    res.status(401).json({ success: false, message: "Method not supported" })

  if (!uid) res.status(401).json({ success: false, message: "Not authorized" })

  const { id, sections } = JSON.parse(body)
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
      res.status(200).json({ success: true, draftUrl: `/drafts/${id}` })
      return
    }

    await Drafts.updateOne({ uid }, { $push: { drafts: { id, sections } } })

    res.status(200).json({ success: true, draftUrl: `/drafts/${id}` })
  } catch (error) {
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
