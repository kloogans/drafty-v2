import React, { useState, useEffect, useRef } from "react"
import { DraftEditorProps } from "./types"
import { PrimaryButton, SecondaryButton } from "components/buttons"
import { CircularProgressbar } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import Icon from "components/icon/Icon"
const MAX_CHARACTERS = 280

interface TextBoxProps {
  id: number
  text: string
  attachments: string[]
  focused: boolean
}

interface AllTextBoxesHaveValuesProps {
  allHaveValues: boolean
  emptyTextboxIds?: number[]
}

const allTextBoxesHaveValues = (
  textBoxes: TextBoxProps[]
): AllTextBoxesHaveValuesProps => {
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

interface ContentEditor {
  index: number
  value: string
  lastIndex: number
  focused: boolean
  highlighted: boolean
  handleChange: (text: string) => void
  handleFocus: () => void
  radius: string
}

const ContentEditor: React.FC<ContentEditor> = ({
  index,
  value,
  lastIndex,
  focused,
  handleChange,
  handleFocus,
  highlighted,
  radius = "rounded-2xl"
}) => {
  useEffect(() => {
    handleFocus()
  }, [])

  const focusedStyle = `min-h-[16.5rem] !bg-indigo-900 focus:!bg-indigo-800 pb-[56px] !text-white !border-white !border-solid`
  const highlightedStyle = `!border-rose-400 !border-solid`

  return (
    <>
      <textarea
        className={`w-full text-2xl border-2 border-white/30 border-dashed p-4 outline-none ${radius} flex resize-none transition duration-200 ease-in-out ${
          focused ? focusedStyle : "min-h-[10rem] text-gray-500 bg-indigo-900"
        } ${highlighted ? highlightedStyle : ""}`}
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

const Controls: React.FC<{
  show: boolean
  children: React.ReactNode
}> = ({ show, children }) => {
  return (
    <div
      className={`${
        show ? "opacity-100" : "opacity-0"
      } p-4 absolute bottom-0 w-full flex items-center justify-end gap-2 transition duration-200 ease-in-out`}
    >
      {children}
    </div>
  )
}

const DraftEditor: React.FC<DraftEditorProps> = ({ draft }) => {
  const [category, setCategory] = useState("all")
  const [values, setValues] = useState([
    {
      id: 0,
      text: "",
      attachments: [],
      focused: true
    }
  ])

  const [highlightedTextBoxes, setHighlightedTextBoxes] = useState<number[]>([])

  const handleSendDraftsAsTweet = () => {
    const textBoxes = allTextBoxesHaveValues(values)
    if (textBoxes.allHaveValues) {
      setHighlightedTextBoxes([])
      console.log("proceed to media check/upload/id assignment")
    }
    if (textBoxes.emptyTextboxIds) {
      setHighlightedTextBoxes(textBoxes.emptyTextboxIds)
    }
  }

  const removeTextBox = (id: number) => {
    const newValues = values.filter((textBox) => textBox.id !== id)
    // reset the ids of the textboxes to match their array indexes
    newValues.forEach((textBox, index) => {
      textBox.id = index
    })

    setValues(newValues)
  }

  const formRef = useRef<HTMLFormElement>(null)

  const focusOnNewTextBox = (id: number) => {
    const textBoxes = document.querySelectorAll("textarea")
    const newValues = [...values]
    newValues.forEach((value) => {
      value.focused = false
    })
    newValues[id].focused = true
    setValues(newValues)
    textBoxes[id].focus()
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

  return (
    <div className="w-full pb-20">
      <form
        ref={formRef}
        className="w-full h-full px-2 md:px-0 max-w-full md:max-w-xl mx-auto flex flex-col items-center justify-center mb-4"
      >
        {values.map((value, index) => {
          const isFirstTextBox = index === 0
          const isLastTextBox = index === values.length - 1
          const remainingLength = MAX_CHARACTERS - value.text.length
          const percentageOfRemainingLength = Math.ceil(
            ((MAX_CHARACTERS - value.text.length) / MAX_CHARACTERS) * 100
          )

          let radius = "rounded-2xl"
          if (values.length > 1 && isFirstTextBox) {
            radius = "rounded-2xl rounded-bl-none"
          }

          if (values.length > 1 && !isFirstTextBox && !isLastTextBox) {
            radius = "rounded-2xl rounded-l-none"
          }

          if (values.length > 1 && isLastTextBox) {
            radius = "rounded-2xl rounded-tl-none"
          }

          return (
            <div className="relative w-full" key={value.id}>
              <div
                className={`${
                  isFirstTextBox ? "hidden" : ""
                } h-6 border-r-2 w-0 border-white/30 border-dashed mr-auto`}
              />
              <ContentEditor
                key={value.id}
                index={index}
                value={value.text}
                focused={value.focused}
                radius={radius}
                highlighted={highlightedTextBoxes.includes(value.id)}
                lastIndex={values.length - 1}
                handleFocus={() => focusOnNewTextBox(value.id)}
                handleChange={(text: string) => {
                  const newHighlightedTextBoxes = highlightedTextBoxes.filter(
                    (id) => id !== value.id
                  )
                  setHighlightedTextBoxes(newHighlightedTextBoxes)
                  const newValues = [...values]
                  newValues[index].text = text
                  setValues(newValues)
                }}
              />
              {/* <div
                className={`${
                  isLastTextBox ? "hidden" : ""
                } h-12 border-r-2 w-0 border-white/30 border-dashed mr-auto`}
              /> */}
              <Controls show={value.focused}>
                <SecondaryButton
                  disabled={lastTextBoxIsEmpty}
                  handleClick={(e) => {
                    e.preventDefault()
                    !lastTextBoxIsEmpty && addNewTextBox()
                  }}
                  title="Add new text box"
                  tertiary={true}
                  className={`${!isLastTextBox ? "hidden" : ""} mr-1`}
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </SecondaryButton>

                <SecondaryButton
                  // disabled={lastTextBoxIsEmpty}
                  handleClick={(e) => {
                    e.preventDefault()
                    removeTextBox(value.id)
                  }}
                  title="Delete this text box"
                  tertiary={true}
                  className={`${isFirstTextBox ? "hidden" : ""} mr-1 group`}
                >
                  <Icon
                    url={`/assets/icons/image.svg`}
                    className="w-6 h-6 bg-white group-hover:bg-pink-400"
                  />
                </SecondaryButton>

                <SecondaryButton
                  // disabled={lastTextBoxIsEmpty}
                  handleClick={(e) => {
                    e.preventDefault()
                    removeTextBox(value.id)
                  }}
                  title="Delete this text box"
                  tertiary={true}
                  className={`${isFirstTextBox ? "hidden" : ""} mr-1`}
                >
                  {/* trash can svg icon */}
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </SecondaryButton>
                <div className="w-6 h-6">
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
                        fill:
                          percentageOfRemainingLength < 20 ? "red" : "#818cf8"
                      }
                    }}
                  />
                </div>

                <p
                  className={`text-sm min-w-[27px] ${
                    remainingLength < 20
                      ? "text-rose-300 font-bold"
                      : "text-indigo-200"
                  }`}
                >
                  {remainingLength}
                </p>
              </Controls>
            </div>
          )
        })}
      </form>
      {/* TODO: form validation and disabled status */}
      <div className="grid grid-cols-2 gap-2 max-w-xs mx-auto">
        <PrimaryButton
          handleClick={handleSendDraftsAsTweet}
          title="Tweet draft"
          disabled={highlightedTextBoxes.length > 0}
        >
          Tweet
        </PrimaryButton>
        <PrimaryButton
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
