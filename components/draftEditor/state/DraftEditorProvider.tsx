import { useReducer } from "react"
import { draftEditorReducer } from "./draftEditorReducer"
import {
  DraftEditorContext,
  initialDraftEditorState
} from "./DraftEditorContext"

export const DraftEditorProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [state, dispatch] = useReducer(
    draftEditorReducer,
    initialDraftEditorState
  )

  const actions = {
    addTextBox: () => dispatch({ type: "ADD_TEXT_BOX" }),
    removeTextBox: (id: number) => dispatch({ type: "REMOVE_TEXT_BOX", id }),
    focusOnTextBox: (id: number) => dispatch({ type: "FOCUS_ON_TEXT_BOX", id }),
    changeText: (id: number, text: string) =>
      dispatch({ type: "CHANGE_TEXT", id, text }),
    changeAttachments: (id: number, attachments: string[]) =>
      dispatch({ type: "CHANGE_ATTACHMENTS", id, attachments })
  }

  return (
    <DraftEditorContext.Provider value={{ ...state, ...actions, dispatch }}>
      {children}
    </DraftEditorContext.Provider>
  )
}
