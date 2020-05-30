import React, { FunctionComponent } from "react"
import Heading from "../Heading"
import BlockCTA from "../BlockCTA"

import "./styles.scss"

interface HighlightBlockProps {
  title: string
  url?: string
  action?: Function
  actionText?: string
}

const HighlightBlock: FunctionComponent<HighlightBlockProps> = ({
  title,
  url,
  action,
  actionText,
  children,
}) => {
  return (
    <div className="highlight-block">
      <Heading level={4}>{title}</Heading>
      <ul className="highlight-block__list">{children}</ul>
      <BlockCTA className="highlight-block__cta" action={action} url={url}>
        {actionText}
      </BlockCTA>
    </div>
  )
}

export default HighlightBlock
