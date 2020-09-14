import "./styles.scss"
import React, { useState, useRef, useEffect, useMemo } from "react"
import Heading from "../Heading"

interface SlideInputProps {
  title: React.ReactNode
  subtitle?: React.ReactNode
  min: number
  max: number
  inputAdornments?: {
    start?: React.ReactNode
    end?: React.ReactNode
  }
  type?: string
  value: number
  average: number
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const SlideInput: React.FC<SlideInputProps> = props => {
  const [width, setWidth] = useState<number>(0)
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth)
    }
  }, [ref])

  const position = (props.value - props.min) / (props.max - props.min) // position along the slider

  return (
    <div className="slide-container">
      <div className="slider-head">
        <Heading level={3}>{props.title}</Heading>
        {props.subtitle && (
          <div className="slide-subtitle">{props.subtitle}</div>
        )}
      </div>

      <div className="range-slider">
        <span
          className="rs-label"
          style={{ left: `${position * width - 19 * position}px` }}
        >
          {props.type === "money" ? (
            <>
              {props.value > 99 ? (
                <>£{props.value / 100}</>
              ) : (
                <>{props.value}p</>
              )}
            </>
          ) : (
            <>
              {props?.inputAdornments.start}
              {props.value}
              {props?.inputAdornments.end}
            </>
          )}
        </span>
        <input
          className="rs-range"
          type="range"
          ref={ref}
          value={props.value}
          style={{
            background: `linear-gradient(to right, #70b33b 0%, #70b33b ${
              ((props.value - props.min) / (props.max - props.min)) * 100
            }%, #051c3f ${
              ((props.value - props.min) / (props.max - props.min)) * 100
            }%, #051c3f 0%)`,
          }}
          onChange={props.onChange}
          min={props.min}
          max={props.max}
        />
      </div>
      <div className="range-lines" />
      <div className="box-minmax">
        <span>
          {props.type === "money" ? (
            <>
              {props.min > 99 ? (
                <>£{props.min / 100}</>
              ) : (
                <>
                  {props.min}
                  <>p</>
                </>
              )}
            </>
          ) : (
            <>
              {props?.inputAdornments.start}
              {props.min}
              {props?.inputAdornments.end}
            </>
          )}
        </span>
        <span className="spacer" />
        <span>
          {props.type === "money" ? (
            <>{props.max > 99 ? <>£{props.max / 100}</> : <>{props.max}p</>}</>
          ) : (
            <>
              {props?.inputAdornments.start}
              {props.max}
              {props?.inputAdornments.end}
            </>
          )}
        </span>
      </div>
    </div>
  )
}

export default SlideInput
