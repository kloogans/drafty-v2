import DragAndDropImageUploader from "src/components/fileUpload/DragAndDropImageUploader"
import { useEffect, useRef } from "react"
import { useDraftEditorState } from "./hooks/useDraftEditorState"
import { useDraftEditorFunctions } from "./hooks/useDraftEditorFunctions"
import { DraftSecionTextBoxProps } from "./types"
import { MAX_CHARACTERS } from "./utils"
import LoadingRing from "../loader/LoadingRing"

const DraftSectionTextBox: React.FC<DraftSecionTextBoxProps> = ({
  id,
  draftId,
  value,
  focused,
  attachments,
  radius = "rounded-2xl",
  children
}) => {
  const { highlightedTextBoxes, sections, focusOnTextBox, changeText } =
    useDraftEditorState()

  const { handleSendDraftsAsTweet, uploadMedia, loading, imageUploadLoading } =
    useDraftEditorFunctions()

  const isLastTextBox = id === sections[sections.length - 1].id
  const isHighlighted = highlightedTextBoxes.includes(id)
  const hasAttachments = attachments.length > 0
  const hasMaxAttachments = attachments.length >= 4
  const focusedStyle = `${
    hasAttachments ? "min-h-[7.5rem]" : "min-h-[10.5rem]"
  } md:pb-[56px] !text-white`
  const highlightedStyle = `!border-rose-400 !border-solid`
  const paddingStyle = `${focused && hasAttachments ? "pb-12" : "pb-4"}`

  const borderStyle = `border-2 border-white/30 border-dashed rounded-2xl ${
    focused ? "!border-white !border-solid bg-indigo-800" : "bg-indigo-900 "
  } ${isHighlighted ? highlightedStyle : ""}`

  const textboxRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    focusOnTextBox(id)
    isLastTextBox && textboxRef?.current?.focus()
  }, [textboxRef.current])

  const handleTextBoxChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= MAX_CHARACTERS) {
      if (e.target.value.length === MAX_CHARACTERS) {
        if (isLastTextBox) {
          return
        }
      }
      changeText(id, e.target.value)
    }
  }

  return (
    <DragAndDropImageUploader
      attachments={attachments}
      disabled={hasMaxAttachments}
      handleChange={(file: File) =>
        !hasMaxAttachments && uploadMedia(file, draftId, id)
      }
      className={`${borderStyle} ${paddingStyle} ${radius} transition-[all] duration-200 ease-in-out relative`}
    >
      <div
        className={`absolute top-4 right-4 ${
          loading || imageUploadLoading ? "" : "hidden"
        }`}
      >
        <LoadingRing size={6} />
      </div>
      <textarea
        className={`w-full text-lg md:text-2xl p-4 outline-none bg-transparent flex resize-none transition duration-200 ease-in-out ${
          focused ? focusedStyle : "min-h-[7.5rem] text-gray-500"
        }`}
        style={{ transitionProperty: "all" }}
        ref={textboxRef}
        value={value}
        placeholder="Your text"
        onFocus={() => focusOnTextBox(id)}
        onChange={(e) => {
          handleTextBoxChange(e)
        }}
      />
      {children}
    </DragAndDropImageUploader>
  )
}

export default DraftSectionTextBox
