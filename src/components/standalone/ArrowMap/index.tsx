import React, { useRef, useEffect, useState } from "react"
import { Map, GoogleApiWrapper } from "google-maps-react"
import "./styles.scss"
import Arrow from "./Arrow"

interface ArrowMapProps {
  google: any
  location: {
    lat: number
    lng: number
  }
  setAzimuth: (value: number) => void
}

// Throttles function invocation to once every delay
const throttle = (callback: Function, delay: number) => {
  let previousCall = new Date().getTime()
  return (...args) => {
    const time = new Date().getTime()

    if (time - previousCall >= delay) {
      previousCall = time
      callback(...args)
    }
  }
}

const ArrowMap: React.FC<ArrowMapProps> = props => {
  const mapOptions = {
    mapTypeControl: false,
    center: props.location,
    mapTypeId: "satellite",
    disableDefaultUI: true,
    gestureHandling: "none",
  }

  // State Hooks
  const [angle, setAngle] = useState(0) // for mobile
  const [mouseState, _setMouseState] = useState<{
    x: number
    y: number
    down: boolean
  }>({
    x: 0,
    y: 0,
    down: false,
  })
  const setMouseState = (state: { x: number; y: number; down: boolean }) => {
    mouseDown.current = state.down
    _setMouseState(state)
  }

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseDown = useRef(mouseState.down)

  useEffect(() => {
    // change arrow pos when angle changes
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const center = { x: canvas.width / 2, y: canvas.height / 2 }
      const r = canvas.height / 3.4
      let theta = angle
      theta = -theta + Math.PI
      props.setAzimuth(theta * (180 / Math.PI) - 180)
      drawArrowFromAngle(center.x, center.y, r, theta - Math.PI / 2)
    }
  }, [angle])

  useEffect(() => {
    setTimeout(() => {
      setAngle(1)
    }, 10)
  }, [])

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const center = { x: canvas.width / 2, y: canvas.height / 2 }
      const clientCenter = {
        x: canvas.clientWidth / 2,
        y: canvas.clientHeight / 2,
      }
      const r = canvas.height / 3.4
      let theta = Math.atan2(
        mouseState.x - clientCenter.x,
        mouseState.y - clientCenter.y
      )
      theta = -theta + Math.PI
      // console.log("angle is", theta * (180 / Math.PI) - 180)
      props.setAzimuth(theta * (180 / Math.PI) - 180)
      drawArrowFromAngle(center.x, center.y, r, theta - Math.PI / 2)
    }
  }, [mouseState.x, mouseState.y])

  // Event Handler Functions
  const onMouseDown = (e: MouseEvent) => {
    setMouseState({ x: e.offsetX, y: e.offsetY, down: true })
  }

  const onMouseUp = (e: MouseEvent) => {
    setMouseState({ x: e.offsetX, y: e.offsetY, down: false })
  }

  const onMouseMove = (e: MouseEvent) => {
    if (!mouseDown.current) {
      return
    }
    setMouseState({ x: e.offsetX, y: e.offsetY, down: true }) // use useEffect for callback from this, adjust arrow position apropriately
  }

  // Canvas update functions

  const drawArrowFromAngle = (
    x: number,
    y: number,
    r: number,
    theta: number,
    aWidth = 35,
    aLength = 100
  ) => {
    const ctx = canvasRef.current.getContext("2d")

    ctx.fillStyle = "#152038"
    ctx.lineJoin = "miter"

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    ctx.translate(x, y)
    ctx.rotate(theta)
    ctx.beginPath()
    ctx.arc(0, 0, 5, 0, 2 * Math.PI)
    ctx.fill()
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.moveTo(r, 0)
    ctx.moveTo(r - aLength, -aWidth)
    ctx.lineTo(r, 0)
    ctx.lineTo(r - aLength, aWidth)
    ctx.lineTo(r - aLength / 1.5, 0)
    ctx.fillStyle = "#3c96c5"
    ctx.fill()
    ctx.setTransform(1, 0, 0, 1, 0, 0)
  }

  useEffect(() => {
    // Configures canvasRef event listeners
    if (canvasRef) {
      const canvas = canvasRef.current
      canvas.addEventListener("mousedown", onMouseDown, false)
      canvas.addEventListener("mousemove", throttle(onMouseMove, 5), false)
      canvas.addEventListener("mouseup", onMouseUp, false)
    }
  }, [canvasRef])

  return (
    <>
      <div
        className="map-container"
        style={{ height: "min(550px, 100vw)", width: "100%" }}
      >
        <Map
          google={props.google}
          initialCenter={props.location}
          // @ts-ignore
          zoom={20}
          onReady={(mapProps, map) => {
            map.setOptions(mapOptions)
          }}
          containerStyle={{
            position: "relative",
            gridColumn: "1",
            gridRow: "1",
            height: "min(550px, 100vw)",
            width: "100%",
          }}
        />
        <Arrow angle={angle} className="arrowsvg" />
        <canvas
          className="map-overlay"
          ref={canvasRef}
          style={{ height: "min(550px, 100%)", width: "100%" }}
          height={canvasRef?.current?.clientHeight}
          width={canvasRef?.current?.clientWidth}
        />
      </div>
      <div className="slide-container show-mob">
        <div className="range-slider am-range-slider">
          <input
            className="rs-range am-rs-range"
            step={0.001}
            type="range"
            value={angle}
            onChange={e => {
              setAngle(Number(e.target.value))
            }}
            min={-Math.PI}
            max={Math.PI}
          />
        </div>
        <div className="box-minmax show-mob am-box-minmax">
          <span>-180&#176;</span>
          <span>180&#176;</span>
        </div>
      </div>
    </>
  )
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCIxU03Aoq29qJ5-KQT9F_v763fpJf0B3c",
  version: "3",
})(ArrowMap)
