import React, { useContext, useEffect } from "react"
import Hero from "~/components/configurable/Hero"
import Heading from "~/components/configurable/Heading"
import Block from "../configurable/Block"
import Quote from "../configurable/Quote"
import Section from "../configurable/Section"
import TickList from "../configurable/TickList"
import BlockCTA from "../configurable/BlockCTA"
import Col10 from "../grid/Col10"
import Col2 from "../grid/Col2"
import Col9 from "../grid/Col9"
import Col3 from "../grid/Col3"
import Col8 from "../grid/Col8"
import Col4 from "../grid/Col4"
import Col7 from "../grid/Col7"
import Col5 from "../grid/Col5"
import Image from "../configurable/Image"
import Shoutout from "../configurable/Shoutout"
import StatsBlock from "../standalone/StatsBlock"

import "./for-your-business.scss"
import Banner from "../configurable/Banner"
import { Link } from "gatsby"
import CaseStudiesMap from "../configurable/CaseStudiesMap"
import Icon from "../olc-framework/Icon"
import { CustomerTypeContext } from "~/providers/CustomerTypeProvider"

const HomepageB2b = ({ markdownNodes }) => {
  const { setCustomerType } = useContext(CustomerTypeContext)

  useEffect(() => {
    setCustomerType("commercial")
  }, [])

  return (
    <div className="homepage-b2b">
      {/* <Banner className="visible-xs">
        <Link to="/">Go to Domestic Site</Link>
      </Banner>   
      <Banner className="visible-xs banner--solar-together">
        <Link to="/solar-together">Solar Together</Link>
      </Banner> */}
      <Hero
        className="homepage__hero"
        imageUrl="/images/b2b-video.jpg"
        video="https://vimeo.com/418982748"
        overlapBlock={
          <div className="hidden-xs">
            <Quote
              title="Let us produce a solar business case for you"
              description="No one understands solar better than us, and we love efficient processes. Give us a call or request a free consultation in seconds, so you can concentrate on what matters most - operating your business."
              ctaText="Get In Touch"
              compact
            />
          </div>
        }
      >
        <Heading level={1}>Future proof your business</Heading>
        <p>We are here to help you grow</p>
        {/* <BlockCTA url="/projects">Find Out More</BlockCTA> */}
      </Hero>
      <Block  >
        <Section className="visible-xs">
          <Quote
            title="Let us produce a solar business case for you"
            description="No one understands solar better than us, and we love efficient processes. Give us a call or request a free consultation in seconds, so you can concentrate on what matters most - operating your business."
            ctaText="Get In Touch"
            compact
          />
        </Section>
        <Section className="business-content-wrapper">
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
            <Col8>
              <Heading underlined>Industrial Commercial Solutions</Heading>
              <p>
                We offer a one-stop service for all your needs, from consulting
                and design to installation and lifetime maintenance. Our package
                offers:
              </p>
              <TickList>
                <li>
                  Full assessment of your energy consumption profile, with an
                  obligation-free report.
                </li>
                <li>
                  We take care of the entire project, from grid connection to
                  certification, plus a 2-year guarantee.
                </li>
              </TickList>

              <BlockCTA secondary url="/service/industrial-commercial-solutions" arrow="right">
                Find out more
              </BlockCTA>
            </Col8>
            <Col4>
              <Image
                src="/images/paddington-station.jpg"
                title="Commercial Installation at Paddington Station, London UK"
                caption="Paddington Station, London UK"
              />
            </Col4>
          </div>
        </Section>
        <div className="divider" />
        <Section>
          <div className="row">
            <Col4>
              <Image
                src="/images/no-idea.jpg"
                title="Commercial Installation at Kelly Solar Farm"
                caption="Kelly Solar Farm"
              />
            </Col4>
            <Col8>
              <Heading underlined>Operation &amp; Maintenance</Heading>
              <p>
                Our dedicated Operation &amp; Maintenance team provides O&amp;M
                and asset services, making sure your set-up performs optimally.
              </p>
              <TickList>
                <li> 
                  We offer preventative maintenance scheduling, full system
                  monitoring and control, as well as fault rectification.
                </li>
                <li>
                  We ensure savings for power plant owners through preventive
                  maintenance and high-quality data analysis from the latest
                  software.
                </li>
              </TickList>
              <BlockCTA secondary url="/service/operation-maintenance" arrow="right">
                Find out more
              </BlockCTA>
            </Col8>
          </div>
        </Section>
        <Shoutout
          image={<Image src="/images/hold.jpg" title="Products" />}
          text={
            <>
              <Heading underlined>Products &amp; Warranties</Heading>
              <p>
                We believe sustainable options and peace of mind should be
                generally available and affordable. As one of the largest
                installers in the country, we deal directly with manufacturers,
                letting us offer highly competitive prices and unique warranties
                and service guarantees.
              </p>
              <BlockCTA url="/products-warranties">Find out more</BlockCTA>
            </>
          }
        />
        <Section>
          <div className="row">
            <Col8>
              <Heading underlined>Asset Management</Heading>
              <p>
                We provide a full range of Asset Management Services, as a
                package or on their own, to safely maximise output and
                efficiency.
              </p>
              <TickList>
                <li>
                  We offer uninterrupted monitoring to compare the asset’s
                  digital data and information with its actual physical status.
                </li>
                <li>
                  We provide extensive performance analysis to identify root
                  causes of underperformance.
                </li>
              </TickList>
               <BlockCTA secondary url="/service/asset-management" arrow="right">
                Find out more
              </BlockCTA> 
            </Col8>
            <Col4>
              <Image
                src="/images/newnham-solar-farm.jpg"
                title="Technical design at Newnham Solar Farm"
                caption="Newnham Solar Farm"
              />
            </Col4>
          </div>
        </Section>
        <div className="divider" />
        <Section>
          <div className="row">
            <Col4>
              <Image
                src="/images/bay-solar-farm.jpg"
                title="Asset Management at Bay Solar Farm"
                caption="Bay Solar Farm"
              />
            </Col4>
            <Col8>
              <Heading underlined>Technical Design</Heading>
              <p>
                Green Energy Together offers expert technical consultancy across
                all components of the planning and installation process.
              </p>
              <TickList>
                <li>
                  We provide a comprehensive suite of services for assessing the
                  viability of a project, ensuring you get the best value for
                  money.
                </li>
                <li>
                  We provide expert project management, ensuring your milestones
                  run smoothly and efficiently.
                </li>
              </TickList>
              <BlockCTA secondary url="/service/technical-design" arrow="right">
                Find out more
              </BlockCTA>
            </Col8>
          </div>
        </Section>
        <Section>
          <>
            <div className="visible-xs">
              <StatsBlock device="mobile" business />
            </div>
            <div className="hidden-xs">
              <StatsBlock device="desktop" business />
            </div>
          </>
        </Section>
        <Section>
          <Heading underlined>Business Case Studies</Heading>
          <p>
            We provide a turnkey supply, installation and maintenance service
            for industrial commercial solar systems. provide and commercial
            solar systems. provide a turnkey supply, installation and
            maintenance service for industrial and commercial solar systems.
          </p>
          <p>
            <Link
              to="/projects"
              style={{
                color: "#70b33b",
                fontWeight: "bold",
              }}
            >
              <span style={{ textDecoration: "underline" }}>
                All Case Studies
              </span>
              <Icon style={{ marginLeft: "5px" }} alias="long-arrow" />
            </Link>
          </p>
          <CaseStudiesMap
            markdownNodes={markdownNodes}
            customerType="commercial"
          />
        </Section>
      </Block>
    </div>
  )
}

export default HomepageB2b
