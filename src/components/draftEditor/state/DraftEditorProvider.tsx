import { useReducer } from "react"
import { draftEditorReducer } from "./draftEditorReducer"
import {
  DraftEditorContext,
  initialDraftEditorState
} from "./DraftEditorContext"
import { DraftSection } from "../types"

export const DraftEditorProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [state, dispatch] = useReducer(
    draftEditorReducer,
    initialDraftEditorState
  )

  const actions = {
    addTextBox: () => dispatch({ type: "ADD_TEXT_BOX" }),
    focusOnTextBox: (id: number) => dispatch({ type: "FOCUS_ON_TEXT_BOX", id }),
    removeTextBox: (id: number) => {
      dispatch({ type: "REMOVE_TEXT_BOX", id })
    },
    changeText: (id: number, text: string) =>
      dispatch({ type: "CHANGE_TEXT", id, text }),
    changeAttachments: (id: number, attachments: string[]) =>
      dispatch({ type: "CHANGE_ATTACHMENTS", id, attachments }),
    addAttachment: (id: number, attachment: string) =>
      dispatch({ type: "ADD_ATTACHMENT", id, attachment }),
    removeAttachment: (sectionId: number, attachmentIndex: number) =>
      dispatch({ type: "REMOVE_ATTACHMENT", sectionId, attachmentIndex }),
    setCategory: (category: string) =>
      dispatch({ type: "SET_CATEGORY", category }),
    highlightTextBox: (id: number) =>
      dispatch({ type: "HIGHLIGHT_TEXT_BOX", id }),
    unhighlightTextBox: (id: number) =>
      dispatch({ type: "UNHIGHLIGHT_TEXT_BOX", id }),
    setHighlightedTextBoxes: (highlightedTextBoxes: number[]) =>
      dispatch({ type: "SET_HIGHLIGHTED_TEXT_BOXES", highlightedTextBoxes }),
    setSections: (sections: DraftSection[]) => {
      console.log("here")
      dispatch({ type: "SET_SECTIONS", sections })
    }
  }

  return (
    <DraftEditorContext.Provider value={{ ...state, ...actions, dispatch }}>
      {children}
    </DraftEditorContext.Provider>
  )
}
