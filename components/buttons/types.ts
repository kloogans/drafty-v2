export interface ButtonProps {
  children: React.ReactNode
  handleClick?: () => void
  className?: string
  title?: string
  disabled?: boolean
  isInternalLink?: boolean
  linkPath?: string
}

export interface SecondaryButtonProps extends ButtonProps {
  tertiary?: boolean
}
