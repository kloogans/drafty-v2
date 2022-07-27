// TODO: split this up
import { NextApiRequest, NextApiResponse } from "next"
import dbConnect from "lib/dbConnect"
import { getSession } from "next-auth/react"
import Drafts from "models/drafts"

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
  const uid = session?.user?.uid as string

  if (!ACCEPTED_METHODS.includes(method as string))
    res.status(401).json({ success: false, message: "Method not supported" })

  if (!uid) res.status(401).json({ success: false, message: "Not authorized" })

  const { id } = JSON.parse(body)

  try {
    await Drafts.updateOne({ uid }, { $pull: { drafts: { id } } })
    res.status(200).json({ success: true })
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
