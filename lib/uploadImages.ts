import { Buffer } from "buffer"
import { s3 } from "./s3"

export const getImageBuffer = (base64: string) => {
  const base64Str = base64.slice(22, base64.length)
  return Buffer.from(base64Str, "base64")
}

const uploadImage = async (path: string, buffer: Buffer, fileType: string) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME as string,
    Key: path,
    Body: buffer,
    ContentEncoding: "base64",
    ContentType: `image/${fileType}`,
    ACL: "public-read",
    CacheControl: "no-cache",
    Expires: new Date()
  }

  try {
    s3.upload(params, (err: any, data: any) => {
      if (err) {
        return err
      }
      return data.Location
    })
  } catch (e) {
    return e.message
  }

  // return new Promise((resolve, reject) => {
  //   s3.upload(params, (err, data) => {
  //     if (err) {
  //       reject(err)
  //     } else {
  //       resolve(data.Location)
  //     }
  //   })
  // })
}

export const handleUploadImage = async (
  base64: string,
  fileType: string,
  path: string
) => {
  const newBuffer = getImageBuffer(base64)
  return await uploadImage(path, newBuffer, fileType)
}

// export const handleUploadImages = async (
//   images: string[],
//   uid: string,
//   draftId: string
// ) => {
//   let urls: string[] | any = new Array()
//   images.map(async (image, index) => {
//     const newBuffer = getImageBuffer(image)
//     await uploadImage(
//       `${uid}/drafts/${draftId}/media-${index}.jpg`,
//       newBuffer
//     )
//       .then((res: any) => {
//         urls.push(res)
//       })
//       .catch((e) => {
//         console.log(e)
//       })
//   })
//   return urls
// }
