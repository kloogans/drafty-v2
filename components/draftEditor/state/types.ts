import { DraftSection } from "../types"

export interface DraftEditorContextProps {
  category: string
  sections: DraftSection[]
  highlightedTextBoxes: number[]
}

export interface DraftEditorReducerActionProps {
  type: string
  id?: number
  text?: string
  attachments?: string[]
}
