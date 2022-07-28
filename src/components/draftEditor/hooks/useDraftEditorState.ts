import { DraftEditorContext } from "../state/DraftEditorContext"
import { useContext } from "react"

export const useDraftEditorState = () => useContext(DraftEditorContext)
