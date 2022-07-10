import { useReducer } from "react"
import { GlobalState, initialGlobalState } from "./globalContext"
import { GlobalStateProps } from "./types"

interface GlobalStateProviderProps {
  children: React.ReactNode
}

interface GlobalStateActions {
  type: string
  payload?: string | boolean
}

const globalStateReducer = (
  state: GlobalStateProps,
  action: GlobalStateActions
): GlobalStateProps => {
  switch (action.type) {
    case "setPopoverIsOpen":
      return {
        ...state,
        popoverIsOpen: action.payload as boolean
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
        payload: !state.popoverIsOpen
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
