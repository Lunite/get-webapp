import React, { FunctionComponent } from "react"
import Hero from "~/components/configurable/Hero"
import Heading from "~/components/configurable/Heading"
import Block from "~/components/configurable/Block"
import Col3 from "~/components/grid/Col3"
import Col9 from "~/components/grid/Col9"
import Col10 from "~/components/grid/Col10"
import Col6 from "~/components/grid/Col6"
import Image from "~/components/configurable/Image"
import Vector from "~/components/configurable/Vector"

const Service: FunctionComponent<any> = context => {
  const { title, acf } = context.pageContext

  const { service } = acf

  return (
    <>
      <Hero image={service.hero_image?.source_url} compact>
        <Heading level={1} underlined>
          {title}
        </Heading>
      </Hero>
      <Block>
        <div className="container">
          <Col9 indent>
            <Heading level={2}>{service.block_1_heading}</Heading>
            <p>{service.block_1_description}</p>
            <div className="service__highlights">
              {service.block_1_highlight_1 && (
                <div className="highlight">
                  <div className="highlight__icon">
                    <Vector src="solar-energy-house-icon" />
                  </div>
                  <div
                    className="highlight__contents"
                    dangerouslySetInnerHTML={{
                      __html: service.bock_1_highlight_1,
                    }}
                  ></div>
                </div>
              )}
              {service.block_1_highlight_2 && (
                <div
                  className="highlight"
                  dangerouslySetInnerHTML={{
                    __html: service.block_1_highlight_2,
                  }}
                ></div>
              )}
            </div>
          </Col9>
          {(service.block_1_image_1 || service.block_1_image_2) && (
            <Col3>
              {service.block_1_image_1 && (
                <Image
                  src={service.block_1_image_1?.source_url}
                  title={title}
                />
              )}
              {service.block_1_image_2 && (
                <Image
                  src={service.block_1_image_2?.source_url}
                  title={title}
                />
              )}
            </Col3>
          )}
        </div>
      </Block>
      {service.display_image && (
        <Block className="service__wide-image">
          <Image
            src={service.display_image?.source_url}
            title={service.display_image?.title}
            caption={service.display_image?.caption}
          />
        </Block>
      )}
      <Block>
        <div className="container">
          <Col10 indent>
            <Heading level={2}>{service.block_1_heading}</Heading>
            <p>{service.block_1_description}</p>
            <div className="service__highlights">
              {service.block_1_highlight_1 && (
                <div className="highlight">
                  <div className="highlight__icon">
                    <Vector src="solar-energy-house-icon" />
                  </div>
                  <div
                    className="highlight__contents"
                    dangerouslySetInnerHTML={{
                      __html: service.bock_1_highlight_1,
                    }}
                  ></div>
                </div>
              )}
              {service.block_1_highlight_2 && (
                <div
                  className="highlight"
                  dangerouslySetInnerHTML={{
                    __html: service.block_1_highlight_2,
                  }}
                ></div>
              )}
            </div>
          </Col10>
        </div>
      </Block>
      {(service.block_2_image_1 || service.block_2_image_1) && (
        <Block>
          <div className="container">
            {service.block_2_image_1 && (
              <Col6>
                <Image
                  src={service.block_2_image_1?.source_url}
                  title={service.block_2_image_1?.title}
                  caption={service.block_2_image_1?.caption}
                />
              </Col6>
            )}
            {service.block_2_image_2 && (
              <Col6>
                <Image
                  src={service.block_2_image_2?.source_url}
                  title={service.block_2_image_2?.title}
                  caption={service.block_2_image_2?.caption}
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
