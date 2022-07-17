export interface DraftEditorProps {
  id?: number
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
  index: number
  value: string
  lastIndex: number
  focused: boolean
  highlighted: boolean
  handleChange: (text: string) => void
  handleFocus: () => void
  radius: string
}

export interface DraftSectionControlsProps {
  show: boolean
  id: number
  lastTextBoxIsEmpty: boolean
  isFirstTextBox: boolean
  isLastTextBox: boolean
  addNewTextBox: () => void
  removeTextBox: (id: number) => void
  remainingLength: number
  progressPercentage: number
}

export interface AllTextBoxesHaveValues {
  allHaveValues: boolean
  emptyTextboxIds?: number[]
}
