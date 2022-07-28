import { PrimaryButton } from "./PrimaryButton"
export interface ButtonProps {
  children: React.ReactNode
  handleClick?: (e?: any) => void
  className?: string
  title?: string
  disabled?: boolean
  isInternalLink?: boolean
  linkPath?: string
}

export interface PrimaryButtonProps extends ButtonProps {
  isDisplay?: boolean
}

export interface SecondaryButtonProps extends ButtonProps {
  tertiary?: boolean
}
