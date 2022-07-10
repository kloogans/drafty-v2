import { useRef, useEffect } from "react"
import ReactPortal from "components/portals/ReactPortal"
import { useGlobalState } from "state/hooks/useGlobalState"
import { useClickAway } from "react-use"

interface PopoverProps {
  children: React.ReactNode
  id: string
}

const Popover: React.FC<PopoverProps> = ({ children, id = "popover" }) => {
  const popoverRef = useRef<HTMLDivElement>(null)
  const { popoverIsOpen, togglePopover } = useGlobalState()
  useClickAway(popoverRef, () => {
    popoverIsOpen && togglePopover()
  })

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
    <ReactPortal containerId={id}>
      <span ref={popoverRef}>{children}</span>
    </ReactPortal>
  )
}

export default Popover
