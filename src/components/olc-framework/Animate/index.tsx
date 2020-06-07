import React, { useState, FunctionComponent } from "react"
import VizSensor from "react-visibility-sensor"

import "./styles.scss"

interface AnimateProps {
  properties: string[]
  startValues: string[]
  endValues: string[]
  delay?: string
}

const Animate: FunctionComponent<AnimateProps> = ({
  properties,
  startValues,
  endValues,
  children,
  delay = "0.25s",
}) => {
  const uID = Math.round(Math.random() * 100000)

  const [visible, setVisible] = useState(false)

  const changeHandler = isVisible => {
    if (isVisible) {
      setVisible(true)
    }
  }

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: (() => `
            .animate--${uID} {
              ${properties.map((p, i) => `${p}: ${startValues[i]}`).join(";")}
            }
            .animate--${uID}.animate--end {
              ${properties.map((p, i) => `${p}: ${endValues[i]}`).join(";")}
            }
          `)(),
        }}
      />

      <VizSensor partialVisibility onChange={changeHandler}>
        <div
          className={`animate animate--${uID} ${visible ? "animate--end" : ""}`}
          style={{
            transitionDelay: delay,
            transitionProperty: properties.join(", "),
          }}
        >
          {children}
        </div>
      </VizSensor>
    </>
  )
}

export default Animate
