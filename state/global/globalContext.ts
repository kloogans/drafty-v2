import { createContext } from "react"
import { GlobalStateProps } from "./types"

export const initialGlobalState = {
  popoverIsOpen: false,
  togglePopover: () => {}
}

export const GlobalState = createContext<GlobalStateProps>(initialGlobalState)
