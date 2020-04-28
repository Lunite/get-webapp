import React, { FunctionComponent } from "react"

interface HeadingProps {
  subheading?: string
  underlined?: boolean
  level?: number
}

export const Heading: FunctionComponent<HeadingProps> = ({
  subheading,
  underlined,
  level = 2,
  children,
}) => {
  const HeaderTag = `h${level}`
  return (
    <>
      <HeaderTag
        className={`heading ${underlined ? "heading--underlined" : ""}`}
      >
        {children}
      </HeaderTag>
      {subheading && <span className="heading__subheading">{subheading}</span>}
    </>
  )
}
