import React, { FunctionComponent } from "react"
import Col5 from "~/components/grid/Col5"
import Col7 from "~/components/grid/Col7"

interface ShoutoutProps {
  text: JSX.Element
  image: JSX.Element
  rtl?: boolean
}

const Shoutout: FunctionComponent<ShoutoutProps> = ({
  text,
  image,
  rtl = false,
}) => {
  const textBlock = (
    <Col5>
      <div className="shoutout__text">{text}</div>
    </Col5>
  )
  const imageBlock = <Col7>{image}</Col7>

  return (
    <div className="shoutout">
      <div className="container">
        <div className="row">
          {!rtl && (
            <>
              {textBlock}
              {imageBlock}
            </>
          )}
          {rtl && (
            <>
              {imageBlock}
              {textBlock}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Shoutout
