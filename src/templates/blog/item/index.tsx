import React, { FunctionComponent } from "react"
import Hero from "~/components/configurable/Hero"
import Heading from "~/components/configurable/Heading"
import Block from "~/components/configurable/Block"

// gatsby-node passes in data as context variable
const BlogItem: FunctionComponent<any> = context => {
  // this grabs all the needed variables from within content.pageContext
  const { title, body, image_hero } = context.pageContext

  return (
    <>
      {!!image_hero?.publicURL && (
        <Hero image={image_hero?.publicURL} compact>
          <Heading level={1} underlined>
            <span dangerouslySetInnerHTML={{ __html: title }} />
          </Heading>
        </Hero>
      )}

      <Block>
        <div className="container" dangerouslySetInnerHTML={{ __html: body }} />
      </Block>
    </>
  )
}

export default BlogItem
