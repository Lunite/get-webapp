import React, { FunctionComponent } from "react"

interface HeroProps {
  compact?: boolean
  overlapBlock?: JSX.Element[]
}

export const Hero: FunctionComponent<HeroProps> = ({
  compact,
  overlapBlock,
  children,
}) => {
  return (
    <div className={`hero hero--${compact ? "compact" : "large"}`}>
      {children}
      {overlapBlock && (
        <div className="hero__overlap-block">{overlapBlock}</div>
      )}
    </div>
  )
}
