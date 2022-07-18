import DragAndDropImageUploader from "components/fileUpload/DragAndDropImageUploader"
import { useEffect } from "react"
import { useDraftEditorState } from "./hooks/useDraftEditorState"
import { useDraftEditorFunctions } from "./hooks/useDraftEditorFunctions"
import { DraftSecionTextBoxProps } from "./types"
import { MAX_CHARACTERS } from "./utils"

const DraftSectionTextBox: React.FC<DraftSecionTextBoxProps> = ({
  id,
  value,
  focused,
  attachments,
  radius = "rounded-2xl"
}) => {
  const {
    highlightedTextBoxes,
    sections,
    focusOnTextBox,
    changeText,
    addAttachment
  } = useDraftEditorState()

  const { handleSendDraftsAsTweet, uploadMediaFile } = useDraftEditorFunctions()

  useEffect(() => {
    focusOnTextBox(id)
  }, [])

  const focusedStyle = `min-h-[16.5rem] !bg-indigo-900 focus:!bg-indigo-800 pb-[56px] !text-white !border-white !border-solid`
  const highlightedStyle = `!border-rose-400 !border-solid`

  const isLastTextBox = id === sections[sections.length - 1].id
  const isHighlighted = highlightedTextBoxes.includes(id)

  return (
    <DragAndDropImageUploader
      attachments={attachments}
      handleChange={(file: File) => uploadMediaFile(file, id)}
    >
      <textarea
        className={`w-full text-2xl border-2 border-white/30 border-dashed p-4 outline-none ${radius} flex resize-none transition duration-200 ease-in-out ${
          focused ? focusedStyle : "min-h-[10rem] text-gray-500 bg-indigo-900"
        } ${isHighlighted ? highlightedStyle : ""}`}
        style={{ transitionProperty: "all" }}
        value={value}
        onFocus={() => focusOnTextBox(id)}
        onChange={(e) => {
          if (e.target.value.length <= MAX_CHARACTERS) {
            if (e.target.value.length === MAX_CHARACTERS) {
              if (isLastTextBox) {
                return
              }
            }
            changeText(id, e.target.value)
          }
        }}
      />
    </DragAndDropImageUploader>
  )
}

export default DraftSectionTextBox
