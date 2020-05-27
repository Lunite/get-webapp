import React, { FunctionComponent } from "react"
import Hero from "~/components/configurable/Hero"
import Heading from "~/components/configurable/Heading"
import Block from "~/components/configurable/Block"

import "./styles.scss"

// gatsby-node passes in data as context variable
const BlogItem: FunctionComponent<any> = context => {
  // this grabs all the needed variables from within content.pageContext
  const { date, title, hero_title, body, image_hero } = context.pageContext

  return (
    <div className="blog-item">
      {!!image_hero?.publicURL && (
        <Hero image={image_hero?.publicURL} compact>
          <Heading level={1} underlined>
            <span dangerouslySetInnerHTML={{ __html: hero_title }} />
          </Heading>
        </Hero>
      )}

      <Block>
        <div className="container">
          <Heading className="blog-item__heading" level={3}>
            <span dangerouslySetInnerHTML={{ __html: title }} />
          </Heading>
          <div className="blog-item__info">
            <span style={{ fontSize: 14 }}>{date}</span>
          </div>
          <div
            style={{ marginTop: 16 }}
            dangerouslySetInnerHTML={{ __html: body }}
          />
        </div>
      </Block>
    </div>
  )
}

export default BlogItem
