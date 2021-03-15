import React, { FunctionComponent } from "react"
import Img from "gatsby-image"

import "./styles.scss"
import { graphql } from "gatsby"
import { FluidObject } from "gatsby-image"

interface ImageProps {
  src?: string
  title: string
  className?: string
  caption?: string
  shoutout?: string
  fluid?: FluidObject
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
  fluid,
  className = "",
}) => {
  const image = (() => {
    if (fluid) {
      return <Img fluid={fluid} alt={title} />
    }

    return (
      <img
        className={`image ${className} u-styling--box-shadow`}
        src={src}
        alt={title}
        title={title}
      />
    )
  })()

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
