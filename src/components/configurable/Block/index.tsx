import React, { FunctionComponent, useEffect, useState } from "react"

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
  const [init, setInit] = useState(false)

  useEffect(() => {
    setInit(true)
  }, [])

  return (
    <div
      className={`block${init ? " block--init" : ""}${
        highlightColour ? ` block--${highlightColour}` : ""
      } ${className}`}
    >
      {children}
    </div>
  )
}

export default Block
