import React, { useRef, useEffect, useState } from "react"
import { Map, GoogleApiWrapper } from "google-maps-react"
import "./styles.scss"

interface ArrowMapProps {
  google: any
  location: {
    lat: number
    lng: number
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
  const [mouseDown, setMouseDown] = useState<boolean>(false)
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })
  const [azimuth, setAzimuth] = useState<number>(0)

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Event Handler Functions
  const onMouseDown = (e: MouseEvent) => {
    setMousePosition({ x: e.offsetX, y: e.offsetY })
    setMouseDown(true)
  }

  const onMouseUp = (e: MouseEvent) => {
    setMousePosition({ x: e.offsetX, y: e.offsetY })
    setMouseDown(false)
  }

  const onMouseMove = (e: MouseEvent) => {
    if (mouseDown) {
      setMousePosition({ x: e.offsetX, y: e.offsetY }) // use useEffect for callback from this, adjust arrow position apropriately
    }
  }

  // Canvas update functions

  const drawArrowFromAngle = (
    x: number,
    y: number,
    r: number,
    theta: number,
    aWidth: number,
    aLength: number
  ) => {
    const ctx = canvasRef.current.getContext("2d")

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    ctx.translate(x, y)
    ctx.rotate(theta - Math.PI / 2)
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(r, 0)
    ctx.moveTo(r - aLength, -aWidth)
    ctx.lineTo(r, 0)
    ctx.lineTo(r - aLength, aWidth)

    ctx.fillStyle = "#3c96c5"
    ctx.lineWidth = 5
    ctx.strokeStyle = "#3c96c5"
    ctx.lineJoin = "miter"

    ctx.stroke()
    ctx.setTransform(1, 0, 0, 1, 0, 0)
  }

  const drawArrow = (
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    aWidth: number,
    aLength: number
  ) => {
    var dx = x1 - x0
    var dy = y1 - y0
    var angle = Math.atan2(dy, dx)
    var length = Math.sqrt(dx * dx + dy * dy)

    const ctx = canvasRef.current.getContext("2d")

    //
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

    //
    ctx.translate(x0, y0)
    ctx.rotate(angle)
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(length, 0)
    ctx.moveTo(length - aLength, -aWidth)
    ctx.lineTo(length, 0)
    ctx.lineTo(length - aLength, aWidth)

    //
    ctx.fillStyle = "#3c96c5"
    ctx.lineWidth = 5
    ctx.strokeStyle = "#3c96c5"
    ctx.lineJoin = "miter"

    //
    ctx.stroke()
    ctx.setTransform(1, 0, 0, 1, 0, 0)
  }

  // // Throttles function invocation to once every delay
  // const throttle = (callback: CallableFunction, delay: number) => {
  //   let previousCall = new Date().getTime()
  //   return () => {
  //     const time = new Date().getTime()

  //     if (time - previousCall >= delay) {
  //       previousCall = time
  //       callback(...callback.arguments)
  //     }
  //   }
  // }

  useEffect(() => {
    // Configures canvasRef event listeners
    if (canvasRef) {
      const canvas = canvasRef.current
      canvas.addEventListener("mousedown", onMouseDown, false)
      canvas.addEventListener("mouseup", onMouseUp, false)
      canvas.addEventListener("mousemove", onMouseMove, false)
      canvas.addEventListener("touchstart", onMouseDown, false)
      canvas.addEventListener("touchend", onMouseUp, false)
      canvas.addEventListener("touchmove", onMouseMove, false)

      // Draws initial arrow at 0 degrees on canvas
      const center = { x: canvas.width / 2, y: canvas.height / 2 }
      drawArrowFromAngle(center.x, center.y, canvas.height / 3, 0, 10, 10)
    }
  }, [canvasRef])

  return (
    <div className="map-container">
      <Map
        google={props.google}
        initialCenter={props.location}
        // @ts-ignore
        zoom={22}
        onReady={(mapProps, map) => {
          map.setOptions(mapOptions)
        }}
        containerStyle={{
          position: "relative",
          gridColumn: "1",
          gridRow: "1",
          height: "550px",
          width: "100%",
        }}
      />
      <canvas className="map-overlay" ref={canvasRef} />
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCIxU03Aoq29qJ5-KQT9F_v763fpJf0B3c",
})(ArrowMap)
