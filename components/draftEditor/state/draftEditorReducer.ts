import { DraftSection } from "../types"
import { DraftEditorReducerActionProps } from "./types"

export const draftEditorReducer = (
  state: any,
  action: DraftEditorReducerActionProps
) => {
  switch (action.type) {
    case "ADD_TEXT_BOX":
      // toggle all focus properties to false
      const newSections = state.sections.map((section: DraftSection) => {
        return {
          ...section,
          focused: false
        }
      })

      return {
        ...state,
        sections: [
          ...newSections,
          {
            id: newSections.length,
            text: "",
            attachments: [],
            focused: true
          }
        ]
      }
    case "REMOVE_TEXT_BOX":
      const newSectionsAfterRemoval = state.sections.filter(
        (section: DraftSection) => section.id !== action.id
      )
      const incomingIdIsLast = action.id === state.sections.length
      // @ts-ignore
      let newFocusId = incomingIdIsLast ? action.id - 1 : action.id
      const newSectionWithRenewedIds = newSectionsAfterRemoval.map(
        (section: DraftSection, index: number) => {
          if (index === newFocusId) {
            return {
              ...section,
              focused: true,
              id: index
            }
          }
          return {
            ...section,
            id: index
          }
        }
      )
      return {
        ...state,
        sections: [...newSectionWithRenewedIds]
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
      const newHighlightedTextBoxes = state.highlightedTextBoxes.filter(
        (id: number) => id !== id
      )
      return {
        ...state,
        highlightedTextBoxes: newHighlightedTextBoxes,
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
    case "ADD_ATTACHMENT":
      return {
        ...state,
        sections: state.sections.map((section: DraftSection) => {
          if (section.id === action.id) {
            return {
              ...section,
              attachments: [...section.attachments, action.attachment]
            }
          }
          return section
        })
      }
    case "REMOVE_ATTACHMENT":
      return {
        ...state,
        sections: state.sections.map((section: DraftSection) => {
          if (section.id === action.sectionId) {
            return {
              ...section,
              attachments: section.attachments.filter(
                (_, index) => index !== action.attachmentIndex
              )
            }
          }
          return section
        })
      }

    case "HIGHLIGHT_TEXT_BOX":
      return {
        ...state,
        highlightedTextBoxes: [...state.highlightedTextBoxes, action.id]
      }
    case "UNHIGHLIGHT_TEXT_BOX":
      return {
        ...state,
        highlightedTextBoxes: state.highlightedTextBoxes.filter(
          (id: number) => id !== action.id
        )
      }

    default:
      return state
  }
}
