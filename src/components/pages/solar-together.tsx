import React from "react"
import Img from "gatsby-image"
import Hero from "../configurable/Hero"
import Heading from "../configurable/Heading"
import Block from "../configurable/Block"
import Col3 from "../grid/Col3"
import Col9 from "../grid/Col9"
import Col4 from "../grid/Col4"
import Col8 from "../grid/Col8"
import Col5 from "../grid/Col5"
import Col7 from "../grid/Col7"
import Image from "../configurable/Image"
import Icon from "../olc-framework/Icon"
import Col11 from "../grid/Col11"
import Col12 from "../grid/Col12"
import Col6 from "../grid/Col6"
import HighlightBlock from "../configurable/HighlightBlock"
import Grid from "../configurable/Grid"
import { markdownNodesFilter } from "~/utils"
import TickList from "../configurable/TickList"
import BlockCTA from "../configurable/BlockCTA"


import "./solar-together.scss"

const logo = require('../../images/solar-together-logo.png');
const placeholder = require('../../images/placeholder.png');

const SolarTogether = ({ markdownNodes }) => {
  const productsBlockRef = React.createRef() as React.RefObject<HTMLElement>

  const productsWarranties = markdownNodesFilter(
    markdownNodes,
    "products_and_warranties"
  )

  const goToProducts = () => {
    productsBlockRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  const centerstyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  };

  return (
    <div className="products-and-warranties content-page">
      <Hero imageUrl="/images/products-warranties-banner.jpg" compact>
        <Heading level={1} underlined>
          Solar Together
        </Heading>
      </Hero>
      <Block>
        <div className="container u-layout--indent">
          <div className="row">
            <Col11>
              <Heading level={2}>A new partnership</Heading>
              <p>
                We believe in the solar future.  We believe the future of energy
                is green, renewable, ethical and fair-priced and our transparent
                approach places us well to deliver the future, now.
              </p>
              <p>
                As one of the largest commercial installers in the country, with
                over 400 million watts of solar generated in the last decade
                including landmarks like King's College Hospital and Paddington
                Train Station, we get great deals directly from the
                manufacturers and we pride ourselves on our fair market pricing.
              </p>

            </Col11>
          </div>
          <div
            className="row"
            style={{
              marginTop: 78,
            }}
          >
            <Col8
              style={{
                borderTop: "1px solid #d1d1d1",
                paddingTop: 52,
              }}
            >
              <Heading level={3}>Peace of mind</Heading>
              <p>
                Every step of the process and scope of the work is clearly
                outlined and explained. We pride ourselves on ensuring that you
                understand everything clearly before making the decision to go
                green. Our service includes the offer of a detailed
                commissioning review. A qualified engineer will review the
                documentation, undertake any necessary registrations for the
                property and issue them on your behalf.
              </p>
              <Icon alias="power" style={{ fontSize: 90 }} />
              <Heading level={4}>Performance optimisation</Heading>
              <p>
                Operations &amp; Maintenance plans are essential for the
                majority of solar installations. At Green Energy Together, for 2
                years after your install we'll look after you and


              </p>
              <Icon alias="solar-panel" style={{ fontSize: 90 }} />

            </Col8>
            <Col4>
              <HighlightBlock
                title="Warranty Data"
                action={goToProducts}
                actionText="Jump to products area"
              >
                <li>
                  <Icon alias="battery-charging" />
                  5+ years warranty on inverters
                </li>
                <li>
                  <Icon alias="worker" />2 years workmanship warranty
                </li>
                <li>
                  <Icon alias="sun" />
                  25+ years performance warranty and 10+ years product warranty
                  on panels
                </li>
              </HighlightBlock>
            </Col4>
          </div>

          {/* from service template */}

          <Block className="service__block-1">

            <div className="container">
              <Col8 >
                <Heading level={3}>The process</Heading>
                <p>Every step of the process and scope of the work is clearly
                outlined and explained. We pride ourselves on ensuring that you
                understand everything cl</p>
                <div className="service__highlights">

                  <div className="highlight">
                    <div className="highlight__icon">
                      <Icon alias="solar-house" />

                    </div>
                    <div className="highlight__contents">
                      <h4>
                        After analysing a number of k
                  </h4>
                      <p>Maintenance plans are essential for the
                      majority of solar installations. At Green Energy Together, for 2
                years after your install we'll look after you and</p>
                    </div>
                  </div>

                  <div className="highlight">
                    <div className="highlight__icon">
                      <Icon alias="energy-transform" />

                    </div>
                    <div className="highlight__contents">
                      <h4>
                        After analysing a number of k
                  </h4>
                      <p> After analysing a number of key factors, including your
                      location, building and roof orientation and inclination, we
                    use state-of-the-art </p>
                    </div>
                  </div>

                  <div className="highlight">
                    <div className="highlight__icon">
                      <Icon alias="energy-transform" />

                    </div>
                    <div className="highlight__contents">
                      <h4>
                        After analysing a number of k
                  </h4>
                      <p> After analysing a number of key factors, including your
                      location, building and roof orientation and inclination, we
                    use state-of-the-art </p>
                    </div>
                  </div>

                </div>
              </Col8>

              <Col3>

                <Image
                  src={placeholder}
                  title="title"
                  caption="x"
                />

                <Image
                  src={placeholder}
                  title="title"
                  caption="x"
                />
              </Col3>

            </div>

          </Block>





          {/* END from service template */}

          <Block>
              <div className="row" style={{ marginTop: '-100px' }}>
                  <div id='CenterWrapper' style={{display: 'flex', flex: 1}}>
                      <Col5 style={centerstyle}>
                          <Image
                            src={placeholder}
                            title="title"
                          />
                      </Col5>
                      <Col7>
                          <Heading level={3}>Components</Heading>
                          <p>
                              We believe sustainable options should be available and affordable
                              for everyone — affordability shouldn't cost your peace of mind. options should be available and affordable
                              for everyone — affordability shouldn't cost your peace of mind.
                          </p>
                          <TickList>
                              <li>As one of the largest installers in the country,</li>
                              <li>As one of the largest installers in the country,</li>
                              <li>As one of the largest installers in the country,</li>
                              <li>As one of the largest installers in the country,</li>
                          </TickList>
                      </Col7>
                  </div>
              </div>
          </Block>


          <div className="row" >
              <Col9>
                  <Heading level={3}>Learn more about Solar Together</Heading>
              </Col9>
              <Col11>
                  <p>
                      Our usage-based model makes our designs really cost effective.
                      Our team will only recommend the system that works best for you,
                      based on the amount of energy you use
                  </p>
              </Col11>
          </div>
        </div>
        <div className="row" >

          <Col9 style={{ margin: "0 auto", marginBottom: "-80px", padding: "20px" }} >

            <div
              className="video"
              style={{
                marginTop: "50px",
                position: "relative",
                paddingBottom: "56.25%" /* 16:9 */,
                paddingTop: 25,
                height: 0
              }}
            >
              <iframe
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%"
                }}
                src={`https://www.youtube.com/embed/0qP93bnbm08`}
                frameBorder="0"
              />
            </div>

          </Col9>

        </div>


      </Block>





    </div>
  )
}

export default SolarTogether
