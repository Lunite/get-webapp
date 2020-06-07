import React from "react"

export interface VideoProps {
  poster: string
  sources: {
    webm?: string
    ogv?: string
    mp4?: string
  }
}

const Video = ({ poster, sources }: VideoProps) => {
  return (
    <video autoPlay loop poster={poster}>
      {/* <source src={sources.webm} type="video/webm" /> */}
      <source src={sources.ogv} type="video/ogv" />
      <source src={sources.mp4} type="video/mp4" />
    </video>
  )
}

export default Video
