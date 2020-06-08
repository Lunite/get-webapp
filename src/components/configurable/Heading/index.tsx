import React, { FunctionComponent } from "react"

interface HeadingProps {
  className?: string
  subheading?: string
  underlined?: boolean
  level?: number
  centered?: boolean
}

const Heading: FunctionComponent<HeadingProps> = ({
  className = "",
  subheading,
  underlined,
  centered = false,
  level = 2,
  children,
}) => {
  const HeaderTag = `h${level}`
  return (
    <>
      <HeaderTag
        className={`heading heading--${level} ${
          underlined ? "heading--underlined" : ""
        } ${centered ? "heading--centered" : ""} ${className}`}
      >
        {children}
      </HeaderTag>
      {subheading && <span className="heading__subheading">{subheading}</span>}
    </>
  )
}

export default Heading
