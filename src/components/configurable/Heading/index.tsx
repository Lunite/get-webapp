import React, { FunctionComponent } from "react"

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
        className={`heading ${
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
