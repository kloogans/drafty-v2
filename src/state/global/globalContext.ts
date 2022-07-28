import { createContext } from "react"
import { GlobalStateProps } from "./types"

export const initialGlobalState = {
  popoverIsOpen: false,
  drawerIsOpen: false,
  popoverTitle: "",
  popoverContent: "",
  popoverConfirmAction: async () => {},
  toggleDrawer: () => {},
  togglePopover: () => {},
  openPopover: () => {}
}

export const GlobalState = createContext<GlobalStateProps>(initialGlobalState)
