import React, { FunctionComponent } from "react"
import Hero from "~/components/configurable/Hero"
import Heading from "~/components/configurable/Heading"
import Block from "~/components/configurable/Block"
import Col6 from "~/components/grid/Col6"
import Image from "~/components/configurable/Image"
import InfoStrip from "~/components/configurable/InfoStrip"

// gatsby-node passes in data as context variable
const Project: FunctionComponent<any> = context => {
  // this grabs all the needed variables from within content.pageContext
  const { title, description, image, image_hero, seo, info_strip } = context.pageContext

  const subheading = ''

  return (
    <>
      <Hero image={image_hero?.publicURL} compact>
        <Heading level={1} subheading={subheading} underlined>
          <span dangerouslySetInnerHTML={{ __html: title }} />
        </Heading>
      </Hero>
      <Block>
        <div className="container">
          <Col6 indent>
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </Col6>
          <Col6 indent>
            <Image src={image?.publicURL} title={title} />
          </Col6>
        </div>
      </Block>
      {Object.keys(info_strip).length && (<InfoStrip
        location={info_strip.location}
        dcPeak={info_strip.dc_peak}
        developer={info_strip.developer}
        inverters={info_strip.inverters}
        modules={info_strip.modules}
        mapUrl={info_strip.map_url}
      />)}
      {
        // project.related_products && (
        // <Block>
        //   <Heading>Similar use cases:</Heading>
        //   <Image
        //     src="related-product-image.jpg"
        //     title="Related Product Title"
        //     hover={<p>related product info</p>}
        //   />
        //   TODO
        //   {/** Loop through related projects */}
        // </Block>
        //)
      }
    </>
  )
}

export default Project
