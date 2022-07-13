import { SecondaryButtonProps } from "./types"
import Link from "next/link"

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  children,
  handleClick,
  className,
  title = "",
  disabled = false,
  isInternalLink = false,
  linkPath = "",
  tertiary = false
}) => {
  const displayStyle = `px-3 py-2 rounded-2xl border-4 border-white`

  const tertiaryStyle = `hover:text-yellow-300`

  const disabledStyle = `cursor-not-allowed opacity-50`

  const style = `text-md text-white ${className || ""} 
  ${tertiary ? tertiaryStyle : displayStyle}
  ${disabled ? disabledStyle : ""}
  `

  if (isInternalLink) {
    return (
      <Link href={linkPath}>
        <a title={title} className={style}>
          {children}
        </a>
      </Link>
    )
  }

  return (
    <button title={title} className={style} onClick={handleClick}>
      {children}
    </button>
  )
}
