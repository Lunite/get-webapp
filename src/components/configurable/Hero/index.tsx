import React, { FunctionComponent, useState } from "react"
import ReactPlayer from "react-player"

import Video from "~/components/olc-framework/Video"
import Animate from "~/components/olc-framework/Animate"

interface HeroProps {
  image: string
  video?: string
  compact?: boolean
  overlapBlock?: JSX.Element
  className?: string
  centered?: boolean
}

const Hero: FunctionComponent<HeroProps> = ({
  image,
  video,
  compact,
  overlapBlock,
  children,
  className,
  centered,
}) => {
  return (
    <div
      className={`hero hero--${compact ? "compact" : "large"}${
        overlapBlock ? " hero--has-overlap" : ""
      }${centered ? " hero--centered" : ""} ${className || ""}`}
      style={{ backgroundImage: image ? `url(${image})` : "" }}
    >
      <div className={`container ${!centered ? "u-layout--indent" : ""}`}>
        <Animate
          properties={["opacity", "transform"]}
          startValues={["0", "translateY(40px) rotate(0.5deg)"]}
          endValues={["1", "translateY(0) rotate(0deg)"]}
          delay="0s"
        >
          {children}
        </Animate>
      </div>
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
