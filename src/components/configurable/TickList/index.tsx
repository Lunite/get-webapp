import React, { FunctionComponent } from "react"

import "./styles.scss"

const TickList: FunctionComponent = ({ children }) => {
  return <ul className="tick-list">{children}</ul>
}

export default TickList
