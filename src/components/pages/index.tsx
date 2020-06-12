import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import Hero from "~/components/configurable/Hero"
import Heading from "~/components/configurable/Heading"
import StatsBlock from "~/components/standalone/StatsBlock"
import Block from "../configurable/Block"
import Col8 from "../grid/Col8"
import Col6 from "../grid/Col6"
import Col4 from "../grid/Col4"
import Expandable from "../configurable/Expandable"
import Quote from "../configurable/Quote"
import Banner from "../configurable/Banner"
import ProductsAndWarrantiesBlock from "../configurable/ProductsAndWarrantiesBlock"

import * as HouseIllustration from "~/vectors/house-illustration.inline.svg"
import { useCustomerType } from "~/hooks/useCustomerType"
import CaseStudiesMap from "../configurable/CaseStudiesMap"
import Icon from "../olc-framework/Icon"
import BlockCTA from "../configurable/BlockCTA"
import TickList from "../configurable/TickList"
import { imageNodesFilter } from "~/utils"

const Homepage = ({ markdownNodes, imageNodes }) => {
  const [heroImage, setHeroImage] = useState(undefined)
  const [loading, setLoading] = useState(true)
  const { changeCustomerType } = useCustomerType()

  useEffect(() => {
    changeCustomerType("domestic")

    setHeroImage(imageNodesFilter(imageNodes, "homepage-video.jpg"))

    setLoading(false)
  }, [imageNodes])

  return (
    <div className="homepage" style={{ opacity: loading ? 0 : 1 }}>
      <Banner className="visible-xs">
        <Link to="/for-your-business">Go to Business Site</Link>
      </Banner>
      <Banner className="banner--covid-19">
        <Link to="/covid-19">Click here to read our COVID-19 plan</Link>
      </Banner>
      {!!heroImage && (
        <Hero
          className="homepage__hero"
          image={<Img fluid={heroImage.fluid} alt="For your home" />}
          // imageUrl="/images/homepage-video.jpg"
          video="https://vimeo.com/418983793"
          overlapBlock={
            <div className="hidden-xs">
              <Quote />
            </div>
          }
        >
          <Heading level={1}>
            Order in June and get a 1 in 30 chance to win your system for free
          </Heading>
          <p style={{ fontSize: "25px" }}>Because not all solar is the same</p>
          <BlockCTA url="/promo">Find Out More</BlockCTA>
        </Hero>
      )}
      <Block className="visible-xs">
        <div className="container container--column">
          <Quote />
        </div>
      </Block>
      <Block>
        <div className="container container--column illustrated-house-block">
          <Heading underlined>A complete solar PV system for your home</Heading>
          <p>
            We believe that solar shouldn’t be a luxury, it should be for
            everyone. Our solutions are designed to be simple, easy to
            understand, with no hidden costs or additions. We provide a
            fantastic service, which is what's important to homeowners, and
            always at a fair price. We'll help you understand the best solution
            so that it will be easy to a make simple and informed choice.
          </p>
          <HouseIllustration className="house-illustration" />
          <div className="row">
            <Col8>
              <Heading level={3}>The best solution for your Home</Heading>
              <p>
                We provide smart solutions for your home by treating
                microgeneration seriously; we  apply simple design principles to
                get solar just right for you and your home. So what makes our
                offering special?
              </p>
              <p>
                Our tailored system design, with the battery fully integrated,
                is always based on your consumption and lifestyle profile to
                give you the best possible return on your investment. Our
                service and aftercare package is a streamlined and stress-free
                process designed to protect your asset and peace of mind.
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
                          Our designs produce peak return on your solar
                          investment because we base our recommendations on your
                          lifestyle and home energy consumption.  We integrate
                          the battery from the start and use only market leading
                          software PV*SOL for accurate forecasting. This means
                          you'll generate the optimum level of energy for your
                          home, saving you money.
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
                          monitoring your system remotely, using data for the
                          best system performance.
                        </p>
                      </Col6>
                    </div>
                  </>
                }
              />
            </Col8>
            <Col4>
              <TickList nolines blueticks>
                <li>Usage-based design</li>
                <li>Transparent data analysis</li>
                <li>Streamlined and stress free process</li>
                <li>Market leading after care &amp; warranty package</li>
                <li>Large product selection at a fair price</li>
              </TickList>
            </Col4>
          </div>
        </div>
      </Block>
      <div className="container">
        <StatsBlock device="desktop" />
        <StatsBlock device="mobile" />
      </div>
      <Block>
        <div className="container">
          <ProductsAndWarrantiesBlock imageNodes={imageNodes} />
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
          <CaseStudiesMap
            markdownNodes={markdownNodes}
            customerType="domestic"
          />
        </div>
      </Block>
    </div>
  )
}

export default Homepage
