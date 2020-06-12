import React, { FunctionComponent } from "react"
import Markdown from "react-markdown"
import Img from "gatsby-image"
import Hero from "~/components/configurable/Hero"
import Heading from "~/components/configurable/Heading"
import Block from "~/components/configurable/Block"
import Col3 from "~/components/grid/Col3"
import Col9 from "~/components/grid/Col9"
import Col10 from "~/components/grid/Col10"
import Col6 from "~/components/grid/Col6"
import Image from "~/components/configurable/Image"
import Icon from "~/components/olc-framework/Icon"

import "./styles.scss"

const Service: FunctionComponent<any> = ({ pageContext }) => {
  const { title, image_hero, block_1, block_2, display_image } = pageContext

  return (
    <>
      <Hero
        image={<Img fluid={image_hero?.childImageSharp?.fluid} alt={title} />}
        compact
      >
        <Heading level={1} underlined>
          {title}
        </Heading>
      </Hero>
      <Block>
        <div className="container">
          <Col9 indent>
            <Heading level={2}>{block_1.heading}</Heading>
            <p>
              <Markdown source={block_1.description} />
            </p>
            <div className="service__highlights">
              {block_1.highlight_1 && (
                <div className="highlight">
                  <div className="highlight__icon">
                    <Icon alias="solar-energy-house" />
                  </div>
                  <div className="highlight__contents">
                    <Markdown source={block_1.highlight_1} />
                  </div>
                </div>
              )}
              {block_1.highlight_2 && (
                <div className="highlight">
                  <Markdown source={block_1.highlight_2} />
                </div>
              )}
            </div>
          </Col9>
          {(block_1.image_1 || block_1.image_2) && (
            <Col3>
              {block_1.image_1 && (
                <Image src={block_1.image_1?.source_url} title={title} />
              )}
              {block_1.image_2 && (
                <Image src={block_1.image_2?.source_url} title={title} />
              )}
            </Col3>
          )}
        </div>
      </Block>
      {display_image && (
        <Block className="service__wide-image">
          <Img fluid={display_image.childImageSharp.fluid} alt={title} />
        </Block>
      )}
      <Block>
        <div className="container">
          <Col10 indent>
            <Heading level={2}>{block_1.heading}</Heading>
            <p>
              <Markdown source={block_1.description} />
            </p>
            <div className="service__highlights">
              {block_1.highlight_1 && (
                <div className="highlight">
                  <div className="highlight__icon">
                    <Icon alias="solar-energy-house" />
                  </div>
                  <div className="highlight__contents">
                    <Markdown source={block_1.highlight_1} />
                  </div>
                </div>
              )}
              {block_1.highlight_2 && (
                <div className="highlight">
                  <Markdown source={block_1.highlight_2} />
                </div>
              )}
            </div>
          </Col10>
        </div>
      </Block>
      {(block_2.image_1 || block_2.image_1) && (
        <Block>
          <div className="container">
            {block_2.image_1 && (
              <Col6>
                <Image
                  src={block_2.image_1?.source_url}
                  title={block_2.image_1?.title}
                  caption={block_2.image_1?.caption}
                />
              </Col6>
            )}
            {block_2.image_2 && (
              <Col6>
                <Image
                  src={block_2.image_2?.source_url}
                  title={block_2.image_2?.title}
                  caption={block_2.image_2?.caption}
                />
              </Col6>
            )}
          </div>
        </Block>
      )}
    </>
  )
}

export default Service
