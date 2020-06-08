import React, { FunctionComponent } from "react"

import Animate from "~/components/olc-framework/Animate"

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
    <Animate
      properties={["opacity", "transform"]}
      startValues={["0", "translateY(40px) rotate(0.5deg)"]}
      endValues={["1", "translateY(0) rotate(0deg)"]}
    >
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
