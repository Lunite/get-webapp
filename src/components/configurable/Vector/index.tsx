import React, { useEffect } from "react"

interface VectorProps {
  src: string
}

export const Vector = ({ src }: VectorProps) => {
  let SVG

  useEffect(() => {
    ;(async () => {
      await import(`src/images/${src}`)
        .then(svg => {
          SVG = svg.ReactComponent
        })
        .catch(e => {})
    })()
  }, [])

  return <SVG />
}
