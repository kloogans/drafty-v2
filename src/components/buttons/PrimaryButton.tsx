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
  linkPath = "",
  isCTA = false
}) => {
  const disabledStyle = `cursor-not-allowed opacity-50`
  const displayStyle = `!bg-transparent !border-pink-400 !border-dashed hover:!border-solid hover:!bg-pink-500 hover:!border-pink-500 focus:!border-pink-500 hover:shadow-[0_0_10px_0_#ec4899] focus:shadow-[0_0_10px_0_#ec4899] !text-white`
  const mainButtonStyle = `px-4 py-2 border-2 border-bg-white text-white hover:bg-amber-400 hover:text-indigo-800 hover:border-amber-400 group rounded-2xl transition duration-200 ease-in-out `

  const CTAStyle = "text-md"

  if (isInternalLink) {
    return (
      <Link href={linkPath}>
        <a
          title={title}
          className={`${mainButtonStyle} ${className || ""} ${
            disabled ? disabledStyle : ""
          } ${isDisplay ? displayStyle : ""} ${isCTA ? CTAStyle : "text-sm"}`}
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
      } ${isDisplay ? displayStyle : ""} ${isCTA ? CTAStyle : "text-sm"}`}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}
