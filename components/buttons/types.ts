export interface ButtonProps {
  children: React.ReactNode
  handleClick?: () => void
  className?: string
  title?: string
  isInternalLink?: boolean
  linkPath?: string
}
