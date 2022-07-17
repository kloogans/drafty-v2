import { allTextBoxesHaveValues } from "../utils"
import { useDraftEditorState } from "./useDraftEditorState"

export const useDraftEditorFunctions = () => {
  const { sections, setHighlightedTextBoxes, focusOnTextBox } =
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

  return { handleSendDraftsAsTweet, focusOnNewTextBox }
}
