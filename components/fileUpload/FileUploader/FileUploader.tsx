import { acceptedExt, checkType, getFileSizeMB } from "./utils"
import { useEffect, useRef, useState } from "react"

import FileTypes from "./FileTypes"
import ImageAdd from "./ImageAdd"
import useDragging from "./useDragging"
import Icon from "components/icon/Icon"

type FileUploaderProps = {
  name?: string
  hoverTitle?: string
  types?: Array<string>
  classes?: string
  children?: React.ReactNode
  maxSize?: number
  minSize?: number
  fileOrFiles?: Array<File> | File | null
  disabled?: boolean | false
  label?: string | undefined
  multiple?: boolean | false
  onSizeError?: (arg0: string) => void
  onTypeError?: (arg0: string) => void
  onDrop?: (arg0: File | Array<File>) => void
  onSelect?: (arg0: File | Array<File>) => void
  handleChange?: (arg0: File | Array<File> | File) => void
  onDraggingStateChange?: (dragging: boolean) => void
}

const drawDescription = (
  currFile: Array<File> | File | null,
  uploaded: boolean,
  typeError: boolean,
  disabled: boolean | undefined,
  label: string | undefined
) => {
  return typeError ? (
    <span>File type/size error, Hovered on types!</span>
  ) : (
    <div className="flex justify-between flex-auto">
      {disabled ? (
        <span>Upload disabled</span>
      ) : !currFile && !uploaded ? (
        <>
          {label ? (
            <>
              <span>{label.split(" ")[0]}</span>{" "}
              {label.substr(label.indexOf(" ") + 1)}
            </>
          ) : (
            <>
              <span>Upload</span> or drop a file right here
            </>
          )}
        </>
      ) : (
        <>
          <span>Uploaded Successfully!.</span> Upload another?
        </>
      )}
    </div>
  )
}

const FileUploader: React.FC<FileUploaderProps> = (props): JSX.Element => {
  const {
    name,
    hoverTitle,
    types,
    handleChange,
    classes,
    children,
    maxSize,
    minSize,
    fileOrFiles,
    onSizeError,
    onTypeError,
    onSelect,
    onDrop,
    disabled,
    label,
    multiple,
    onDraggingStateChange
  } = props
  const labelRef = useRef<HTMLLabelElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploaded, setUploaded] = useState(false)
  const [currFiles, setFile] = useState<Array<File> | File | null>(null)
  const [error, setError] = useState(false)

  const validateFile = (file: File) => {
    if (types && !checkType(file, types)) {
      // types included and type not in them
      setError(true)
      if (onTypeError) onTypeError("File type is not supported")
      return false
    }
    if (maxSize && getFileSizeMB(file.size) > maxSize) {
      setError(true)
      if (onSizeError) onSizeError("File size is too big")
      return false
    }
    if (minSize && getFileSizeMB(file.size) < minSize) {
      setError(true)
      if (onSizeError) onSizeError("File size is too small")
      return false
    }
    return true
  }

  const handleChanges = (files: File | Array<File>): boolean => {
    let checkError = false
    if (files) {
      if (files instanceof File) {
        checkError = !validateFile(files)
      } else {
        for (let i = 0; i < files.length; i++) {
          const file = files[i]
          checkError = !validateFile(file) || checkError
        }
      }
      if (checkError) return false
      if (handleChange) handleChange(files)
      setFile(files)

      setUploaded(true)
      setError(false)
      return true
    }
    return false
  }

  const blockEvent = (ev: any) => {
    ev.preventDefault()
    ev.stopPropagation()
  }
  const handleClick = (ev: any) => {
    ev.stopPropagation()
    // eslint-disable-next-line no-param-reassign
    if (inputRef && inputRef.current) {
      inputRef.current.click()
    }
  }

  const handleInputChange = (ev: any) => {
    const allFiles = ev.target.files
    const files = multiple ? allFiles : allFiles[0]
    const success = handleChanges(files)
    if (onSelect && success) onSelect(files)
  }
  const dragging = useDragging({
    labelRef,
    inputRef,
    multiple,
    handleChanges,
    onDrop
  })

  useEffect(() => {
    onDraggingStateChange?.(dragging)
  }, [dragging])

  useEffect(() => {
    if (fileOrFiles) {
      setUploaded(true)
      setFile(fileOrFiles)
    } else {
      if (inputRef.current) inputRef.current.value = ""
      setUploaded(false)
      setFile(null)
    }
  }, [fileOrFiles])

  return (
    <label
      // overRide={children}
      className={` relative ${classes || ""} ${disabled ? "is-disabled" : ""}`}
      ref={labelRef}
      htmlFor={name}
      onClick={blockEvent}
    >
      <input
        // onClick={handleClick}
        onChange={handleInputChange}
        accept={acceptedExt(types)}
        ref={inputRef}
        type="file"
        name={name}
        disabled={disabled}
        multiple={multiple}
        className="hidden"
      />
      {dragging && (
        <div
          className={`w-full h-full ${
            disabled ? "bg-rose-500" : "bg-indigo-800/70"
          } absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 backdrop-blur-md z-20`}
        >
          <span className="absolute top-1/2 text-white p-4 border-2 border-dashed border-white rounded-2xl left-1/2 -translate-y-1/2 -translate-x-1/2">
            {disabled ? (
              <>
                <Icon
                  url="/assets/icons/error.svg"
                  className="w-8 h-8 bg-white mx-auto"
                />
                <strong>Max</strong> files
              </>
            ) : (
              <>
                <Icon
                  url="/assets/icons/image.svg"
                  className="w-8 h-8 bg-white mx-auto"
                />
                Drop file <strong>here</strong>
              </>
            )}

            {disabled ? "Max files" : ""}
          </span>
        </div>
      )}
      {!children && (
        <>
          <ImageAdd />
          <div>
            {drawDescription(currFiles, uploaded, error, disabled, label)}
            <FileTypes types={types} minSize={minSize} maxSize={maxSize} />
          </div>
        </>
      )}
      {children}
    </label>
  )
}
export default FileUploader
