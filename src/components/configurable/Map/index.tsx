import React from "react"
import { backgroundBase64 } from "./data.json"

import "./styles.scss"
import { Dot } from "pure-react-carousel"

interface MapProps {
  dots: {
    node: any
    mapDot: { alias: string; x: number; y: number }
    index: number
  }[]
  currentSlide: number
}

const Map: React.FC<MapProps> = ({ dots, currentSlide }) => {
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
        {dots.map(({ mapDot, index }) => (
          <Dot slide={index}>
            <g
              className={`dot dot--${mapDot.alias} ${
                currentSlide === index ? "dot--active" : ""
              }`}
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
          </Dot>
        ))}
      </g>
    </svg>
  )
}

export default Map
