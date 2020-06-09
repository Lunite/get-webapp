import React, { FunctionComponent } from "react"
import Img from "gatsby-image"
import Hero from "~/components/configurable/Hero"
import Heading from "~/components/configurable/Heading"
import Block from "~/components/configurable/Block"

import "./styles.scss"
import Quote from "~/components/configurable/Quote"

// gatsby-node passes in data as context variable
const BlogItem: FunctionComponent<any> = context => {
  // this grabs all the needed variables from within content.pageContext
  const {
    date,
    title,
    hero_title,
    hero_subtitle,
    body,
    image_hero,
    show_quote_block,
  } = context.pageContext

  return (
    <div className="blog-item">
      {!!image_hero && (
        <Hero
          image={<Img fluid={image_hero.childImageSharp.fluid} title={title} />}
          centered
        >
          <Heading level={1} underlined centered>
            <span dangerouslySetInnerHTML={{ __html: hero_title }} />
          </Heading>
          {hero_subtitle && (
            <p style={{ textAlign: "center" }}>{hero_subtitle}</p>
          )}
        </Hero>
      )}

      <Block>
        <div className="container" style={{ maxWidth: 740 }}>
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
      {!!show_quote_block && (
        <Block>
          <div className="container container--column">
            <Quote />
          </div>
        </Block>
      )}
    </div>
  )
}

export default BlogItem
