import React, { FunctionComponent } from "react"

import "./styles.scss"

const Section: FunctionComponent<any> = ({ className = "", children }) => {
  return (
    <div className={`section ${className}`}>
      <div className="container container--column">{children}</div>
    </div>
  )
}

export default Section
