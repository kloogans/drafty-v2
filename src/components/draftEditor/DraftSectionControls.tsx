import { SecondaryButton } from "src/components/buttons"
import Icon from "src/components/icon/Icon"
import { useRef } from "react"
import { useDraftEditorFunctions } from "./hooks/useDraftEditorFunctions"
import { useDraftEditorState } from "./hooks/useDraftEditorState"
import ProgressRing from "./ProgressRing"
import { DraftSectionControlsProps } from "./types"

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

const DraftSectionControls: React.FC<DraftSectionControlsProps> = ({
  show,
  id,
  draftId,
  lastTextBoxIsEmpty,
  isFirstTextBox,
  isLastTextBox,
  remainingLength,
  progressPercentage,
  numberOfAssets
}) => {
  const { addTextBox, removeTextBox } = useDraftEditorState()
  const { uploadMedia } = useDraftEditorFunctions()
  const inputRef = useRef<HTMLInputElement>(null)

  const openFileBrowser = (ev: any) => {
    ev.stopPropagation()
    inputRef.current?.click()
    console.log(inputRef.current)
  }

  const handleUploadFile = async (file: File) => {
    await uploadMedia(file, draftId, id)
  }

  return (
    <Controls show={show}>
      <SecondaryButton
        disabled={lastTextBoxIsEmpty}
        handleClick={(e: any) => {
          e.preventDefault()
          !lastTextBoxIsEmpty && addTextBox()
        }}
        title="Add new text box"
        tertiary
        className={`${!isLastTextBox ? "hidden" : ""} mr-1`}
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"
            clipRule="evenodd"
          />
        </svg>
      </SecondaryButton>

      <SecondaryButton
        handleClick={(e) => {
          e.preventDefault()
          openFileBrowser(e)
        }}
        title="Upload media"
        disabled={numberOfAssets >= 4}
        tertiary
        className={`mr-1 group`}
      >
        <input
          onClick={(e) => openFileBrowser(e)}
          onChange={(event) =>
            event.target.files && handleUploadFile(event.target.files[0])
          }
          accept={"image/png, image/jpeg, image/jpg, image/gif"}
          ref={inputRef}
          type="file"
          name={"File upload"}
          disabled={numberOfAssets >= 4}
          multiple={false}
          className="hidden"
        />
        <Icon
          url={`/assets/icons/image.svg`}
          className="w-6 h-6 bg-white group-hover:bg-amber-400"
        />
      </SecondaryButton>

      {/* <SecondaryButton
        handleClick={(e) => {
          console.log("browse gif")
        }}
        title="Add a gif"
        // disabled={numberOfAssets >= 4}
        tertiary
        className={`mr-1 group`}
      >
        <Icon
          url={`/assets/icons/gif.svg`}
          className="w-6 h-6 bg-white group-hover:bg-amber-400"
        />
      </SecondaryButton> */}

      <SecondaryButton
        handleClick={(e) => {
          e.preventDefault()
          removeTextBox(id)
        }}
        title="Delete this text box"
        tertiary
        className={`${isFirstTextBox ? "hidden" : ""} mr-1`}
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </SecondaryButton>
      <ProgressRing percent={progressPercentage} />

      <p
        className={`text-sm min-w-[27px] ${
          remainingLength < 20 ? "text-rose-300 font-bold" : "text-indigo-200"
        }`}
      >
        {remainingLength}
      </p>
    </Controls>
  )
}

export default DraftSectionControls
