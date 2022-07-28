import React from "react"
import { HeadingProps } from "./types"

const PrimaryHeading: React.FC<HeadingProps> = ({ children, className }) => {
  return <h1 className={`text-xl text-white ${className || ""}`}>{children}</h1>
}

export default PrimaryHeading
