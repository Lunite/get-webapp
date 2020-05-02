import React, { FunctionComponent } from "react"
import PageWrapper from "~/components/layout/page-wrapper"
import Hero from "~/components/configurable/Hero"
import Heading from "~/components/configurable/Heading"
import Block from "~/components/configurable/Block"
import Col6 from "~/components/grid/Col6"
import Image from "~/components/configurable/Image"
import InfoStrip from "~/components/configurable/InfoStrip"

const Project: FunctionComponent<any> = context => {
  const { title, acf, slug } = context.pageContext

  return (
    <PageWrapper context={{ title, acf, slug }}>
      <Hero image={acf.image.source_url} compact>
        <Heading subheading="Commercial Installation">{title}</Heading>
      </Hero>
      <Block>
        <Col6 indent>
          <p>{acf.description}</p>
        </Col6>
        <Col6 indent>
          <Image src={acf.image.source_url} title={title} />
        </Col6>
      </Block>
      <Block className="project__details-strip">
        <InfoStrip
          location={acf.information.location}
          dcPeak={acf.information.dc_peak}
          developer={acf.information.developer}
          inverters={acf.information.inverters}
          modules={acf.information.modules}
          mapUrl={acf.information.map_url}
        />
      </Block>
      {acf.related_products && (
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
    </PageWrapper>
  )
}

export default Project
