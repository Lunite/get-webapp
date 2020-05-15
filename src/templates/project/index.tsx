import React, { FunctionComponent } from "react"
import Hero from "~/components/configurable/Hero"
import Heading from "~/components/configurable/Heading"
import Block from "~/components/configurable/Block"
import Col6 from "~/components/grid/Col6"
import Image from "~/components/configurable/Image"
import InfoStrip from "~/components/configurable/InfoStrip"

// gatsby-node passes in data as context variable
const Project: FunctionComponent<any> = context => {
  // this asigns two variables title and acf e.g. context.pageContext.title and context.pageContext.acf
  const { title, acf } = context.pageContext

  const { project } = acf

  return (
    <>
      <Hero image={project.hero_image?.source_url} compact>
        <Heading level={1} subheading={project.subheading} underlined>
          <span dangerouslySetInnerHTML={{ __html: title }} />
        </Heading>
      </Hero>
      <Block>
        <div className="container">
          <Col6 indent>
            <div dangerouslySetInnerHTML={{ __html: project.description }} />
          </Col6>
          <Col6 indent>
            <Image src={project.image?.source_url} title={title} />
          </Col6>
        </div>
      </Block>
      <InfoStrip
        location={project.info_location}
        dcPeak={project.info_dc_peak}
        developer={project.info_developer}
        inverters={project.info_inverters}
        modules={project.info_modules}
        mapUrl={project.info_map_url}
      />
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
