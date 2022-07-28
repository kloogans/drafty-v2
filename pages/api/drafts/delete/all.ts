import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import { ApiResponse } from "types/api"
import dbConnect from "lib/dbConnect"
import Drafts from "models/drafts"
import { enforceHttpMethodsAndAuthentication } from "lib/api"

const ACCEPTED_METHODS = ["POST"]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const { method } = req
  await dbConnect()
  const session = await getSession({ req })
  const uid = session?.user?.uid as string

  enforceHttpMethodsAndAuthentication(
    req,
    res,
    method as string,
    ACCEPTED_METHODS
  )

  try {
    await Drafts.deleteOne({ uid })
    res.status(200).json({ success: true })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
