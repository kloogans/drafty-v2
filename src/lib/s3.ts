import AWS from "aws-sdk"

export const s3 = new AWS.S3({
  accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_S3_BUCKET_REGION,
  params: {
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME
  }
})
