import React, { FunctionComponent } from "react"

interface BlockProps {
  className?: string
  highlightColour?: "blue" | "green"
}

export const Block: FunctionComponent<BlockProps> = ({
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
