import React, { FunctionComponent } from "react"
import Heading from "../Heading"
import BlockCTA from "../BlockCTA"

interface HighlightBlockProps {
  title: string
  url?: string
  action?: Function
}

const HighlightBlock: FunctionComponent<HighlightBlockProps> = ({
  title,
  url,
  action,
  children,
}) => {
  return (
    <div className="highlight-block">
      <Heading level={5}>{title}</Heading>
      <ul className="highlight-block__list">{children}</ul>
      <BlockCTA className="highlight-block__cta" action={action} url={url} />
    </div>
  )
}

export default HighlightBlock
