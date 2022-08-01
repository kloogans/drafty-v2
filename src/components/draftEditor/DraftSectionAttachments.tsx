interface DraftSectionAttachmentsProps {
  sectionId: number
  isFirstTextBox: boolean
  isLastTextBox: boolean
  sectionIsFocused: boolean
}

import React from "react"
import { useDraftEditorState } from "./hooks/useDraftEditorState"
import { useDraftEditorFunctions } from "./hooks/useDraftEditorFunctions"
import { DraftSection } from "./types"
import Image from "next/image"

export const DraftSectionAttachments: React.FC<
  DraftSectionAttachmentsProps
> = ({ sectionId, isFirstTextBox, isLastTextBox, sectionIsFocused }) => {
  const { sections, removeAttachment } = useDraftEditorState()
  const currentSection = sections.find(
    (section) => section.id === sectionId
  ) as DraftSection
  const { attachments } = currentSection

  if (attachments.length < 1) {
    return null
  }

  const handleRemoveAttachment = (index: number) => {
    removeAttachment(sectionId, index)
  }

  return (
    <ul
      className={`grid ${
        attachments.length > 1 ? "grid-cols-2" : "grid-cols-1"
      } gap-2`}
    >
      {attachments.map((attachment, index) => {
        return (
          <li
            key={attachment + Math.ceil(Math.random() * 4387 + 100)}
            className={`relative ${
              sectionIsFocused ? "opacity-100" : "opacity-50"
            }`}
          >
            <button
              onClick={() => handleRemoveAttachment(index)}
              className={`${
                !sectionIsFocused ? "hidden" : ""
              } absolute -top-3 -right-3 p-1 bg-zinc-800 rounded-full group z-10`}
              title="Remove image"
            >
              {/* svg close icon */}
              <svg
                className="w-5 h-5 m-auto fill-white/60 group-hover:fill-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
            <div
              className={`${
                attachments.length > 1 ? "w-28 h-28" : "w-56 h-56"
              } rounded-2xl overflow-hidden`}
            >
              <Image
                loader={() => attachment}
                src={attachment}
                layout="fill"
                alt="Attachment"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </li>
        )
      })}
    </ul>
  )
}
