import React, { FunctionComponent } from "react"

import "./styles.scss"

interface ImageProps {
  src: string
  title: string
  caption?: string
  shoutout?: string
  hover?: JSX.Element
  url?: string
}

const Image: FunctionComponent<ImageProps> = ({
  src,
  title,
  caption,
  shoutout,
  hover,
  url,
}) => {
  const image = <img className="image" src={src} alt={title} title={title} />

  const getHoverContent = () => {
    if (!hover) {
      return
    }

    return <div className="image__hover">{hover}</div>
  }

  const getShoutout = () => {
    if (!shoutout) {
      return
    }

    return <div className="image__shoutout">{shoutout}</div>
  }

  const getCaption = () => {
    if (!caption) {
      return
    }

    return <div className="image__caption">{caption}</div>
  }

  return (
    <>
      {url && (
        <a className="image__container" href={url}>
          {image}
          {getShoutout()}
          {getHoverContent()}
        </a>
      )}
      {!url && (
        <div className="image__container">
          {image}
          {getShoutout()}
          {getHoverContent()}
        </div>
      )}
      {getCaption()}
    </>
  )
}

export default Image
