import { getImageBuffer } from "lib/uploadImages"
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

  const uploadMediaFile = async (
    file: File,
    draftId: string,
    draftSectionId: number
  ) => {
    if (session?.user) {
      //@ts-ignore
      // const url = await uploadFile(file, draftId, session?.user?.uid as string)
      const url = (await fileToBase64(file)) as string
      addAttachment(draftSectionId, url)
    }
  }

  return { handleSendDraftsAsTweet, focusOnNewTextBox, uploadMediaFile }
}
