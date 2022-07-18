import { useState, useLayoutEffect } from "react"
import { createPortal } from "react-dom"
import { PortalProps } from "./types"
import { createContainerAndAppendToBody } from "./utils/createContainerAndAppendToBody"

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
