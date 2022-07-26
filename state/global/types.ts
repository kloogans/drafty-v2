export interface GlobalStateProps {
  popoverIsOpen: boolean
  drawerIsOpen: boolean
  popoverTitle: string
  popoverContent: string
  popoverConfirmAction: () => void
  togglePopover: () => void
  openPopover: (
    title: string,
    content: string,
    confirmAction: () => void
  ) => void
  toggleDrawer: () => void
}

export interface GlobalStateProviderProps {
  children: React.ReactNode
}

export interface PayloadProps {
  popoverTitle?: string
  popoverContent?: string
  popoverConfirmAction?: () => void
  isToggled?: boolean
  value?: string
}

export interface GlobalStateActions {
  type: string
  payload: PayloadProps
}
