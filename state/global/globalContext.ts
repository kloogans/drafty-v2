import { createContext } from "react"
import { GlobalStateProps } from "./types"

export const initialGlobalState = {
  popoverIsOpen: false,
  drawerIsOpen: false,
  toggleDrawer: () => {},
  togglePopover: () => {}
}

export const GlobalState = createContext<GlobalStateProps>(initialGlobalState)
