import React from "react"
import { backgroundBase64 } from "./data.json"

import "./styles.scss"

interface MapProps {
  dots: { alias: string; x: number; y: number }[]
  onSelect?: Function
  activeDot?: string
}

const Map: React.FC<MapProps> = ({ dots, onSelect, activeDot }) => {
  console.log(dots)

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
        {dots.map(dot => (
          <circle
            cx={dot.x}
            cy={dot.y}
            r="6.94231"
            className={`dot dot--${dot.alias} ${
              activeDot === dot.alias ? "dot--active" : ""
            }`}
            onClick={() => {
              onSelect(dot.alias)
            }}
          />
        ))}
      </g>
    </svg>
  )
}

export default Map
