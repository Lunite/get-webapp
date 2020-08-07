import React, { useRef, useEffect } from "react"
import { Map, GoogleApiWrapper } from "google-maps-react"
import "./arrowMapStyles.scss"

interface InteractiveMapProps {
  google: any
  location: {
    lat: number
    lng: number
  }
}

const InteractiveMap: React.FC<InteractiveMapProps> = props => {
  const mapOptions = {
    mapTypeControl: false,
    center: props.location,
    mapTypeId: "satellite",
    disableDefaultUI: true,
    gestureHandling: "none",
  }

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const drawArrow = (
    ctx: CanvasRenderingContext2D,
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    r: number
  ) => {
    let x_center = x1
    let y_center = y1

    let angle: number
    let x: number
    let y: number

    ctx.beginPath()

    angle = Math.atan2(y1 - y0, x1 - x0)
    x = r * Math.cos(angle) + x_center
    y = r * Math.sin(angle) + y_center

    ctx.moveTo(x, y)

    angle += (1 / 3) * (2 * Math.PI)
    x = r * Math.cos(angle) + x_center
    y = r * Math.sin(angle) + y_center

    ctx.lineTo(x, y)

    angle += (1 / 3) * (2 * Math.PI)
    x = r * Math.cos(angle) + x_center
    y = r * Math.sin(angle) + y_center

    ctx.lineTo(x, y)

    ctx.closePath()

    ctx.fill()
  }

  useEffect(() => {
    // Draws initial arrow at 0 degrees on canvas
    if (canvasRef) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      const center = { x: canvas.width / 2, y: canvas.height / 2 }
      ctx.fillStyle = "#3c96c5"
      ctx.lineWidth = 10
      ctx.strokeStyle = "#3c96c5"
      ctx.lineJoin = "bevel"

      drawArrow(
        ctx,
        center.x,
        center.y,
        center.x + canvas.width / 4,
        center.y + canvas.height / 4,
        5
      )
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
})(InteractiveMap)
