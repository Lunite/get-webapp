import React, { FunctionComponent } from "react"

import "./styles.scss"

const TickList: FunctionComponent<any> = ({ nolines = false, children }) => {
  return (
    <ul className={`tick-list ${nolines ? "tick-list--no-lines" : ""}`}>
      {children}
    </ul>
  )
}

export default TickList
