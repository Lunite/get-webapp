import React, { useEffect } from "react"
import Hero from "~/components/configurable/Hero"
import Heading from "~/components/configurable/Heading"
import Block from "../configurable/Block"
import Quote from "../configurable/Quote"
import Section from "../configurable/Section"
import TickList from "../configurable/TickList"
import BlockCTA from "../configurable/BlockCTA"
import Col10 from "../grid/Col10"
import Col2 from "../grid/Col2"
import Image from "../configurable/Image"
import Shoutout from "../configurable/Shoutout"
import StatsBlock from "../standalone/StatsBlock"
import { useCustomerType } from "~/hooks/useCustomerType"

import "./for-your-business.scss"

const HomepageB2b = () => {
  const { changeCustomerType } = useCustomerType()

  useEffect(() => {
    changeCustomerType("commercial")
  }, [])

  return (
    <div className="homepage-b2b">
      <Hero
        className="homepage__hero"
        image="/images/b2b-video.jpg"
        video="https://vimeo.com/418982748"
        overlapBlock={
          <div className="hidden-xs">
            <Quote />
          </div>
        }
      >
        <Heading level={1}>We are here to help grow your business.</Heading>
        <p>Providing all the solutions to move to Solar Energy</p>
        {/* <BlockCTA url="/projects">Find Out More</BlockCTA> */}
      </Hero>
      <Block>
        <Section className="visible-xs">
          <Quote />
        </Section>
        <Section>
          <Heading underlined>A Strong Foundation</Heading>
          <p>
            For more than a decade, Green Energy Together has designed,
            engineered, installed and maintained commercial solar power systems
            across the UK. Our experience covers landfill, brownfield,
            greenfield, commercial and industrial rooftops. No matter the
            challenge, our in-house Operation &amp; Maintenance, Technical
            Design and Asset Management teams place us well to deliver your
            project efficiently in all aspects.
          </p>
        </Section>
        <div className="divider" />
        <Section>
          <div className="row">
            <Col10>
              <Heading underlined>Industrial Commercial Solutions</Heading>
              <p>
                For more than a decade, Green Energy Together has designed,
                engineered, installed and maintained commercial solar power
                systems across the UK.
              </p>
              <TickList>
                <li>
                  From Initial consulting and engineering design through to
                  installation and lifetime maintenance.
                </li>
                <li>
                  As one of the largest solar development groups in the country,
                  we trade significantly larger volumes than the competitors.
                </li>
              </TickList>
              <BlockCTA secondary url="/products" arrow="right">
                Explore Packages
              </BlockCTA>
            </Col10>
            <Col2>
              <Image
                src="/images/paddington-station.jpg"
                title="Commercial Installation at Paddington Station, London UK"
                caption="Paddington Station, London UK"
              />
            </Col2>
          </div>
        </Section>
        <div className="divider" />
        <Section>
          <div className="row">
            <Col2>
              <Image
                src="/images/no-idea.jpg"
                title="Commercial Installation at Kelly Solar Farm"
                caption="Kelly Solar Farm"
              />
            </Col2>
            <Col10>
              <Heading underlined>Operation &amp; Maintenance</Heading>
              <p>
                We believe that your solar system should be designed based on
                your goals and consumption, not how many solar panels you can
                fit on your property.
              </p>
              <TickList>
                <li>
                  Our team will only recommend the system that works best for
                  you based on an accurate forecast of your return on
                  investment.
                </li>
                <li>
                  We will work with you to understand your electricity
                  consumption and how much this costs you, to create an
                  optimised solar and battery solution for you.
                </li>
              </TickList>
              <BlockCTA secondary url="/products" arrow="right">
                Find out more
              </BlockCTA>
            </Col10>
          </div>
        </Section>
        <div className="divider" />
        <Shoutout
          image={<Image src="/images/products-bulb.jpg" title="Products" />}
          text={
            <>
              <Heading underlined>Products &amp; Warranties</Heading>
              <p>
                Our dedicated Operation & Maintenance team has services
                thousands of systems, including private homes, social housing,
                commercial businesses and large-scale grounded mount solar
                farms, for over 10 years.
              </p>
              <BlockCTA url="/products">Find out more</BlockCTA>
            </>
          }
        />
        <div className="divider" />
        <Section>
          <div className="row">
            <Col10>
              <Heading underlined>Technical Design</Heading>
              <p>
                Successful asset management requires the effective coordination
                of processes in line with strategic objectives.
              </p>
              <p>
                We provide a full range of Asset Management Services, as a
                package or on their own, to safely maximise output and
                efficiency, ensuring minimal system downtime and smooth
                operation at all times.
              </p>
              <TickList>
                <li>
                  Uninterrupted monitoring in addition to quantification,
                  measurement and verification of performance allows us to
                  retrieve essential information from the raw data gathered from
                  multiple sources.
                </li>
                <li>
                  We provide data tools and specialist engineers to analyse
                  historic datasets of any asset
                </li>
              </TickList>
              {/* <BlockCTA secondary url="/service/technical-design" arrow="right">
                Find out more
              </BlockCTA> */}
            </Col10>
            <Col2>
              <Image
                src="/images/newnham-solar-farm.jpg"
                title="Technical design at Newnham Solar Farm"
                caption="Newnham Solar Farm"
              />
            </Col2>
          </div>
        </Section>
        <div className="divider" />
        <Section>
          <div className="row">
            <Col2>
              <Image
                src="/images/bay-solar-farm.jpg"
                title="Asset Management at Bay Solar Farm"
                caption="Bay Solar Farm"
              />
            </Col2>
            <Col10>
              <Heading underlined>Asset Management</Heading>
              <p>
                Our dedicated Operation &amp; Maintenance team has serviced
                thousands of systems, including private homes, social housing,
                commercial businesses and large-scale grounded¬ mount solar
                farms, for over 10 years, and we currently provide O&amp;M and
                asset services to over 150MW of ground mounted solar assets.
                Whatever the set up, we can make sure that it performs
                optimally, protecting the asset owner’s investment.
              </p>
              <TickList>
                <li>
                  Maximise power output and investment return and ensure ongoing
                  system safety.
                </li>
                <li>
                  Ensuring savings for power plant owners through a combination
                  of preventive maintenance and high-quality data analysis from
                  the latest software.
                </li>
              </TickList>
              {/* <BlockCTA secondary url="/service/asset-management" arrow="right">
                Find out more
              </BlockCTA> */}
            </Col10>
          </div>
        </Section>
        <div className="divider" />
        <div className="container">
          <StatsBlock business />
        </div>
        <div className="divider" />
      </Block>
    </div>
  )
}

export default HomepageB2b
