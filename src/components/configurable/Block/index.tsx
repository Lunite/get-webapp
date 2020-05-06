import React, { FunctionComponent } from "react"

import "./styles.scss"

interface BlockProps {
  className?: string
  highlightColour?: "blue" | "green"
}

const Block: FunctionComponent<BlockProps> = ({
  className,
  highlightColour,
  children,
}) => {
  return (
    <div
      className={`block ${
        highlightColour ? `block--${highlightColour}` : ""
      } ${className}`}
    >
      {children}
    </div>
  )
}

export default Block
