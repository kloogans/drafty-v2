import { NextApiRequest, NextApiResponse } from "next"
import dbConnect from "lib/dbConnect"
import { getSession } from "next-auth/react"
import { getImageBuffer } from "lib/uploadImages"
import { s3 } from "lib/s3"
import { ConnectContactLens } from "aws-sdk"

interface UploadedFileProps {
  success: boolean
  url?: string
  message?: string
}

const deleteFile = async (path: string) => {
  try {
    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME as string,
      Key: path
    }
    await s3.deleteObject(params).promise()

    return { success: true }
  } catch (e) {
    return { success: false, message: e.message }
  }
}

interface S3Props {
  Key: string
}

const deleteFiles = async (paths: S3Props[]) => {
  try {
    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME as string,
      Delete: {
        Objects: [...paths]
      }
    }
    await s3.deleteObjects(params).promise()

    return { success: true }
  } catch (e) {
    return { success: false, message: e.message }
  }
}

interface ApiResponse {
  success: boolean
  message?: string
}

const ACCEPTED_METHODS = ["POST"]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const { method, body } = req
  await dbConnect()

  if (!ACCEPTED_METHODS.includes(method as string))
    res.status(401).json({ success: false, message: "Method not supported" })

  const { uid, filePaths, draftId } = JSON.parse(body)

  const pathsWithKeys = filePaths.map((path: string) => ({
    Key: `/${uid}/drafts/${draftId}/${path}`
  }))

  const s3Response = await deleteFiles(pathsWithKeys)

  if (s3Response?.success) {
    res.status(200).json({ success: true })
    return
  }

  res.status(500).json({ success: false, message: s3Response.message })
}
