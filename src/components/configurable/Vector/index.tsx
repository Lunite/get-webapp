import React, { useEffect, FunctionComponent } from "react"

interface VectorProps {
  src: string
}

const Vector: FunctionComponent<VectorProps> = ({ src }) => {
  let SVG

  useEffect(() => {
    ;(async () => {
      await import(`~/vectors/${src}`)
        .then(svg => {
          debugger
          SVG = svg.ReactComponent
        })
        .catch(e => {})
    })()
  }, [])

  return <>{SVG && <SVG />}</>
}

export default Vector
