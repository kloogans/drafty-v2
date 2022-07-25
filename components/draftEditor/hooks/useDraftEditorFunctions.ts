import { getImageBuffer } from "lib/uploadImages"
import { s3 } from "lib/s3"
import { allTextBoxesHaveValues } from "../utils"
import { useDraftEditorState } from "./useDraftEditorState"
import { useSession } from "next-auth/react"
import { uploadMediaFile, fileToBase64 } from "lib/media"

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

  const uploadMediaFileLocally = async (file: File, draftSectionId: number) => {
    if (session?.user) {
      //@ts-ignore
      // const url = await uploadMediaFile(file, draftId, session?.user?.uid as string)
      const url = (await fileToBase64(file)) as string
      addAttachment(draftSectionId, url)
    }
  }

  return { handleSendDraftsAsTweet, focusOnNewTextBox, uploadMediaFileLocally }
}
