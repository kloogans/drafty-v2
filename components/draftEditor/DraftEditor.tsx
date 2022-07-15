import React, { useState, useEffect, useRef } from "react"
import { DraftEditorProps } from "./types"
import { PrimaryButton, SecondaryButton } from "components/buttons"
import { CircularProgressbar } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
const MAX_CHARACTERS = 280

interface ContentEditor {
  index: number
  value: string
  lastIndex: number
  focused: boolean
  handleChange: (text: string) => void
  handleFocus: () => void
}

const ContentEditor: React.FC<ContentEditor> = ({
  index,
  value,
  lastIndex,
  focused,
  handleChange,
  handleFocus
}) => {
  useEffect(() => {
    handleFocus()
  }, [])

  const focusedStyle = `min-h-[20rem] !text-white !border-white !border-solid`

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
        className={`w-full text-2xl bg-indigo-800 border-2 border-white/30 border-dashed p-2 outline-none rounded-lg flex resize-none transition duration-200 ease-in-out ${
          focused ? focusedStyle : "min-h-[10rem] text-gray-500"
        }`}
        style={{ transitionProperty: "all" }}
        value={value}
        onFocus={() => handleFocus()}
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

const Controls: React.FC<{ show: boolean; children: React.ReactNode }> = ({
  show,
  children
}) => {
  return (
    <div
      className={`${
        show ? "" : "hidden"
      } absolute bottom-0 right-0 p-4 flex items-center justify-center gap-2`}
    >
      {children}
    </div>
  )
}

const DraftEditor: React.FC<DraftEditorProps> = ({ draft }) => {
  const [values, setValues] = useState([
    {
      id: 0,
      text: "",
      attachments: [],
      focused: true
    }
  ])

  const formRef = useRef<HTMLFormElement>(null)

  const focusOnNewTextBox = (id: number) => {
    const newValues = [...values]
    newValues.forEach((value) => {
      value.focused = false
    })
    newValues[id].focused = true
    setValues(newValues)
  }

  const addNewTextBox = () => {
    const getLastValuesId = values[values.length - 1].id
    const newId = getLastValuesId + 1
    const newValues = [...values]
    newValues.forEach((value) => {
      value.focused = false
    })

    newValues.push({ id: newId, text: "", attachments: [], focused: true })
    setValues(newValues)
  }

  const lastTextBoxIsEmpty = values[values.length - 1].text.length < 1

  // TODO: create a control panel that will show in the focused text box with
  // remaing characters progress ring and text, add new text box button, and delete text box button

  return (
    <>
      {/*
      TODO: style this as an lowkey counter off to the side 
      <p className="text-md text-white">
        Total sections: <strong>{values.length}</strong>
      </p> 
      */}
      <form
        ref={formRef}
        className="w-full h-full px-2 md:px-0 max-w-full md:max-w-xl mx-auto flex flex-col items-center justify-center gap-4"
      >
        {values.map((value, index) => {
          const isLastTextBox = index === values.length - 1
          const remainingLength = MAX_CHARACTERS - value.text.length
          const percentageOfRemainingLength = Math.ceil(
            ((MAX_CHARACTERS - value.text.length) / MAX_CHARACTERS) * 100
          )

          return (
            <div className="relative w-full" key={value.id}>
              <ContentEditor
                key={value.id}
                index={index}
                value={value.text}
                focused={value.focused}
                lastIndex={values.length - 1}
                handleFocus={() => focusOnNewTextBox(value.id)}
                handleChange={(text: string) => {
                  const newValues = [...values]
                  newValues[index].text = text
                  setValues(newValues)
                }}
              />
              <Controls show={value.focused}>
                <SecondaryButton
                  disabled={lastTextBoxIsEmpty}
                  handleClick={(e) => {
                    e.preventDefault()
                    !lastTextBoxIsEmpty && addNewTextBox()
                  }}
                  title="Add new text box"
                  tertiary={true}
                  className={`${!isLastTextBox ? "hidden" : ""} mr-2`}
                >
                  Add
                </SecondaryButton>

                {/* <SecondaryButton
                  disabled={lastTextBoxIsEmpty}
                  handleClick={(e) => {
                    e.preventDefault()
                    !lastTextBoxIsEmpty && addNewTextBox()
                  }}
                  title="Add new text box"
                  tertiary={true}
                  className={`${!isLastTextBox ? "hidden" : ""} mr-2`}
                >
                  Remove
                </SecondaryButton> */}
                <CircularProgressbar
                  className="w-6 h-6"
                  strokeWidth={10}
                  value={percentageOfRemainingLength}
                  styles={{
                    path: {
                      stroke:
                        percentageOfRemainingLength < 20 ? "red" : "#818cf8"
                    },
                    text: {
                      fill: percentageOfRemainingLength < 20 ? "red" : "#818cf8"
                    }
                  }}
                />

                <p
                  className={`text-sm ${
                    remainingLength < 20 ? "text-red-400" : "text-indigo-200"
                  }`}
                >
                  {remainingLength}
                </p>
              </Controls>
            </div>
          )
        })}
        <PrimaryButton
          handleClick={() => console.log("save whole thing")}
          title="Save draft"
        >
          Save
        </PrimaryButton>
      </form>
    </>
  )
}

export default DraftEditor
