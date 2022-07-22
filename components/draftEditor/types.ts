export interface DraftEditorProps {
  id: string
  sections?: DraftSection[]
  isNew?: boolean
}

export interface DraftSection {
  id: number
  text: string
  attachments: string[]
  focused: boolean
}

export interface DraftSecionTextBoxProps {
  draftId: string
  id: number
  value: string
  focused: boolean
  radius: string
  attachments: string[]
  children: React.ReactNode
}

export interface DraftSectionControlsProps {
  show: boolean
  id: number
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
