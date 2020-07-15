import React from "react"
import Hero from "~/components/configurable/Hero"
import Block from "~/components/configurable/Block"
import Heading from "~/components/configurable/Heading"
import Markdown from "react-markdown"
import Img from "gatsby-image"

import "./styles.scss"
import BlockCTA from "~/components/configurable/BlockCTA"

export const BlogListItem = ({
  frontmatter: {
    list: { image, intro },
    title,
  },
  fields: { slug },
}) => {
  return (
    <div className="blog-list-item">
      <Img
        className="blog-list-item__image"
        fluid={image.childImageSharp.fluid}
        title={title}
        alt={title}
      />
      <div className="blog-list-item__details">
        <Heading level={3}>{title}</Heading>
        <Markdown source={intro} />
        <BlockCTA secondary url={`/blog${slug}`} arrow="right">
          Read more
        </BlockCTA>
      </div>
    </div>
  )
}

const BlogPage = ({ pageContext: { blogItems } }) => {
  const blogItemsToDisplay = blogItems
    .filter(
      ({ frontmatter }) => frontmatter?.list?.image && frontmatter?.list?.intro
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  console.log(blogItemsToDisplay)

  return (
    <div className="blog">
      <Hero imageUrl="/images/blog-hero.jpg" compact>
        <Heading level={1} underlined>
          Blog
        </Heading>
      </Hero>
      <Block>
        <div className="container u-layout--squidge container--column">
          <div className="blog__items">
            {blogItemsToDisplay.map(item => (
              <BlogListItem {...item} />
            ))}
          </div>
        </div>
      </Block>
    </div>
  )
}

export default BlogPage
