import React, { FunctionComponent } from "react"

import "./styles.scss"

const Section: FunctionComponent<any> = ({ children }) => {
  return (
    <div className="section">
      <div className="container container--column">{children}</div>
    </div>
  )
}

export default Section
