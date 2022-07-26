import { DraftProps } from "components/draftEditor/types"

const DraftPreview: React.FC<DraftProps> = ({ id, sections }) => {
  const previewSection = sections[0]
  const hasMultipleSections = sections.length > 1

  return (
    <div className={`relative w-full max-w-xl`}>
      <p className="text-md text-white whitespace-pre-line">
        {previewSection.text}
      </p>
    </div>
  )
}

export default DraftPreview
