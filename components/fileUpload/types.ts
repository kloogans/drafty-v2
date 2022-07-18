export interface DragAndDropImageUploaderProps {
  children: React.ReactNode
  multiple?: boolean
  className?: string
  attachments?: string[]
  handleChange: (file: File) => void
}
