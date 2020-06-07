import React, { FunctionComponent } from "react"

import "./styles.scss"
import Animate from "~/components/olc-framework/Animate"

const Section: FunctionComponent<any> = ({ className = "", children }) => {
  return (
    <Animate
      properties={["opacity", "transform"]}
      startValues={["0", "translateY(40px) rotate(0.5deg)"]}
      endValues={["1", "translateY(0) rotate(0deg)"]}
    >
      <div className={`section ${className}`}>
        <div className="container container--column">{children}</div>
      </div>
    </Animate>
  )
}

export default Section
