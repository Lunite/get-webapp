import React, { FunctionComponent } from "react"
import { PageWrapper } from "~/components/layout/page-wrapper"
import { Hero } from "~/components/configurable/Hero"
import { Heading } from "~/components/configurable/Heading"
import { Block } from "~/components/configurable/Block"
import { Col6 } from "~/components/grid"
import { Image } from "~/components/configurable/Image"
import { InfoStrip } from "~/components/configurable/InfoStrip"

interface ProjectProps {
  context: any
}

export const Project: FunctionComponent<ProjectProps> = ({ context }) => {
  return (
    <PageWrapper context={context}>
      <Hero image="project-image-large.jpg" compact>
        <Heading subheading="Commercial Installation">
          Title Title Title
        </Heading>
      </Hero>
      <Block>
        <Col6 indent>
          <p>
            Description Description Description Description Description
            Description Description Description
          </p>
        </Col6>
        <Col6 indent>
          <Image src="project-image-small.jpg" title="Title Title Title" />
        </Col6>
      </Block>
      <Block className="project__details-strip">
        <InfoStrip
          location="Location"
          dcPeak="DC Peak"
          developer="Developer"
          inverters="Inverters"
          modules="Modules"
        />
      </Block>
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
    </PageWrapper>
  )
}
