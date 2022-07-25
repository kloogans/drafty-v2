import { fileToBase64 } from "./fileToBase64"

export const uploadMediaFile = async (
  file: File,
  draftId: string,
  uid: string
) => {
  const base64File = (await fileToBase64(file)) as string
  try {
    const uploadResponse = await fetch("/api/drafts/images/upload", {
      method: "POST",
      body: JSON.stringify({
        file: base64File,
        draftId,
        fileExtension: file.name.split(".").pop(),
        uid
      })
    })
    const res = await uploadResponse.json()
    return res.url
  } catch (e) {
    return e.message
  }
}
