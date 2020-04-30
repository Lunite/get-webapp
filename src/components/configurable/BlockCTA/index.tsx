import React, { FunctionComponent } from "react"
import { Vector } from "~/components/configurable/Vector"

interface BlockCTAProps {
  url?: string
  submit?: boolean
  secondary?: boolean
  left?: boolean
  right?: boolean
  arrow?: "left" | "right"
}

export const BlockCTA: FunctionComponent<BlockCTAProps> = ({
  url,
  submit,
  secondary,
  left,
  right,
  arrow,
  children,
}) => {
  if (!url && !submit) {
    return
  }

  const extraClasses = () => {
    let classes = ""

    if (secondary) {
      classes += " block-cta--secondary"
    } else {
      classes += " block-cta--primary"
    }

    if (left) {
      classes += " left"
    } else if (right) {
      classes += " right"
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
    <a className={`block-cta ${extraClasses()}`} href={url}>
      {arrow === "left" && <Vector src="arrow-left" />}
      {children}
      {arrow === "right" && <Vector src="arrow-right" />}
    </a>
  )
}
