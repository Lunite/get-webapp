import React, { FunctionComponent } from "react"

import "./styles.scss"
import Animate from "~/components/olc-framework/Animate"

const TickList: FunctionComponent<any> = ({ nolines, blueticks, children }) => {
  return (
    <ul
      className={`tick-list ${nolines ? "tick-list--no-lines" : ""} ${
        blueticks ? "tick-list--blue-ticks" : ""
      }`}
    >
      {React.Children.toArray(children).map((child, cIndex) => (
        <Animate
          properties={["opacity", "transform"]}
          startValues={["0", "translateY(40px) rotate(0.5deg)"]}
          endValues={["1", "translateY(0) rotate(0deg)"]}
          delay={`${cIndex / 4}s`}
        >
          {React.cloneElement(child)}
        </Animate>
      ))}
    </ul>
  )
}

export default TickList
