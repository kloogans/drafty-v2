import { useEffect } from "react"
import { DraftSecionTextBoxProps } from "./types"
import { MAX_CHARACTERS } from "./utils"
const DraftSectionTextBox: React.FC<DraftSecionTextBoxProps> = ({
  index,
  value,
  lastIndex,
  focused,
  handleChange,
  handleFocus,
  highlighted,
  radius = "rounded-2xl"
}) => {
  useEffect(() => {
    handleFocus()
  }, [])

  const focusedStyle = `min-h-[16.5rem] !bg-indigo-900 focus:!bg-indigo-800 pb-[56px] !text-white !border-white !border-solid`
  const highlightedStyle = `!border-rose-400 !border-solid`

  return (
    <>
      <textarea
        className={`w-full text-2xl border-2 border-white/30 border-dashed p-4 outline-none ${radius} flex resize-none transition duration-200 ease-in-out ${
          focused ? focusedStyle : "min-h-[10rem] text-gray-500 bg-indigo-900"
        } ${highlighted ? highlightedStyle : ""}`}
        style={{ transitionProperty: "all" }}
        value={value}
        onFocus={() => handleFocus()}
        onChange={(e) => {
          if (e.target.value.length <= MAX_CHARACTERS) {
            if (e.target.value.length === MAX_CHARACTERS) {
              if (index !== lastIndex) {
                return
              }
            }
            handleChange(e.target.value)
          }
        }}
      />
    </>
  )
}

export default DraftSectionTextBox
