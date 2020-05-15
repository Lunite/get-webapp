import React, { useState } from "react"
import ReactPlayer from "react-player"

const Video = ({ url }) => {
  const [getPlaying, setPlaying] = useState(false)

  return (
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
  )
}

export default Video
