import React, { useState } from "react"
import VizSensor from "react-visibility-sensor"

import "./styles.scss"

const Animate = ({ children, partialVisibility = true }) => {
  const [visible, setVisible] = useState(false)

  const changeHandler = isVisible => {
    if (isVisible) {
      setVisible(true)
    }
  }

  return (
    <VizSensor partialVisibility={partialVisibility} onChange={changeHandler}>
      <div className={`animate ${visible ? "animate--visible" : ""}`}>
        {children}
      </div>
    </VizSensor>
  )
}

export default Animate
