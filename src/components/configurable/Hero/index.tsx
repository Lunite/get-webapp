import React, { FunctionComponent } from "react"

import "./styles.scss"

interface HeroProps {
  image: string
  compact?: boolean
  overlapBlock?: JSX.Element
  className?: string
}

const Hero: FunctionComponent<HeroProps> = ({
  image,
  compact,
  overlapBlock,
  children,
  className,
}) => {
  return (
    <div
      className={`hero hero--${compact ? "compact" : "large"} ${
        overlapBlock ? "hero--has-overlap" : ""
      } ${className}`}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="container u-layout--indent">{children}</div>

      {overlapBlock && (
        <div className="hero-overlap-block__container container">
          <div className="hero-overlap-block">{overlapBlock}</div>
        </div>
      )}
    </div>
  )
}

export default Hero
