import { s3 } from "lib/s3"
import { getImageBuffer } from "lib/uploadImages"

export const uploadFileToS3 = async (
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
