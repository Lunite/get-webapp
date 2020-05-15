import React, { FunctionComponent } from "react"
import ReactPlayer from "react-player"

import "./styles.scss"

interface HeroProps {
  image: string
  video: string
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
      style={{ backgroundImage: image && !video ? `url(${image})` : "" }}
    >
      <div className="container u-layout--indent">{children}</div>

      {overlapBlock && (
        <div className="hero-overlap-block__container container">
          <div className="hero-overlap-block">{overlapBlock}</div>
        </div>
      )}
      <div className="hero__video">
        {video && (
          <ReactPlayer
            url={video}
            playing
            muted
            playsinline
            controls={false}
            loop
            width="1920px"
            height="auto"
            config={{
              vimeo: {
                background: true,
              },
            }}
          />
        )}
      </div>
    </div>
  )
}

export default Hero
