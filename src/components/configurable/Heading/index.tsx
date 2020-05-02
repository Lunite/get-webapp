import React, { FunctionComponent } from "react"

import "./styles.scss"

interface HeadingProps {
  className?: string
  subheading?: string
  underlined?: boolean
  level?: number
}

const Heading: FunctionComponent<HeadingProps> = ({
  className,
  subheading,
  underlined,
  level = 2,
  children,
}) => {
  const HeaderTag = `h${level}`
  return (
    <>
      <HeaderTag
        className={`heading heading--${level} ${
          underlined ? "heading--underlined" : ""
        } ${className}`}
      >
        {children}
      </HeaderTag>
      {subheading && <span className="heading__subheading">{subheading}</span>}
    </>
  )
}

export default Heading
