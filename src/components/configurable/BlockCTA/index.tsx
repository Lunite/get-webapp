import React, { FunctionComponent } from "react"
import Vector from "~/components/configurable/Vector"
import { Link } from "gatsby"

import "./styles.scss"

interface BlockCTAProps {
  url?: string
  submit?: boolean
  secondary?: boolean
  left?: boolean
  right?: boolean
  arrow?: "left" | "right"
  external?: boolean
  inline?: boolean
}

const BlockCTA: FunctionComponent<BlockCTAProps> = ({
  url,
  submit,
  secondary,
  left,
  right,
  arrow,
  children,
  external,
  inline,
}) => {
  if (!url && !submit) {
    return null
  }

  const extraClasses = () => {
    let classes = ""

    if (secondary) {
      classes += " block-cta--secondary"
    } else {
      classes += " block-cta--primary"
    }

    if (inline) {
      classes += " block-cta--inline"
    }

    if (left) {
      classes += " block-cta--left"
    } else if (right) {
      classes += " block-cta--right"
    }

    return classes
  }

  if (submit) {
    return (
      <button className={`block-cta ${extraClasses()}`} type="submit">
        {children}
      </button>
    )
  }

  return (
    <>
      {!external && (
        <Link to={url} className={`block-cta ${extraClasses()}`}>
          {arrow === "left" && <Vector src="arrow-left" />}
          {children}
          {arrow === "right" && <Vector src="arrow-right" />}
        </Link>
      )}
      {external && (
        <a className={`block-cta ${extraClasses()}`} href={url} target="_blank">
          {children}
        </a>
      )}
    </>
  )
}

export default BlockCTA
