import Icon from "../icon/Icon"

interface DraftSectionProps {
  children: React.ReactNode
}

const DraftSection: React.FC<DraftSectionProps> = ({ children }) => {
  return <div className="w-full relative">{children}</div>
}

export default DraftSection
