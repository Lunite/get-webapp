import "./styles.scss"
import React, { useState, useRef, useEffect, useMemo } from "react"
import Heading from "../Heading"
import Col9 from "../../grid/Col9"
import BlockCTA from "../BlockCTA"
import Animate from "../../olc-framework/Animate"

interface SlideInputProps {
  title: string
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
      <Heading level={3}>{props.title}</Heading>
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
          onChange={props.onChange}
          min={props.min}
          max={props.max}
        />
      </div>
      <div className="box-minmax">
        <span>
          {props.type === "money" ? (
            <>{props.min > 99 ? <>£{props.min / 100}</> : <>{props.min}p</>}</>
          ) : (
            <>
              {props?.inputAdornments.start}
              {props.min}
              {props?.inputAdornments.end}
            </>
          )}
        </span>
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
      {/* <button
        onClick={() => {
          // @ts-ignore
          props.onChange({ target: { value: props.average.toString() } })
        }}
        type="submit"
        className="btn-unsure"
      >
        I Don't Know
      </button> */}
    </div>
  )
}

export default SlideInput
