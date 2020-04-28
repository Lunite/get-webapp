import React, { FunctionComponent } from "react"

interface BlockProps {
  highlightColour?: "blue" | "green"
}

export const Block: FunctionComponent<BlockProps> = ({
  highlightColour,
  children,
}) => {
  return (
    <div
      className={`block ${highlightColour ? `block--${highlightColour}` : ""}`}
    >
      {children}
    </div>
  )
}
