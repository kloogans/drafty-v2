export interface DraftEditorProps {
  id?: string
  sections?: DraftSection[]
  data?: DraftSection[]
  isNew?: boolean
}

export interface DraftSection {
  id: number
  text: string
  attachments: string[]
  focused: boolean
}

export interface DraftProps {
  id: string
  sections: DraftSection[]
}

export interface DraftSecionTextBoxProps {
  id: number
  draftId: string
  value: string
  focused: boolean
  radius: string
  attachments: string[]
  children: React.ReactNode
}

export interface DraftSectionControlsProps {
  show: boolean
  id: number
  draftId: string
  numberOfAssets: number
  lastTextBoxIsEmpty: boolean
  isFirstTextBox: boolean
  isLastTextBox: boolean
  remainingLength: number
  progressPercentage: number
}

export interface AllTextBoxesHaveValues {
  allHaveValues: boolean
  emptyTextboxIds?: number[]
}
