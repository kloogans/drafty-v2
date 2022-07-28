import { AllTextBoxesHaveValues, DraftSection } from "../types"

export const allTextBoxesHaveValues = (
  textBoxes: DraftSection[]
): AllTextBoxesHaveValues => {
  const allHaveValues = textBoxes.every(
    (textBox) => textBox.text.length > 0 || textBox.attachments.length > 0
  )
  if (allHaveValues) {
    return { allHaveValues: true }
  }
  const emptyTextboxIds = textBoxes.reduce((acc: number[], textBox) => {
    if (textBox.text.length === 0) {
      acc.push(textBox.id)
    }
    return acc
  }, [])
  return { allHaveValues: false, emptyTextboxIds }
}
