import React, { FunctionComponent, useState } from "react"

import Video from "~/components/olc-framework/Video"
import Animate from "~/components/olc-framework/Animate"

import "./styles.scss"

interface HeroProps {
  image?: JSX.Element
  imageUrl?: string
  video?: string
  compact?: boolean
  overlapBlock?: JSX.Element
  className?: string
  centered?: boolean
}

const Hero: FunctionComponent<HeroProps> = ({
  image,
  imageUrl,
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
      style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : "" }}
    >
      {image && <div className="hero__image">{image}</div>}
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
        {video && <Video url={video} image={imageUrl} />}
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
