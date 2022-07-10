import { ButtonProps } from "./types"
import Link from "next/link"

export const SecondaryButton: React.FC<ButtonProps> = ({
  children,
  handleClick,
  className,
  title = "",
  isInternalLink = false,
  linkPath = ""
}) => {
  if (isInternalLink) {
    return (
      <Link href={linkPath}>
        <a
          title={title}
          className={`text-md px-3 py-2 rounded-2xl border-4 border-white text-white ${
            className || ""
          }`}
        >
          {children}
        </a>
      </Link>
    )
  }

  return (
    <button
      title={title}
      className={`text-md px-3 py-2 rounded-2xl border-4 border-white text-white ${
        className || ""
      }`}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}
