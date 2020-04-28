import React, { FunctionComponent } from "react"

interface FeatureBlockProps {
  image: JSX.Element
}

export const FeatureBlock: FunctionComponent<FeatureBlockProps> = ({
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
