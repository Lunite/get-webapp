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
          We believe that solar shouldn’t be a luxury, it should be for everyone. Our solutions are designed to be simple, easy to understand with no hidden costs or additions.  We provide a fantastic service which is whats important to homeowners and always at a fair price.  We will help you understand the best solution and make it easy to make simple and informed choice.
          </p>
          <HouseIllustration className="house-illustration" />
          <div className="row">
            <Col8>
              <Heading level={3}>The best solution for your Home</Heading>
              <p>
              We provide smart solutions for your home by treating microgeneration seriously; we  apply simple design principles to get solar just right for you and your home. So what makes our offering special?
              </p>
              <p>
              Our tailored system design, with the battery fully integrated, is always based on your consumption and lifestyle profile to give you the best possible return on your investment. Our service and aftercare package is a streamlined and stress-free process designed to protect your asset and peace of mind.
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
                        Our designs produce peak return on your solar investment because we base our recommendations on your lifestyle and home energy consumption.  We integrate the battery from the start and use only market leading software PV*SOL for accurate forecasting. This means you'll generate the optimum level of energy for your home, saving you money.
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
                        From quoting and design to our comprehensive aftercare package, we provide a complete solution. We'll take care of the boring bits for you, including commissioning and free registration, and for 2 years we offer free operation and maintenance as well as monitoring your system remotely, using data for the best system performance.   
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
