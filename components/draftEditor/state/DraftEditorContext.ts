import { createContext } from "react"
import { DraftEditorContextProps } from "./types"

export const initialDraftEditorState: DraftEditorContextProps = {
  category: "",
  sections: [
    {
      id: 0,
      text: "",
      attachments: [],
      focused: true
    }
  ],
  highlightedTextBoxes: []
}

export const DraftEditorContext = createContext<DraftEditorContextProps>(
  initialDraftEditorState
)
