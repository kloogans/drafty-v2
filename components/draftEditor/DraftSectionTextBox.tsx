import DragAndDropImageUploader from "components/fileUpload/DragAndDropImageUploader"
import { useEffect } from "react"
import { useDraftEditorState } from "./hooks/useDraftEditorState"
import { useDraftEditorFunctions } from "./hooks/useDraftEditorFunctions"
import { DraftSecionTextBoxProps } from "./types"
import { MAX_CHARACTERS } from "./utils"

const DraftSectionTextBox: React.FC<DraftSecionTextBoxProps> = ({
  id,
  draftId,
  value,
  focused,
  attachments,
  radius = "rounded-2xl",
  children
}) => {
  const {
    highlightedTextBoxes,
    sections,
    focusOnTextBox,
    changeText,
    addAttachment
  } = useDraftEditorState()

  const { handleSendDraftsAsTweet, uploadMediaFileLocally } =
    useDraftEditorFunctions()

  useEffect(() => {
    focusOnTextBox(id)
  }, [])

  const hasAttachments = attachments.length > 0
  const focusedStyle = `${
    hasAttachments ? "min-h-[7.5rem]" : "min-h-[10.5rem]"
  } pb-[56px] !text-white`
  const highlightedStyle = `!border-rose-400 !border-solid`

  const isLastTextBox = id === sections[sections.length - 1].id
  const isHighlighted = highlightedTextBoxes.includes(id)

  return (
    <DragAndDropImageUploader
      attachments={attachments}
      handleChange={(file: File) => uploadMediaFileLocally(file, draftId, id)}
      className={`border-2 border-white/30 border-dashed rounded-2xl ${
        focused ? "!border-white !border-solid bg-indigo-800" : "bg-indigo-900 "
      } 
      ${focused && hasAttachments ? "pb-12 md:pb-4" : "pb-4"}
      ${
        isHighlighted ? highlightedStyle : ""
      } ${radius} transition-[all] duration-200 ease-in-out`}
    >
      <textarea
        className={`w-full text-2xl p-4 outline-none bg-transparent flex resize-none transition duration-200 ease-in-out ${
          focused ? focusedStyle : "min-h-[7.5rem] text-gray-500"
        }`}
        style={{ transitionProperty: "all" }}
        value={value}
        placeholder="Your text"
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
      {children}
    </DragAndDropImageUploader>
  )
}

export default DraftSectionTextBox
