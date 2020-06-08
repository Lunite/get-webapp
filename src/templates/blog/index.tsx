import React from "react"
import Hero from "~/components/configurable/Hero"
import Block from "~/components/configurable/Block"
import Heading from "~/components/configurable/Heading"
import { markdownNodesFilter } from "~/utils"

export const BlogListItem = ({ item }) => {
  return <div className="blog-list-item"></div>
}

const BlogPage = ({ pageContext: { blogItems } }) => {
  console.log(blogItems)

  return (
    <div className="blog">
      <Hero image="/images/blog-hero.jpg" compact>
        <Heading level={1} underlined>
          Blog
        </Heading>
      </Hero>
      <Block>
        <div className="blog__items">
          {blogItems.map(blogItem => (
            <BlogListItem item={blogItem} />
          ))}
        </div>
      </Block>
    </div>
  )
}

export default BlogPage
