import React, { FunctionComponent, useState } from "react"
import ReactPlayer from "react-player"

import "./styles.scss"
import VimeoVideo from "~/components/olc-framework/VimeoVideo"
import Animate from "~/components/olc-framework/Animate"
import { VideoProps } from "~/components/olc-framework/Video"
import Video from "~/components/olc-framework/Video"

interface HeroProps {
  image: string
  video?: VideoProps
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
        <Animate>{children}</Animate>
      </div>
      <div className="hero__video">{video && <Video {...video} />}</div>

      {overlapBlock && (
        <div className="hero-overlap-block__container container">
          <div className="hero-overlap-block">{overlapBlock}</div>
        </div>
      )}
    </div>
  )
}

export default Hero
