import React, { useEffect } from "react"

const Vector = props => {
  let SVG

  useEffect(() => {
    ;(async () => {
      await import(`~/vectors/${props.src}.inline.svg`)
        .then(svg => {
          SVG = svg.ReactComponent
        })
        .catch(e => {})
    })()
  }, [])

  return <>{SVG && <SVG {...props} />}</>
}

export default Vector
