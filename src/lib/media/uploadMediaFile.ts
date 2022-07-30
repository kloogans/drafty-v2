import { fileToBase64 } from "./fileToBase64"
import { resizeImage } from "./resizeImage"

export const uploadMediaFile = async (
  file: File,
  draftId: string,
  uid: string
) => {
  try {
    const processedImage = await fileToBase64(file)
    const uploadResponse = await fetch("/api/drafts/images/upload", {
      method: "POST",
      body: JSON.stringify({
        file: processedImage,
        draftId,
        fileExtension: file.name.split(".").pop(),
        uid
      })
    })
    const res = await uploadResponse.json()
    return res.s3ImageUrl
  } catch (e) {
    console.log(e.message)
    return e.message
  }
}
