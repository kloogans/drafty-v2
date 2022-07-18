import { useDraftEditorState } from "components/draftEditor/hooks/useDraftEditorState"
import { useState } from "react"
import FileUploader from "./FileUploader/FileUploader"
import { DragAndDropImageUploaderProps } from "./types"

const ACCEPTED_FILE_TYPES = ["JPG", "JPEG", "PNG", "GIF"]

const MAX_UPLOAD_SIZE = 5

const DragAndDropImageUploader: React.FC<DragAndDropImageUploaderProps> = ({
  children,
  multiple = false,
  className = "",
  attachments = [],
  handleChange
}) => {
  const [dropZoneIsHovering, setDropZoneIsHovering] = useState(false)

  const handleDropzoneHover = () =>
    setDropZoneIsHovering((dropZoneIsHovering) => !dropZoneIsHovering)

  return (
    <FileUploader
      handleChange={(file: any) => {
        handleChange(file)
      }}
      onDraggingStateChange={handleDropzoneHover}
      name="file"
      // fileOrFiles={attachments}
      maxSize={multiple ? 10 : MAX_UPLOAD_SIZE}
      multiple={multiple}
      types={ACCEPTED_FILE_TYPES}
      classes={`w-full flex flex-col items-center cursor-pointer justify-center overflow-hidden ${
        !dropZoneIsHovering
          ? "border-indigo-500"
          : "bg-transparent dark:bg-zinc-800 border-zinc-400 hover:border-indigo-500"
      } ${className}`}
    >
      {children}
    </FileUploader>
  )
}

export default DragAndDropImageUploader
