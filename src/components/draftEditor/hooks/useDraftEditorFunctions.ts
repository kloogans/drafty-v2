import { useState } from "react"
import { allTextBoxesHaveValues } from "../utils"
import { useDraftEditorState } from "./useDraftEditorState"
import { useSession } from "next-auth/react"
import { uploadMediaFile } from "src/lib/media"

export const useDraftEditorFunctions = () => {
  const [loading, setLoading] = useState(false)
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

  const uploadMedia = async (
    file: File,
    draftId: string,
    draftSectionId: number
  ) => {
    setLoading(true)
    if (session?.user) {
      try {
        //@ts-ignore
        const url = await uploadMediaFile(
          file,
          draftId,
          session?.user?.uid as string
        )
        addAttachment(draftSectionId, url)
      } catch (e) {
        console.log(e.message)
      } finally {
        setLoading(false)
      }
    }
  }

  const saveDraft = async (id?: string) => {
    setLoading(true)
    const url = `/api/drafts/save`
    const data = {
      id: id || null,
      sections
    }
    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ ...data })
      })
      const json = await res.json()
      return json
    } catch (e) {
      console.log(e.message)
    } finally {
      setLoading(false)
    }
  }

  return {
    handleSendDraftsAsTweet,
    focusOnNewTextBox,
    uploadMedia,
    saveDraft,
    loading
  }
}