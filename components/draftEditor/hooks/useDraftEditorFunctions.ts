import { getImageBuffer } from "./../../../lib/uploadImages"
import { s3 } from "lib/s3"
import { allTextBoxesHaveValues } from "../utils"
import { useDraftEditorState } from "./useDraftEditorState"
import { useSession } from "next-auth/react"

const fileToBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error.type)
  })

const uploadFile = async (file: File, draftId: string, uid: string) => {
  const base64File = (await fileToBase64(file)) as string
  const fileExtension = file.name.split(".")[1]
  const buffer = getImageBuffer(base64File)
  const path = `${uid}/drafts/${draftId}/media-${
    Date.now() / 1000
  }.${fileExtension}`
  try {
    const params = {
      Bucket: process.env.S3_BUCKET_NAME as string,
      Key: path,
      Body: buffer,
      ContentEncoding: "base64",
      ContentType: `image/${fileExtension === "jpg" ? "jpeg" : fileExtension}`,
      ACL: "public-read",
      CacheControl: "no-cache",
      Expires: new Date()
    }
    await s3
      .upload(params, (err: any, data: any) => {
        if (err) {
          return err
        }
        return data.Location
      })
      .promise()
  } catch (e) {
    return e.message
  }
}

export const useDraftEditorFunctions = () => {
  const { data: session } = useSession()
  const { sections, setHighlightedTextBoxes, focusOnTextBox, addAttachment } =
    useDraftEditorState()

  const handleSendDraftsAsTweet = () => {
    const textBoxes = allTextBoxesHaveValues(sections)
    if (textBoxes.allHaveValues) {
      setHighlightedTextBoxes([])
      console.log("proceed to media check/upload/id assignment")
    }
    if (textBoxes.emptyTextboxIds) {
      setHighlightedTextBoxes(textBoxes.emptyTextboxIds)
    }
  }

  const focusOnNewTextBox = (id: number) => {
    focusOnTextBox(id)
    const textBoxes = document.querySelectorAll("textarea")
    textBoxes[id].focus()
  }

  const uploadMediaFile = async (file: File, draftSectionId: number) => {
    //@ts-ignore
    const url = await uploadFile(file, "53453ewfewf", session?.user.uid)
    addAttachment(draftSectionId, url)
  }

  return { handleSendDraftsAsTweet, focusOnNewTextBox, uploadMediaFile }
}
