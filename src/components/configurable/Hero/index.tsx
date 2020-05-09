import React, { FunctionComponent } from "react"

import "./styles.scss"

interface HeroProps {
  image: string
  compact?: boolean
  overlapBlock?: JSX.Element[]
}

const Hero: FunctionComponent<HeroProps> = ({
  image,
  compact,
  overlapBlock,
  children,
}) => {
  return (
    <div
      className={`hero hero--${compact ? "compact" : "large"}`}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="container u-layout--indent">
        {children}
        {overlapBlock && (
          <div className="hero__overlap-block">{overlapBlock}</div>
        )}
      </div>
    </div>
  )
}

export default Hero
