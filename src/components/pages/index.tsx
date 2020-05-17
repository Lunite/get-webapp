import React, { useEffect } from "react"
import { Link } from "gatsby"
import Hero from "~/components/configurable/Hero"
import Heading from "~/components/configurable/Heading"
import StatsBlock from "~/components/standalone/StatsBlock"
import Block from "../configurable/Block"
import Col8 from "../grid/Col8"
import Col6 from "../grid/Col6"
import Expandable from "../configurable/Expandable"
import Quote from "../configurable/Quote"
import Banner from "../configurable/Banner"
import ProductsAndWarrantiesBlock from "../configurable/ProductsAndWarrantiesBlock"

import * as HouseIllustration from "~/vectors/house-illustration.inline.svg"
import { useCustomerType } from "~/hooks/useCustomerType"
import CaseStudiesMap from "../configurable/CaseStudiesMap"
import Icon from "../olc-framework/Icon"

const Homepage = () => {
  const { changeCustomerType } = useCustomerType()

  useEffect(() => {
    changeCustomerType("residential")
  }, [])

  return (
    <div className="homepage">
      <Banner className="visible-xs">
        <Link to="/for-your-business">Go to Business Site</Link>
      </Banner>
      <Hero
        className="homepage__hero"
        image="/images/homepage-video.jpg"
        video="https://vimeo.com/418983793"
        overlapBlock={<StatsBlock device="desktop" />}
      >
        <Heading level={1}>Because Not All Solar Is The Same.</Heading>
        <p>Welcome to the future of energy</p>
        {/* <BlockCTA url="/projects">Find Out More</BlockCTA> */}
      </Hero>
      <Block>
        <StatsBlock device="mobile" />
        <div className="container container--column illustrated-house-block">
          <Heading underlined>A complete solar PV system for your home</Heading>
          <p>
            We believe that solar shouldn’t be a luxury, it should be for
            everyone. Our solutions are designed with transparency in mind,
            providing premium service and performance in all areas important to
            homeowners at a fair price, while making it easy to make truly
            informed choices.
          </p>
          <HouseIllustration className="house-illustration" />
          <div className="row">
            <Col8>
              <Heading level={3}>The best solution for your Home</Heading>
              <p>
                We provide smart solutions for your home by treating
                microgeneration seriously but applying simple principles to get
                solar right. So what makes our offering special?
              </p>
              <p>
                Our tailored system design, with the battery fully integrated,
                is firmly based on your consumption and lifestyle profile to
                give you the best possible return on your investment. Our
                service and aftercare package is a streamlined and stress-free
                process designed to protect your peace of mind.
              </p>
              <Expandable
                readmore={
                  <>
                    <div className="visible-xs" style={{ height: 40 }} />
                    <div className="row">
                      <Col6 className="u-layout--centered">
                        <div
                          className="icon__circle-wrapper"
                          style={{ marginBottom: 40, fontSize: 40 }}
                        >
                          <Icon alias="solar-house" />
                        </div>
                        <p>
                          Our designs produce peak return on solar investment
                          because we base recommendations on your lifestyle and
                          consumption, integrate the battery from the start and
                          use only market leading software PV*SOL for
                          forecasting. This means you'll generate the optimum
                          level of energy for your requirements and storage
                          size, saving you money.
                        </p>
                      </Col6>
                      <Col6 className="u-layout--centered">
                        <div
                          className="icon__circle-wrapper"
                          style={{ marginBottom: 40, fontSize: 40 }}
                        >
                          <Icon alias="solar-power" />
                        </div>
                        <p>
                          From quoting and design to our comprehensive aftercare
                          package, we provide a complete solution. We'll take
                          care of the boring bits for you, including
                          commissioning and free registration, and for 2 years
                          we offer free operation and maintenance as well as
                          monitoring your system remotely, using data for
                          optimal performance.
                        </p>
                      </Col6>
                    </div>
                  </>
                }
              />
            </Col8>
          </div>
        </div>
      </Block>
      <div className="container">
        <Quote />
      </div>
      <Block>
        <div className="container">
          <ProductsAndWarrantiesBlock />
        </div>
      </Block>
      <Block>
        <div className="container">
          <Heading underlined>Case Studies and testimonials</Heading>
          <p>
            At Green Energy Together, we aim to go beyond the traditional notion
            of an installer. Our designs are not only cost effective - due to
            our expertise, including over 60,000 unique designs, we can create
            bespoke solutions that exceed expectations. Check out what our
            customers have to say and some of our favourite projects.
          </p>
          <CaseStudiesMap />
        </div>
      </Block>
    </div>
  )
}

export default Homepage
