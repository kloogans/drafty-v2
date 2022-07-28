import { getSession } from "next-auth/react"
import { NextApiResponse, NextApiRequest } from "next"

export const enforceHttpMethodsAndAuthentication = async (
  req: NextApiRequest,
  res: NextApiResponse,
  receivedMethod: string,
  acceptedMethods: string[]
) => {
  const session = await getSession({ req })
  const uid = session?.user?.uid as string
  if (!acceptedMethods.includes(receivedMethod as string)) {
    res.status(401).json({ success: false, message: "Method not supported" })
    return
  }

  if (!uid) {
    res.status(401).json({ success: false, message: "Not authorized" })
    return
  }
}
