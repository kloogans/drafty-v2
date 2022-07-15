export interface GlobalStateProps {
  popoverIsOpen: boolean
  drawerIsOpen: boolean
  togglePopover: () => void
  toggleDrawer: () => void
}

export interface GlobalStateProviderProps {
  children: React.ReactNode
}

export interface GlobalStateActions {
  type: string
  payload?: string | boolean
}
