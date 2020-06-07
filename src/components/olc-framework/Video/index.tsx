import React, { useState } from "react"

import "./styles.scss"

const Video = ({ url, image }) => {
  const [playing, setPlaying] = useState(false)

  return (
    <div className={`video ${playing ? " video--playing" : ""}`}>
      <div className="video__video">
        <iframe
          src={`${url}?autoplay=1&loop=1&title=0&byline=0&portrait=0&background=1`}
          allow="autoplay"
        ></iframe>
      </div>
      <div
        className="video__image"
        style={{ backgroundImage: `src(${image})` }}
      />
    </div>
  )
}

export default Video
