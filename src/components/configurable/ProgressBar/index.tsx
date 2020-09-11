import { CSSProperties, useState, useEffect, useRef } from "react"

interface ProgressBarProps {
  color: string
  duration: number // duration to complete in ms
}

const ProgressBar: React.FC<ProgressBarProps> = props => {
  const [completed, setCompleted] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    const intervalDuration = props.duration / 100
    intervalRef.current = setInterval(() => {
      setCompleted(completed + 1)
    }, intervalDuration)
    return () => clearInterval(intervalRef.current)
  })

  const containerStyles: CSSProperties = {
    height: 30,
    width: "100%",
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: 50,
  }

  const fillerStyles: CSSProperties = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: props.color,
    borderRadius: "inherit",
    textAlign: completed >= 10 ? "center" : "right",
    transition: "width 1s ease-in-out",
  }

  const labelStyles: CSSProperties = {
    padding: 5,
    color: "white",
    fontWeight: 400,
  }

  useEffect(() => {
    if (completed >= 101) {
      window.clearInterval(intervalRef.current)
    }
  }, [completed])

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${
          Math.floor(completed) >= 100
            ? "Please Wait..."
            : Math.floor(completed)
        }%`}</span>
      </div>
    </div>
  )
}

export default ProgressBar
