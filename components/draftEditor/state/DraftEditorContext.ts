import { createContext } from "react"
import { imageOptimizer } from "next/dist/server/image-optimizer"
import { DraftSection } from "../types"
import { DraftEditorContextProps } from "./types"

export const initialDraftEditorState: DraftEditorContextProps = {
  category: "",
  sections: [],
  highlightedTextBoxes: []
}

export const DraftEditorContext = createContext<DraftEditorContextProps>(
  initialDraftEditorState
)
