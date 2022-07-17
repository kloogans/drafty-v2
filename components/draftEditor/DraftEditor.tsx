// TODO: put state/actions into a context provider with a reducer
// TODO: change focus id when a textbox is removed
// TODO: make textboxes sortable with the first being static
// TODO: image uploads (max size, max number of files for child tweets)
import { useState } from "react"
import dynamic from "next/dynamic"
import { PrimaryButton } from "components/buttons"
import "react-circular-progressbar/dist/styles.css"
import { allTextBoxesHaveValues } from "./utils"
import { DraftEditorProps } from "./types"
const DraftSectionControls = dynamic(() => import("./DraftSectionControls"))
const DraftSectionTextBox = dynamic(() => import("./DraftSectionTextBox"))
const MAX_CHARACTERS = 280

const DraftEditor: React.FC<DraftEditorProps> = ({
  id,
  sections,
  isNew = true
}) => {
  const [category, setCategory] = useState("all")
  const [sectionsState, setSectionsState] = useState([
    {
      id: 0,
      text: "",
      attachments: [],
      focused: true
    }
  ])

  const [highlightedTextBoxes, setHighlightedTextBoxes] = useState<number[]>([])

  const handleSendDraftsAsTweet = () => {
    const textBoxes = allTextBoxesHaveValues(sectionsState)
    if (textBoxes.allHaveValues) {
      setHighlightedTextBoxes([])
      console.log("proceed to media check/upload/id assignment")
    }
    if (textBoxes.emptyTextboxIds) {
      setHighlightedTextBoxes(textBoxes.emptyTextboxIds)
    }
  }

  const removeTextBox = (id: number) => {
    const newValues = sectionsState.filter((textBox) => textBox.id !== id)
    newValues.forEach((textBox, index) => (textBox.id = index))
    setSectionsState(newValues)
  }

  const focusOnNewTextBox = (id: number) => {
    const textBoxes = document.querySelectorAll("textarea")
    const newValues = [...sectionsState]
    newValues.forEach((value) => {
      value.focused = false
    })
    newValues[id].focused = true
    setSectionsState(newValues)
    textBoxes[id].focus()
  }

  const addNewTextBox = () => {
    const getLastValuesId = sectionsState[sectionsState.length - 1].id
    const newId = getLastValuesId + 1
    const newValues = [...sectionsState]
    newValues.forEach((value) => {
      value.focused = false
    })

    newValues.push({ id: newId, text: "", attachments: [], focused: true })
    setSectionsState(newValues)
  }

  const handleDraftSectionChange = (text: string, id: number) => {
    const newHighlightedTextBoxes = highlightedTextBoxes.filter(
      (id) => id !== id
    )
    setHighlightedTextBoxes(newHighlightedTextBoxes)
    const newValues = [...sectionsState]
    newValues[id].text = text
    setSectionsState(newValues)
  }

  const lastTextBoxIsEmpty =
    sectionsState[sectionsState.length - 1].text.length < 1

  const { allHaveValues } = allTextBoxesHaveValues(sectionsState)

  const atleastOneTextBoxHasAValue = sectionsState.some(
    (textBox) => textBox.text.length > 0
  )

  return (
    <div className="w-full pb-20">
      <form className="w-full h-full px-2 md:px-0 max-w-full md:max-w-xl mx-auto flex flex-col items-center justify-center mb-4">
        {sectionsState.map((value, index) => {
          const isFirstTextBox = index === 0
          const isLastTextBox = index === sectionsState.length - 1
          const remainingLength = MAX_CHARACTERS - value.text.length
          const percentageOfRemainingLength = Math.ceil(
            ((MAX_CHARACTERS - value.text.length) / MAX_CHARACTERS) * 100
          )

          let radius = "rounded-2xl"
          if (sectionsState.length > 1 && isFirstTextBox) {
            radius = "rounded-2xl rounded-bl-none"
          }

          if (sectionsState.length > 1 && !isFirstTextBox && !isLastTextBox) {
            radius = "rounded-2xl rounded-l-none"
          }

          if (sectionsState.length > 1 && isLastTextBox) {
            radius = "rounded-2xl rounded-tl-none"
          }

          return (
            <div className="relative w-full" key={value.id}>
              <div
                className={`${
                  isFirstTextBox ? "hidden" : ""
                } h-6 border-r-2 w-0 border-white/30 border-dashed mr-auto`}
              />
              <DraftSectionTextBox
                key={value.id}
                index={index}
                value={value.text}
                focused={value.focused}
                radius={radius}
                highlighted={highlightedTextBoxes.includes(value.id)}
                lastIndex={sectionsState.length - 1}
                handleFocus={() => focusOnNewTextBox(value.id)}
                handleChange={(text: string) => {
                  handleDraftSectionChange(text, value.id)
                }}
              />

              <DraftSectionControls
                show={value.focused}
                id={value.id}
                lastTextBoxIsEmpty={lastTextBoxIsEmpty}
                isFirstTextBox={isFirstTextBox}
                isLastTextBox={isLastTextBox}
                addNewTextBox={addNewTextBox}
                removeTextBox={removeTextBox}
                remainingLength={remainingLength}
                progressPercentage={percentageOfRemainingLength}
              />
            </div>
          )
        })}
      </form>
      <div className="grid grid-cols-2 gap-2 max-w-xs mx-auto">
        <PrimaryButton
          handleClick={handleSendDraftsAsTweet}
          title="Tweet draft"
          disabled={highlightedTextBoxes.length > 0 || !allHaveValues}
        >
          Tweet
        </PrimaryButton>
        <PrimaryButton
          disabled={!atleastOneTextBoxHasAValue}
          handleClick={() => console.log("save whole thing")}
          title="Save draft"
        >
          Save
        </PrimaryButton>
      </div>
    </div>
  )
}

export default DraftEditor
