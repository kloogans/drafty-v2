import { useState, useEffect, useRef } from "react"
import { DraftEditorProps } from "./types"
import { SecondaryButton } from "components/buttons"
const MAX_CHARACTERS = 10

interface ContentEditor {
  index: number
  value: string
  lastIndex: number
  handleChange: (text: string) => void
  handleFocus: () => void
}

const ContentEditor: React.FC<ContentEditor> = ({
  index,
  value,
  lastIndex,
  handleChange,
  handleFocus
}) => {
  const remainingLength = MAX_CHARACTERS - value.length

  useEffect(() => {
    handleFocus()
  }, [])

  return (
    <>
      {/*
      TODO: style into a progress ring 
      <p
        className={`text-md text-white ${remainingLength < 0 ? "hidden" : ""}`}
      >
        <strong>{remainingLength} characters left</strong>
      </p> 
      */}
      <textarea
        className={`w-full min-h-[10rem] focus:min-h-[20rem] text-2xl text-white/30 focus:text-white bg-indigo-600 border-2 border-white/30 focus:border-white p-2 outline-none rounded-lg flex resize-none transition duration-200 ease-in-out`}
        style={{ transitionProperty: "all" }}
        value={value}
        onChange={(e) => {
          if (e.target.value.length <= MAX_CHARACTERS) {
            if (e.target.value.length === MAX_CHARACTERS) {
              if (index !== lastIndex) {
                return
              }
            }
            handleChange(e.target.value)
          }
        }}
      />
    </>
  )
}

const DraftEditor: React.FC<DraftEditorProps> = ({ draft }) => {
  const [values, setValues] = useState([
    {
      id: 0,
      text: ""
    }
  ])

  const formRef = useRef<HTMLFormElement>(null)

  const focusOnNewTextBox = (id: number) => {
    const form = formRef?.current
    form && form.querySelectorAll("textarea")[id]?.focus()
  }

  const addNewTextBox = () => {
    const getLastValuesId = values[values.length - 1].id
    const newId = getLastValuesId + 1
    const newValues = [...values]

    newValues.push({ id: newId, text: "" })
    setValues(newValues)
    focusOnNewTextBox(newId)
  }

  const lastTextBoxIsEmpty = values[values.length - 1].text.length < 1

  // TODO: add remove text box option

  return (
    <>
      {/*
      TODO: style as an lowkey counter off to the side 
      <p className="text-md text-white">
        Total sections: <strong>{values.length}</strong>
      </p> 
      */}
      <form
        ref={formRef}
        className="w-full h-full px-2 md:px-0 max-w-full md:max-w-xl mx-auto flex flex-col items-center justify-center gap-4"
      >
        {values.map((value, index) => {
          return (
            <ContentEditor
              key={value.id}
              index={index}
              value={value.text}
              lastIndex={values.length - 1}
              handleFocus={() => focusOnNewTextBox(value.id)}
              handleChange={(text: string) => {
                const newValues = [...values]
                newValues[index].text = text
                setValues(newValues)
              }}
            />
          )
        })}
      </form>
      <SecondaryButton
        disabled={lastTextBoxIsEmpty}
        handleClick={() => !lastTextBoxIsEmpty && addNewTextBox()}
        title="Add new text box"
        tertiary={true}
        className="mt-4"
      >
        Add new text box
      </SecondaryButton>
    </>
  )
}

export default DraftEditor
