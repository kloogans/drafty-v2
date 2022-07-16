import { PrimaryButtonProps } from "./types"
import Link from "next/link"

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  handleClick,
  className,
  title = "",
  isDisplay = false,
  isInternalLink = false,
  disabled = false,
  linkPath = ""
}) => {
  const disabledStyle = `cursor-not-allowed opacity-50`
  const displayStyle = `!bg-transparent !border-pink-400 !border-dashed hover:!border-solid hover:!bg-pink-500 hover:!border-pink-500 focus:!border-pink-500 hover:shadow-[0_0_10px_0_#ec4899] focus:shadow-[0_0_10px_0_#ec4899] !text-white`
  const mainButtonStyle = `text-sm text-white px-3 py-3 bg-pink-400 hover:bg-pink-500 focus:bg-pink-500 rounded-2xl border-4 border-pink-100 hover:border-pink-500 focus:border-pink-500`
  if (isInternalLink) {
    return (
      <Link href={linkPath}>
        <a
          title={title}
          className={`${mainButtonStyle} ${className || ""} ${
            disabled ? disabledStyle : ""
          } ${isDisplay ? displayStyle : ""}`}
        >
          {children}
        </a>
      </Link>
    )
  }

  return (
    <button
      title={title}
      disabled={disabled}
      className={`${mainButtonStyle} ${className || ""} ${
        disabled ? disabledStyle : ""
      }`}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}
