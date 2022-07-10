import { useState, useLayoutEffect } from "react"
import { createPortal } from "react-dom"
import { PortalProps } from "./types"

const createContainerAndAppendToBody = (containerId: string) => {
  const wrapperElement = document.createElement("div")
  wrapperElement.setAttribute("id", containerId)
  wrapperElement.classList.add(
    "fixed",
    "z-50",
    "top-0",
    "left-0",
    "w-full",
    "h-full",
    "bg-indigo-600/70",
    "backdrop-blur-md",
    "flex",
    "items-center",
    "justify-center",
    "flex-col"
  )
  document.body.appendChild(wrapperElement)
  return wrapperElement
}

const Portal: React.FC<PortalProps> = ({
  children,
  containerId = "popover"
}) => {
  const [containerElement, setContainerElement] = useState<HTMLElement | null>(
    null
  )

  useLayoutEffect(() => {
    let element = document.getElementById(containerId)
    let systemCreated = false
    if (!element) {
      systemCreated = true
      element = createContainerAndAppendToBody(containerId)
    }
    setContainerElement(element)

    return () => {
      if (systemCreated && element?.parentNode) {
        element.parentNode.removeChild(element)
      }
    }
  }, [containerId])

  if (containerElement == null) return null

  return createPortal(
    children,
    document.getElementById(containerId as string) as HTMLElement
  )
}

export default Portal
