import React from "react"
import { HeadingProps } from "./types"

const PrimaryHeading: React.FC<HeadingProps> = ({ children, className }) => {
  return (
    <h1 className={`text-lg md:text-xl text-indigo-300 ${className || ""}`}>
      {children}
    </h1>
  )
}

export default PrimaryHeading
