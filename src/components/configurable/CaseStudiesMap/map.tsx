import React, { useRef } from "react"
import { backgroundBase64 } from "./mapData.json"

import "./mapstyles.scss"
import { Dot, WithStore } from "pure-react-carousel"

interface MapProps {
  dots: {
    node: any
    mapDot: { alias: string; x: number; y: number }
    index: number
  }[]
  currentSlide: number
}

const Map = ({ dots }) => {
  return (
    <svg
      className="map"
      width="501"
      height="736"
      viewBox="0 0 501 736"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <image
        className="map__image"
        width="501"
        height="736"
        href={backgroundBase64}
      />

      <g className="map__dots">
        {dots.map(({ mapDot, index }) => {
          const dotButtonRef = useRef(null)

          return (
            <>
              <Dot slide={index} ref={dotButtonRef}>
                <span />
              </Dot>
              <g
                className={`dot dot--${mapDot.alias}`}
                onClick={() => {
                  dotButtonRef.current.click()
                }}
              >
                <circle
                  className="dot__outer"
                  cx={mapDot.x}
                  cy={mapDot.y}
                  r="6.94231"
                  fillOpacity="0.5"
                />

                <circle
                  className="dot__middle"
                  cx={mapDot.x}
                  cy={mapDot.y}
                  r="6.94231"
                  fillOpacity="0.5"
                />

                <circle
                  cx={mapDot.x}
                  cy={mapDot.y}
                  r="6.94231"
                  className="dot__inner"
                />
              </g>
            </>
          )
        })}
      </g>
    </svg>
  )
}

export default Map
