import { DraftSection } from "../types"
import { DraftEditorReducerActionProps } from "./types"

export const draftEditorReducer = (
  state: any,
  action: DraftEditorReducerActionProps
) => {
  switch (action.type) {
    case "ADD_TEXT_BOX":
      return {
        ...state,
        sections: [
          ...state.sections,
          {
            id: state.sections.length,
            text: "",
            attachments: [],
            focused: true
          }
        ]
      }
    case "REMOVE_TEXT_BOX":
      return {
        ...state,
        sections: state.sections.filter(
          (section: DraftSection) => section.id !== action.id
        )
      }
    case "FOCUS_ON_TEXT_BOX":
      return {
        ...state,
        sections: state.sections.map((section: DraftSection) => {
          if (section.id === action.id) {
            return {
              ...section,
              focused: true
            }
          }
          return {
            ...section,
            focused: false
          }
        })
      }
    case "CHANGE_TEXT":
      return {
        ...state,
        sections: state.sections.map((section: DraftSection) => {
          if (section.id === action.id) {
            return {
              ...section,
              text: action.text
            }
          }
          return section
        })
      }
    case "CHANGE_ATTACHMENTS":
      return {
        ...state,
        sections: state.sections.map((section: DraftSection) => {
          if (section.id === action.id) {
            return {
              ...section,
              attachments: action.attachments
            }
          }
          return section
        })
      }
    default:
      return state
  }
}
