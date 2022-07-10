import { useContext } from "react"
import { GlobalState } from "../global/globalContext"

export const useGlobalState = () => useContext(GlobalState)
