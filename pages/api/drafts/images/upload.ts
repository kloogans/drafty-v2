import { NextApiRequest, NextApiResponse } from "next"
import dbConnect from "lib/dbConnect"
import { getSession } from "next-auth/react"
import { getImageBuffer } from "lib/uploadImages"
import { s3 } from "lib/s3"

interface UploadedFileProps {
  success: boolean
  url?: string
  message?: string
}

const uploadFile = async (
  file: string,
  draftId: string,
  uid: string,
  fileExtension: string
) => {
  const buffer = getImageBuffer(file)
  const path = `${uid}/drafts/${draftId}/media-${
    Date.now() / 1000
  }.${fileExtension}`
  try {
    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME as string,
      Key: path,
      Body: buffer,
      ContentEncoding: "base64",
      ContentType: `image/${fileExtension === "jpg" ? "jpeg" : fileExtension}`,
      ACL: "public-read",
      CacheControl: "no-cache",
      Expires: new Date()
    }
    const uploadResponse = await s3.upload(params).promise()
    return { success: true, url: uploadResponse.Location }
  } catch (e) {
    return { success: false, message: e.message }
  }
}

interface ApiResponse {
  success: boolean
  message?: string
  url?: string
}

interface UploadedFileProps {
  success: boolean
  url?: string
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

  const { file, draftId, uid, fileExtension } = JSON.parse(body)

  const s3Response = (await uploadFile(
    file,
    draftId,
    uid,
    fileExtension
  )) as UploadedFileProps

  if (s3Response?.success) {
    res.status(200).json({ success: true, url: s3Response.url })
    return
  }

  res.status(500).json({ success: false, message: s3Response.message })
}
