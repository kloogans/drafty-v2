import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import Icon from "../icon/Icon"

interface DraftSectionProps {
  children: React.ReactNode
  id: number
  handle: boolean
}

const DraftSection: React.FC<DraftSectionProps> = ({
  children,
  id,
  handle
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? "100" : "auto",
    opacity: isDragging ? 0.3 : 1
  }
  return (
    <div className="w-full relative" ref={setNodeRef} style={style}>
      <button
        className={`absolute left-[-5rem] top-1/2 text-white text-sm ${
          id === 0 ? "hidden" : ""
        }`}
        {...attributes}
        {...listeners}
      >
        <Icon url="/assets/icons/sort.svg" className={`w-8 h-8 bg-white `} />
      </button>
      {children}
    </div>
  )
}

export default DraftSection
