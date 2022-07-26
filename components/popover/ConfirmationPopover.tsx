import { PrimaryButton, SecondaryButton } from "components/buttons"
import { useGlobalState } from "state/hooks/useGlobalState"
import Popover from "./Popover"

interface ConfirmationPopoverProps {
  text: string
  confirmText: string
  cancelText: string
  handleConfirmation: () => void
}

const ConfirmationPopover: React.FC<ConfirmationPopoverProps> = ({
  text = "",
  confirmText = "Save and close",
  cancelText = "Cancel and close",
  handleConfirmation
}) => {
  const { togglePopover } = useGlobalState()

  const confirm = async () => {
    await handleConfirmation()
    togglePopover()
  }
  return (
    <Popover id="confirmation-popover">
      <div className="bg-zinc-700 min-h-[70vh] lg:max-h-[70vh] lg:min-w-[532px] overflow-y-auto scrollbar-blue p-10 rounded-2xl shadow-md flex flex-col items-center justify-start">
        <p className="text-lg font-bold tracking-wide text-zinc-100 mb-4">
          {text}
        </p>
        <PrimaryButton handleClick={confirm} title={confirmText}>
          {confirmText}
        </PrimaryButton>
      </div>

      {/* <button
        className="mt-10 text-zinc-500 dark:text-zinc-300 dark:hover:text-zinc-400 hover:text-zinc-700 mx-auto w-full text-md"
        title={confirmText}
        onClick={togglePopover}
      >
        {confirmText}
      </button> */}

      <SecondaryButton handleClick={togglePopover} title={cancelText} tertiary>
        {cancelText}
      </SecondaryButton>
    </Popover>
  )
}

export default ConfirmationPopover
