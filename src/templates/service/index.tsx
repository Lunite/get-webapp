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
import Icon from "~/components/olc-framework/Icon"

import "./styles.scss"

const Service: FunctionComponent<any> = ({ pageContext }) => {
  const {
    title,
    image_hero,
    block_1,
    block_2,
    display_image,
    display_image_caption,
  } = pageContext

  return (
    <div className="service">
      <Hero
        image={<Img fluid={image_hero?.childImageSharp?.fluid} alt={title} />}
        compact
      >
        <Heading level={1} underlined>
          {title}
        </Heading>
      </Hero>
      <Block className="service__block-1">
        <div className="container">
          <Col9 squidge>
            <Heading level={2}>{block_1.heading}</Heading>
            <Markdown source={block_1.description} />
            <div className="service__highlights">
              {block_1.highlight_1 && (
                <div className="highlight">
                  <div className="highlight__icon">
                    <Icon alias="solar-house" />
                  </div>
                  <div className="highlight__contents">
                    <Markdown source={block_1.highlight_1} />
                  </div>
                </div>
              )}
              {block_1.highlight_2 && (
                <div className="highlight">
                  <div className="highlight__icon">
                    <Icon alias="energy-transform" />
                  </div>
                  <div className="highlight__contents">
                    <Markdown source={block_1.highlight_2} />
                  </div>
                </div>
              )}
            </div>
          </Col9>
          {(block_1.image_1 || block_1.image_2) && (
            <Col3>
              {block_1.image_1 && (
                <Img
                  fluid={block_1.image_1?.childImageSharp?.fluid}
                  alt={title}
                />
              )}
              {block_1.image_2 && (
                <Img
                  fluid={block_1.image_2?.childImageSharp?.fluid}
                  alt={title}
                />
              )}
            </Col3>
          )}
        </div>
      </Block>
      {display_image && (
        <Block className="wide-image">
          <Img
            className="wide-image__img"
            fluid={display_image?.childImageSharp?.fluid}
            alt={title}
          />
          {!!display_image_caption && (
            <Markdown
              className="wide-image__caption"
              source={display_image_caption}
            />
          )}
        </Block>
      )}
      {!!block_2 && (
        <>
          <Block className="service__block-2">
            <div className="container">
              <Col10 indent>
                <Heading level={2}>{block_2.heading}</Heading>
                <Markdown source={block_2.description} />
                <div className="service__highlights">
                  {block_2.highlight_1 && (
                    <div className="highlight">
                      <div className="highlight__icon">
                        <Icon alias="solar-house" />
                      </div>
                      <div className="highlight__contents">
                        <Markdown source={block_2.highlight_1} />
                      </div>
                    </div>
                  )}
                  {block_2.highlight_2 && (
                    <div className="highlight">
                      <div className="highlight__icon">
                        <Icon alias="energy-transform" />
                      </div>
                      <div className="highlight__contents">
                        <Markdown source={block_2.highlight_2} />
                      </div>
                    </div>
                  )}
                </div>
              </Col10>
            </div>
          </Block>
          {(block_2.image_1 || block_2.image_2) && (
            <Block>
              <div className="container">
                {block_2.image_1 && (
                  <Col6>
                    <Img
                      fluid={block_2.image_1?.childImageSharp?.fluid}
                      alt={title}
                    />
                    {!!block_2.image_1_caption && (
                      <span className="image__caption">
                        {block_2.image_1_caption}
                      </span>
                    )}
                  </Col6>
                )}
                {block_2.image_2 && (
                  <Col6>
                    <Img
                      fluid={block_2.image_2?.childImageSharp?.fluid}
                      alt={title}
                    />
                    {!!block_2.image_2_caption && (
                      <span className="image__caption">
                        {block_2.image_2_caption}
                      </span>
                    )}
                  </Col6>
                )}
              </div>
            </Block>
          )}
        </>
      )}
    </div>
  )
}

export default Service
