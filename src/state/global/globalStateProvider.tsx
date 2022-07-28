import { PopoverProps } from "src/components/popover/types"
import { useReducer } from "react"
import { GlobalState, initialGlobalState } from "./globalContext"
import {
  GlobalStateProps,
  GlobalStateProviderProps,
  GlobalStateActions
} from "./types"

const globalStateReducer = (
  state: GlobalStateProps,
  action: GlobalStateActions
): GlobalStateProps => {
  switch (action.type) {
    case "setPopoverIsOpen":
      return {
        ...state,
        popoverIsOpen: action.payload.isToggled as boolean,
        popoverTitle: "",
        popoverContent: "",
        popoverConfirmAction: () => {}
      }
    case "TOGGLE_DRAWER":
      return {
        ...state,
        drawerIsOpen: action.payload.isToggled as boolean
      }
    case "OPEN_POPOVER":
      return {
        ...state,
        popoverIsOpen: true,
        popoverTitle: action.payload.popoverTitle as string,
        popoverContent: action.payload.popoverContent as string,
        popoverConfirmAction: action.payload.popoverConfirmAction as () => void
      }
    default:
      return state
  }
}

const GlobalStateProvider: React.FC<GlobalStateProviderProps> = ({
  children
}) => {
  const [state, dispatch] = useReducer(globalStateReducer, initialGlobalState)

  const actions = {
    togglePopover: () => {
      dispatch({
        type: "setPopoverIsOpen",
        payload: { isToggled: !state.popoverIsOpen }
      })
    },
    toggleDrawer: () => {
      dispatch({
        type: "TOGGLE_DRAWER",
        payload: { isToggled: !state.drawerIsOpen }
      })
    },
    openPopover: (
      popoverTitle: string,
      popoverContent: string,
      popoverConfirmAction: () => void
    ) => {
      dispatch({
        type: "OPEN_POPOVER",
        payload: {
          popoverTitle,
          popoverContent,
          popoverConfirmAction
        }
      })
    }
  }

  return (
    <GlobalState.Provider value={{ ...state, ...actions }}>
      {children}
    </GlobalState.Provider>
  )
}

export default GlobalStateProvider
