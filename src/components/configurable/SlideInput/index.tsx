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
  value: number
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  key: string
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
    <div className="slide-container" id={props.key} key={props.key}>
      <Heading level={3}>{props.title}</Heading>
      <div className="range-slider">
        <span
          className="rs-label"
          style={{ left: `${position * width - 19 * position}px` }}
        >
          {props?.inputAdornments.start}
          {props.value}
          {props?.inputAdornments.end}
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
          {props?.inputAdornments.start}
          {props.min}
          {props?.inputAdornments.end}
        </span>
        <span>
          {props?.inputAdornments.start}
          {props.max}
          {props?.inputAdornments.end}
        </span>
      </div>
    </div>
  )
}

export default SlideInput
