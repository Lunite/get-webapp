import React, { FunctionComponent } from "react"

import "./styles.scss"
import Animate from "../Animate"

interface BlockProps {
  className?: string
  highlightColour?: "blue" | "green"
  style?: object
}

const Block: FunctionComponent<BlockProps> = ({
  className,
  highlightColour,
  style,
  children,
}) => {
  return (
    <Animate>
      <div
        className={`block${
          highlightColour ? ` block--${highlightColour}` : ""
        } ${className}`}
        style={style}
      >
        {children}
      </div>
    </Animate>
  )
}

export default Block
