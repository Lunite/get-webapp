import React, { useState } from "react"
import ReactPlayer from "react-player"

import "./styles.scss"

const Video = ({ url, image }) => {
  const [playing, setPlaying] = useState(false)

  return (
    <div className={`video ${playing ? " video--playing" : ""}`}>
      <div className="video__video">
        <ReactPlayer
          url={url}
          playing
          muted
          playsinline
          controls={false}
          loop
          width="1920px"
          height="auto"
          onPlay={() => {
            setPlaying(true)
          }}
        />
      </div>
      <div
        className="video__image"
        style={{ backgroundImage: `src(${image})` }}
      />
    </div>
  )
}

export default Video
