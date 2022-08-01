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
  highlightedTextBoxes: [],
  addTextBox: () => {},
  removeTextBox: () => {},
  focusOnTextBox: () => {},
  changeText: () => {},
  changeAttachments: () => {},
  addAttachment: () => {},
  editAttachments: () => {},
  removeAttachment: () => {},
  setCategory: () => {},
  highlightTextBox: () => {},
  unhighlightTextBox: () => {},
  setHighlightedTextBoxes: () => {},
  setSections: () => {},
  dispatch: () => {}
}

export const DraftEditorContext = createContext<DraftEditorContextProps>(
  initialDraftEditorState
)
