import React, { FunctionComponent } from "react"

interface HeroProps {
  image: string
  compact?: boolean
  overlapBlock?: JSX.Element[]
}

export const Hero: FunctionComponent<HeroProps> = ({
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
      <div className="container">
        {children}
        {overlapBlock && (
          <div className="hero__overlap-block">{overlapBlock}</div>
        )}
      </div>
    </div>
  )
}
