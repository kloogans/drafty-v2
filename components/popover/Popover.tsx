import { useRef, useEffect } from "react"
import Portal from "components/portals/Portal"
import { useGlobalState } from "state/hooks/useGlobalState"
import { useClickAway } from "react-use"
import { PopoverProps } from "./types"

const Popover: React.FC<PopoverProps> = ({ children, id = "popover" }) => {
  const popoverRef = useRef<HTMLDivElement>(null)
  const { popoverIsOpen, togglePopover } = useGlobalState()
  // useClickAway(popoverRef, () => {
  //   popoverIsOpen && togglePopover()
  // })

  useEffect(() => {
    const root = document.querySelector("#__next")
    if (popoverIsOpen) {
      root?.classList.add("overflow-y-hidden")
    }

    return () => {
      root?.classList.remove("overflow-y-hidden")
    }
  }, [popoverIsOpen])

  const handleKeyEvent = (e: KeyboardEvent) => {
    if (popoverIsOpen && e.key === "Escape") {
      togglePopover()
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyEvent)

    return () => {
      document.removeEventListener("keydown", handleKeyEvent)
    }
  }, [])

  if (!popoverIsOpen) return null

  return (
    <Portal containerId={id}>
      <div ref={popoverRef}>{children}</div>
    </Portal>
  )
}

export default Popover
