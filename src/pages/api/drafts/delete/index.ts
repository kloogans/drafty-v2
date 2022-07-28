import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import { ApiResponse } from "src/types/api"
import dbConnect from "src/lib/dbConnect"
import Drafts from "src/models/drafts"
import { enforceHttpMethodsAndAuthentication } from "src/lib/api"

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

  const { id } = JSON.parse(body)

  try {
    await Drafts.updateOne({ uid }, { $pull: { drafts: { id } } })
    res.status(200).json({ success: true })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ success: false, message: "Error saving draft" })
  }
}
