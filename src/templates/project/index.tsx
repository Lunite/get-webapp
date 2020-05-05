import React, { FunctionComponent } from "react"
import Hero from "~/components/configurable/Hero"
import Heading from "~/components/configurable/Heading"
import Block from "~/components/configurable/Block"
import Col6 from "~/components/grid/Col6"
import Image from "~/components/configurable/Image"
import InfoStrip from "~/components/configurable/InfoStrip"

const Project: FunctionComponent<any> = context => {
  const { title, acf } = context.pageContext

  console.log(context.pageContext)

  const { project } = acf

  return (
    <>
      <Hero image={project.image.source_url} compact>
        <Heading level={1} subheading={project.subheading}>
          {title}
        </Heading>
      </Hero>
      <Block>
        <Col6 indent>
          <p>{project.description}</p>
        </Col6>
        <Col6 indent>
          <Image src={project.image.source_url} title={title} />
        </Col6>
      </Block>
      {project.information && (
        <Block className="project__details-strip">
          <InfoStrip
            location={project.information.location}
            dcPeak={project.information.dc_peak}
            developer={project.information.developer}
            inverters={project.information.inverters}
            modules={project.information.modules}
            mapUrl={project.information.map_url}
          />
        </Block>
      )}
      {project.related_products && (
        <Block>
          <Heading>Similar use cases:</Heading>
          <Image
            src="related-product-image.jpg"
            title="Related Product Title"
            hover={<p>related product info</p>}
          />
          TODO
          {/** Loop through related projects */}
        </Block>
      )}
    </>
  )
}

export default Project
