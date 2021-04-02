import React, { FunctionComponent } from "react"
import { Link } from "gatsby"

import "./styles.scss"
import Icon from "~/components/olc-framework/Icon"

interface BlockCTAProps {
  url?: string
  action?: Function
  submit?: boolean
  secondary?: boolean
  left?: boolean
  right?: boolean
  arrow?: "left" | "right"
  external?: boolean
  inline?: boolean
  large?: boolean
  fullWidth?: boolean
  className?: string
  title?: string
}

const BlockCTA: FunctionComponent<BlockCTAProps> = ({
  url,
  action,
  submit,
  secondary,
  left,
  right,
  arrow,
  children,
  external,
  inline,
  large,
  fullWidth,
  className,
  title,
}) => {
  if (!url && !submit && !action) {
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

    if (large) {
      classes += " block-cta--large"
    }

    if (fullWidth) {
      classes += " block-cta--full-width"
    }

    if (className) {
      classes += ` ${className}`
    }

    return classes
  }

  if (submit) {
    return (
      <button
        className={`block-cta ${extraClasses()}`}
        type="submit"
        onClick={action ? () => {action()}:  () => {}}
        title={title}
      >
        {children}
      </button>
    )
  }

  return (
    <>
      {action ? (
        <span
          className={`block-cta ${extraClasses()}`}
          onClick={() => {
            action()
          }}
          title={title}
        >
          {children}
        </span>
      ) : (
        <>
          {!external && (
            <Link to={url} className={`block-cta ${extraClasses()}`}>
              {arrow === "left" && <Icon alias="arrow-left" />}
              {children}
              {arrow === "right" && <Icon alias="arrow-right" />}
            </Link>
          )}
          {external && (
            <a
              className={`block-cta ${extraClasses()}`}
              href={url}
              target="_blank"
            >
              {children}
            </a>
          )}
        </>
      )}
    </>
  )
}

export default BlockCTA
