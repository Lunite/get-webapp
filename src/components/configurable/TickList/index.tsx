import React, { FunctionComponent } from "react"

const TickList: FunctionComponent<any> = ({ nolines, blueticks, children }) => {
  return (
    <ul
      className={`tick-list ${nolines ? "tick-list--no-lines" : ""} ${
        blueticks ? "tick-list--blue-ticks" : ""
      }`}
    >
      {children}
    </ul>
  )
}

export default TickList
