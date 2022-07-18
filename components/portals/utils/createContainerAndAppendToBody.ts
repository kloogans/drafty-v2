export const createContainerAndAppendToBody = (containerId: string) => {
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
