import Icon from "../icon/Icon"

interface LogoIconProps {
  className?: string
}

const LogoIcon: React.FC<LogoIconProps> = ({ className = "" }) => {
  if (typeof window == undefined) return null
  return <Icon url="/assets/icons/feather-1.svg" className={className} />
}

export default LogoIcon
