import React, { FunctionComponent, useEffect, useState } from "react"

import "./styles.scss"

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
  const [init, setInit] = useState(false)

  useEffect(() => {
    setInit(true)
  }, [])

  return (
    <div
      className={`block${init ? " block--init" : ""}${
        highlightColour ? ` block--${highlightColour}` : ""
      } ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}

export default Block
