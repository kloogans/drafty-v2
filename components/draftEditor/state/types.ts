import { DraftSection } from "../types"

export interface DraftEditorContextProps {
  category: string
  sections: DraftSection[]
  highlightedTextBoxes: number[]
  addTextBox: () => void
  removeTextBox: (id: number) => void
  focusOnTextBox: (id: number) => void
  changeText: (id: number, text: string) => void
  changeAttachments: (id: number, attachments: string[]) => void
  addAttachment: (id: number, attachment: string) => void
  removeAttachment: (sectionId: number, attachmentIndex: number) => void
  setCategory: (category: string) => void
  highlightTextBox: (id: number) => void
  unhighlightTextBox: (id: number) => void
  setHighlightedTextBoxes: (highlightedTextBoxes: number[]) => void
  setSections: (sections: DraftSection[]) => void
  dispatch: (action: DraftEditorReducerActionProps) => void
}

export interface DraftEditorReducerActionProps {
  type: string
  id?: number
  text?: string
  attachment?: string
  attachments?: string[]
  category?: string
  highlightedTextBoxes?: number[]
  attachmentIndex?: number
  sectionId?: number
  sections?: DraftSection[]
}
