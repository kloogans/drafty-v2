import { useState, useMemo } from "react"

interface LogoIconProps {
  className: string
  animated?: boolean
}

const ALL_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!?"
const COLORS = ["#C7D1FE"]

const LogoDebris = () => {
  const [lettersInUse, setLettersInUse] = useState<string[]>([])

  const getRandomLetter = () => {
    return ALL_LETTERS[Math.floor(Math.random() * ALL_LETTERS.length)]
  }

  const initializeLetters = () => {
    const lettersToUse = []
    for (let i = 0; i < 5; i++) {
      lettersToUse.push(getRandomLetter())
    }
    setLettersInUse(lettersToUse)
  }

  useMemo(() => {
    initializeLetters()
  }, [])

  const lettersContainer = document.querySelector("#lettersContainer")
  const lettersElement = lettersContainer?.querySelectorAll("div")

  if (lettersElement) {
    lettersInUse.map((letter, index) => {
      if (lettersElement?.length >= 5) {
        lettersContainer?.removeChild(lettersElement?.[0])
      }
      const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)]
      const node = document.createElement("span")
      node.style.left = Math.random() * 100 + "%"
      node.style.animationDuration = Math.floor(Math.random() * 4 + 2) + "s"
      node.style.animationDelay = index + "s"
      node.style.color = randomColor
      const isReversed = Math.random() > 0.5
      const isInFront = Math.random() > 0.5
      node.classList.add(
        isReversed ? "logo-debris-animation" : "logo-debris-animation-reverse",
        isInFront ? "z-20" : "z-0",
        "absolute",
        "title-font",
        "bottom-0",
        "opacity-0"
      )
      node.innerText = letter
      lettersContainer?.appendChild(node)
    })
  }

  return (
    <div
      id="lettersContainer"
      className="flex items-center justify-between gap-4 relative w-full max-w-sm absolute top-1"
    ></div>
  )
}

const LogoIcon: React.FC<LogoIconProps> = ({
  className = "",
  animated = false
}) => {
  return (
    <div className="relative w-full max-w-[6rem] flex flex-col items-center justify-center">
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        className={`${className} z-10`}
        viewBox="0 0 125 85.712"
        enableBackground="new 0 0 125 95.712"
        xmlSpace="preserve"
      >
        <path
          style={{ animationDelay: "1s" }}
          className={`fill-indigo-200 ${animated ? "logo-animated" : ""}`}
          d="M95.238,9.523H4.763C2.134,9.523,0,7.389,0,4.763C0,2.134,2.134,0,4.763,0h90.475
	C97.868,0,100,2.134,100,4.763C100,7.389,97.868,9.523,95.238,9.523z"
        ></path>
        <path
          style={{ animationDelay: "750ms" }}
          className={`fill-indigo-200 ${animated ? "logo-animated" : ""}`}
          d="M9.525,19.048h71.428c2.628,0,4.763,2.133,4.763,4.762s-2.135,4.76-4.763,4.76H9.525
	c-2.629,0-4.762-2.134-4.762-4.76C4.763,21.179,6.896,19.048,9.525,19.048z"
        ></path>
        <path
          style={{ animationDelay: "500ms" }}
          className={`fill-indigo-200 ${animated ? "logo-animated" : ""}`}
          d="M38.095,38.095h52.382c2.628,0,4.761,2.133,4.761,4.76c0,2.627-2.133,4.762-4.761,4.762H38.095
	c-2.629,0-4.76-2.135-4.76-4.762C33.335,40.229,35.466,38.095,38.095,38.095z"
        ></path>
        <path
          style={{ animationDelay: "250ms" }}
          className={`fill-indigo-200 ${animated ? "logo-animated" : ""}`}
          d="M42.857,76.19h14.285c2.631,0,4.763,2.133,4.763,4.761c0,2.627-2.132,4.762-4.763,4.762H42.857
	c-2.629,0-4.762-2.135-4.762-4.762C38.095,78.323,40.229,76.19,42.857,76.19z"
        ></path>
        <path
          style={{ animationDelay: "0" }}
          className={`fill-indigo-200 ${animated ? "logo-animated" : ""}`}
          d="M45.239,61.903c0-2.63,2.133-4.76,4.762-4.76h33.333c2.628,0,4.763,2.135,4.763,4.76
	c0,2.63-2.135,4.763-4.763,4.763H50.001C47.372,66.666,45.239,64.533,45.239,61.903z"
        ></path>
      </svg>
      <LogoDebris />
    </div>
  )
}

export default LogoIcon
