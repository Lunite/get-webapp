import React, { FunctionComponent } from "react"
import Col5 from "~/components/grid/Col5"
import Col7 from "~/components/grid/Col7"
interface FeatureBlockProps {
  image: JSX.Element
}

const FeatureBlock: FunctionComponent<FeatureBlockProps> = ({
  image,
  children,
}) => {
  return (
    <div className="feature-block">
      <div className="container">
        <div className="row">
          <Col5 className="feature-block__content">{children}</Col5>
          <Col7 className="feature-block__image">{image}</Col7>
        </div>
      </div>
    </div>
  )
}

export default FeatureBlock
