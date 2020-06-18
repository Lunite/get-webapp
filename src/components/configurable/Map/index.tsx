import React from "react"
import { backgroundBase64 } from "./data.json"

interface MapProps {
  dots: string[]
  onSelect: Function
  activeDot: string
}

const Map = ({ dots, onSelect, activeDot }) => {
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
        <circle
          onClick={() => {
            onSelect("nLondon")
          }}
          className={`dot dot--nLondon ${
            activeDot === "nLondon" ? "dot-item--active" : ""
          }`}
          cx="412.515"
          cy="562.83"
          r="6.94231"
          fill="#051C3F"
        />

        <circle
          onClick={() => {
            onSelect("sMidlands")
          }}
          className={`dot dot--sMidlands ${
            activeDot === "sMidlands" ? "dot-item--active" : ""
          }`}
          cx="377.803"
          cy="489.936"
          r="6.94231"
          fill="#051C3F"
        />

        <circle
          className="dot dot--nMidlands"
          cx="348.298"
          cy="471.712"
          r="6.94231"
          fill="#051C3F"
        />

        <circle
          className="dot dot--neEngland"
          cx="380.407"
          cy="388.405"
          r="6.94231"
          fill="#051C3F"
        />

        <circle
          className="dot dot--seEngland"
          cx="478.467"
          cy="603.617"
          r="6.94231"
          fill="#051C3F"
        />

        <circle
          className="dot dot--eEngland"
          cx="485.409"
          cy="518.573"
          r="6.94231"
          fill="#051C3F"
        />

        <circle
          className="dot dot--wLondon"
          cx="389.084"
          cy="580.186"
          r="6.94231"
          fill="#051C3F"
        />

        <circle
          className="dot dot--devon"
          cx="260.651"
          cy="610.559"
          r="6.94231"
          fill="#051C3F"
        />

        <circle
          className="dot dot--cornwall"
          cx="246.767"
          cy="653.08"
          r="6.94231"
          fill="#051C3F"
        />

        <circle
          className="dot dot--seScotland"
          cx="330.943"
          cy="299.022"
          r="6.94231"
          fill="#051C3F"
        />

        <circle
          className="dot dot--seIreland"
          cx="147.839"
          cy="499.482"
          r="6.94231"
          fill="#051C3F"
        />

        <circle
          className="dot dot--swIreland"
          cx="59.3246"
          cy="528.119"
          r="6.94231"
          fill="#051C3F"
        />

        <circle
          className="dot dot--sLondon"
          cx="415.986"
          cy="589.732"
          r="6.94231"
          fill="#051C3F"
        />
        <circle
          className="dot dot--hScotland"
          cx="217.263"
          cy="180.135"
          r="6.94231"
          fill="#051C3F"
        />
        <circle
          className="dot dot--nWales"
          cx="287.553"
          cy="482.994"
          r="6.94231"
          fill="#051C3F"
        />
      </g>
    </svg>
  )
}
