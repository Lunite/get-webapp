import React, { useEffect } from "react"

interface VectorProps {
  src: string
}

export const Vector = ({ src }: VectorProps) => {
  let SVG

  useEffect(() => {
    ;(async () => {
      await import(`../../../images/${src}`)
        .then(svg => {
          SVG = svg.ReactComponent
        })
        .catch(e => {})
    })()
  }, [])

  return <SVG />
}
