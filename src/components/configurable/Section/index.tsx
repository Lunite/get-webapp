import React, { FunctionComponent } from "react"

import "./styles.scss"
import Animate from "~/components/olc-framework/Animate"

const Section: FunctionComponent<any> = ({ className = "", children }) => {
  return (
    <Animate>
      <div className={`section ${className}`}>
        <div className="container container--column">{children}</div>
      </div>
    </Animate>
  )
}

export default Section
