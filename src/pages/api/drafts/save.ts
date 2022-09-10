import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import { ApiResponse } from "src/types/api"
import dbConnect from "src/lib/dbConnect"
import Drafts from "src/models/drafts"

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

  try {
    //@ts-ignore
    const isExistingDraft = await Drafts.findOne(
      { uid, "drafts.id": id },
      { _id: 0, drafts: 1 }
    ).lean()

    if (isExistingDraft) {
      await Drafts.updateOne(
        { uid, "drafts.id": id },
        { $set: { "drafts.$.sections": sections } }
      )
      res.status(200).json({ success: true })
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
