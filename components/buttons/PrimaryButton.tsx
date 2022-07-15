import { ButtonProps } from "./types"
import Link from "next/link"

export const PrimaryButton: React.FC<ButtonProps> = ({
  children,
  handleClick,
  className,
  title = "",
  isInternalLink = false,
  disabled = false,
  linkPath = ""
}) => {
  const disabledStyle = `cursor-not-allowed opacity-50`
  if (isInternalLink) {
    return (
      <Link href={linkPath}>
        <a
          title={title}
          className={`text-md px-3 py-2 bg-amber-300 rounded-2xl border-4 border-yellow-100 ${
            className || ""
          } ${disabled ? disabledStyle : ""}`}
        >
          {children}
        </a>
      </Link>
    )
  }

  return (
    <button
      title={title}
      className={`text-md px-3 py-2 bg-amber-300 rounded-2xl border-4 border-yellow-100 ${
        className || ""
      }`}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}
