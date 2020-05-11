import React, { useEffect } from "react"

const Vector = props => {
  let SVG

  useEffect(() => {
    ;(async () => {
      await import(`~/vectors/${props.src}.inline.svg`)
        .then(svg => {
          debugger
          SVG = svg.ReactComponent
        })
        .catch(e => {
          console.log(e)
        })
    })()
  }, [])

  return <>{SVG && <SVG {...props} />}</>
}

export default Vector
