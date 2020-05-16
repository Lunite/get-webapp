import React, { FunctionComponent, useState } from "react"
import ReactPlayer from "react-player"

import "./styles.scss"
import Video from "~/components/olc-framework/Video"

interface HeroProps {
  image: string
  video?: string
  compact?: boolean
  overlapBlock?: JSX.Element
  className?: string
}

const Hero: FunctionComponent<HeroProps> = ({
  image,
  video,
  compact,
  overlapBlock,
  children,
  className,
}) => {
  return (
    <div
      className={`hero hero--${compact ? "compact" : "large"}${
        overlapBlock ? " hero--has-overlap" : ""
      } ${className || ""}`}
      style={{ backgroundImage: image ? `url(${image})` : "" }}
    >
      <div className="container u-layout--indent">{children}</div>
      <div className="hero__video">
        {video && <Video url={video} image={image} />}
      </div>

      {overlapBlock && (
        <div className="hero-overlap-block__container container">
          <div className="hero-overlap-block">{overlapBlock}</div>
        </div>
      )}
    </div>
  )
}

export default Hero
