import { useState, useEffect, useCallback } from "react"

let draggingCount = 0
type UseDraggingProps = {
  labelRef: any
  inputRef: any
  multiple?: boolean | false
  handleChanges: (files: Array<File>) => void
  onDrop?: (files: Array<File>) => void
}

export default function useDragging({
  labelRef,
  inputRef,
  multiple,
  handleChanges,
  onDrop
}: UseDraggingProps): boolean {
  const [dragging, setDragging] = useState(false)
  const handleClick = useCallback(() => {
    inputRef.current.click()
  }, [inputRef])

  const handleDragIn = useCallback((ev: any) => {
    ev.preventDefault()
    ev.stopPropagation()
    draggingCount++
    if (ev.dataTransfer.items && ev.dataTransfer.items.length !== 0) {
      setDragging(true)
    }
  }, [])
  const handleDragOut = useCallback((ev: any) => {
    ev.preventDefault()
    ev.stopPropagation()
    draggingCount--
    if (draggingCount > 0) return
    setDragging(false)
  }, [])
  const handleDrag = useCallback((ev: any) => {
    ev.preventDefault()
    ev.stopPropagation()
  }, [])
  const handleDrop = useCallback(
    (ev: any) => {
      ev.preventDefault()
      ev.stopPropagation()
      setDragging(false)
      draggingCount = 0

      const eventFiles = ev.dataTransfer.files
      if (eventFiles && eventFiles.length > 0) {
        const files = multiple ? eventFiles : eventFiles[0]
        const success = handleChanges(files)
        //@ts-ignore
        if (onDrop && success) onDrop(files)
      }
    },
    [handleChanges]
  )
  useEffect(() => {
    const ele = labelRef.current
    ele.addEventListener("click", handleClick)
    ele.addEventListener("dragenter", handleDragIn)
    ele.addEventListener("dragleave", handleDragOut)
    ele.addEventListener("dragover", handleDrag)
    ele.addEventListener("drop", handleDrop)
    return () => {
      ele.removeEventListener("click", handleClick)
      ele.removeEventListener("dragenter", handleDragIn)
      ele.removeEventListener("dragleave", handleDragOut)
      ele.removeEventListener("dragover", handleDrag)
      ele.removeEventListener("drop", handleDrop)
    }
  }, [
    handleClick,
    handleDragIn,
    handleDragOut,
    handleDrag,
    handleDrop,
    labelRef
  ])

  return dragging
}
