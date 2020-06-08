import React from "react"

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
