export interface GlobalStateProps {
  popoverIsOpen: boolean
  togglePopover: () => void
}

export interface GlobalStateProviderProps {
  children: React.ReactNode
}

export interface GlobalStateActions {
  type: string
  payload?: string | boolean
}
