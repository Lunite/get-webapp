import React from "react"

import "./styles.scss"

const Grid = ({ className = "", autoHeight = false, children }) => {
  return (
    <ul
      className={`grid ${className} ${autoHeight ? "grid--auto-height" : ""}`}
    >
      {children}
    </ul>
  )
}

export default Grid
