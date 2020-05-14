import React, { useEffect } from "react"
import { Link } from "gatsby"
import Hero from "~/components/configurable/Hero"
import Heading from "~/components/configurable/Heading"
import StatsBlock from "~/components/standalone/StatsBlock"
import Block from "../configurable/Block"
import Vector from "../configurable/Vector"
import Col8 from "../grid/Col8"
import Col6 from "../grid/Col6"
import Expandable from "../configurable/Expandable"
import Quote from "../configurable/Quote"
import Banner from "../configurable/Banner"
import ProductsAndWarrantiesBlock from "../configurable/ProductsAndWarrantiesBlock"

import * as HouseIllustration from "~/vectors/house-illustration.inline.svg"
import { useCustomerType } from "~/hooks/useCustomerType"

const Homepage = () => {
  const { changeCustomerType } = useCustomerType()

  useEffect(() => {
    changeCustomerType("customer")
  }, [])

  return (
    <div className="homepage">
      <Banner className="visible-xs">
        <Link to="/for-your-business">Go to Business Site</Link>
      </Banner>
      <Hero
        className="homepage__hero"
        image="/images/b2c-hero.jpg"
        overlapBlock={<StatsBlock />}
      >
        <Heading level={1}>Because Not All Solar Is The Same.</Heading>
        <p>Solar energy should not be a luxury</p>
        {/* <BlockCTA url="/projects">Find Out More</BlockCTA> */}
      </Hero>
      <Block>
        <div className="container container--column illustrated-house-block">
          <Heading underlined>A complete solar PV system for your home</Heading>
          <p>
            agerjj aergiaej rgie hjahi a djth aih aeh ae haeh. ehra g. aerg aer
            abahe ha. ahaerh aeahtrt ha a. heh aeh.
          </p>
          <HouseIllustration className="house-illustration" />
          <div className="row">
            <Col8>
              <Heading level={3}>The best solution for your Home</Heading>
              <p>
                We provide a residential solar solution that offers
                market-leading efficiencies in those areas important to
                homeowners and tenants - cost, energy and customer service.
              </p>
              <p>
                We believe that your solar system should be designed based on
                your goals and consumption, not how many solar panels you can
                fit on the property. This ensures our designs are truly cost
                effective, bringing the best returns on your investment.
              </p>
              <Expandable
                readmore={
                  <div className="row">
                    <Col6 className="u-layout--centered">
                      <Vector src="solar-house" />
                      <p>
                        not how many solar panels you can fit on the property.
                        This ensures our
                      </p>
                    </Col6>
                    <Col6 className="u-layout--centered">
                      <Vector src="solar-house" />
                      <p>
                        not how many solar panels you can fit on the property.
                        This ensures our
                      </p>
                    </Col6>
                  </div>
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
    </div>
  )
}

export default Homepage
