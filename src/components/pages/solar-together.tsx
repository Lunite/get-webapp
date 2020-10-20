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
const bothlogos = require('../../images/bothlogos.png');
const placeholder = require('../../images/placeholder.png');
const install1 = require('../../images/install1.jpg');
const jinko = require('../../images/jinko.png');
const image2 = require('../../images/blackpanels2.jpg');
const image1 = require('../../images/tshirt.jpg');

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
          <div className="row" style={{paddingBottom:"70px"}} >
          <Col11 style={centerstyle}>
                <Image 
                  src={bothlogos}
                  title="Solar Together Logo"
                  caption="​"
                 
                />
          </Col11>
        </div>
        </div>

        <div className="container u-layout--indent">

          <div className="row">
            <Col11>

              <p>
              Green Energy Together is proud and excited to announce our new partnership with Solar Together, a group-buying programme that brings together households and local authorities across the country to get high quality solar panels at highly competitive prices. 
              </p>
              <p>
              The scheme is now open to all Devon residents who own their own house or have permission from the landlord to install a solar PV, enabling them to install solar technology on their homes at an affordable price.
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
              <Heading level={3}>About us</Heading>
              <p>
              For more than a decade, our team has designed, engineered, installed and maintained tens of thousands of domestic rooftops and commercial solar power systems across the UK. Our experience covers all facets of solar - from large-scale ground mount to bespoke designs and a number of historic British landmarks, such as King's College Hospital and Paddington Train Station.
              </p>
              <Icon alias="power" style={{ fontSize: 90 }} />
              <Heading level={4}>Our history</Heading>
              <p>
              It all began as a family solar panel business in 2009 in Hertfordshire, England. Over the years, the business has grown considerably, both fuelling and sustaining the increasing awareness and adoption of renewable energy sources. Today, Green Energy Together is a leading British solar energy company with over 400MW of solar installed. 


              </p>
              <Icon alias="solar-panel" style={{ fontSize: 90 }} />

            </Col8>
            <Col4>
              <HighlightBlock
                title="Get in touch"
                action={goToProducts}
                actionText="Call now"
              >
                <li>
                  <Icon alias="email" />
                  Fill out our <a href="/contact-us" style={{color:"white", fontWeight:"bold"}} target="_blank">Contact Form</a>
                </li>
                <li>
                  <Icon alias="at" />Email <a href="mailto:devon@get-uk.com" style={{color:"white", fontWeight:"bold"}}>devon@get-uk.com</a>
                </li>
                <li>
                  <Icon alias="phone" /> Phone 
                  <a href="tel:02037703494" style={{color:"white", fontWeight:"bold"}}> 0203 770 3494</a>
                </li>
              </HighlightBlock>
            </Col4>
          </div>

          {/* from service template */}

          <Block className="service__block-1">

            <div className="container">
              <Col8 >
                <Heading level={3}>How does it work?</Heading>
                <p>Solar panels are not complex, but buying a solar system can be daunting. Solar Together makes getting the best deal easy, keeping you informed at every stage of the way.</p>
                <div className="service__highlights">

                  <div className="highlight">
                    <div className="highlight__icon">
                      <Icon alias="solar-energy" />

                    </div>
                    <div className="highlight__contents">
                      <h4>
                        Register
                  </h4>
                      <p>If you haven't done it yet, <a href="https://www.solartogether.co.uk/landing" style={{color:"#70b33b", fontWeight:"bold"}} target="_blank">click here</a> to choose your local area, and receive your personal recommendation for your home from Solar Together.</p>
                    </div>
                  </div>

                  <div className="highlight">
                    <div className="highlight__icon">
                      <Icon alias="solar-house" />

                    </div>
                    <div className="highlight__contents">
                      <h4>
                      Book Your Survey
                  </h4>
                      <p>Once you have registered with Solar Together and your initial recommendation has been agreed we will reach out to you to book your survey. If you have any questions don't hesitate to contact us on <a href="tel:02037703494" style={{color:"#70b33b", fontWeight:"bold"}}>0203 770 3494</a> or email us at <a href="mailto:devon@get-uk.com" style={{color:"#70b33b", fontWeight:"bold"}}>devon@get-uk.com</a>.</p>
                    </div>
                  </div>

                  <div className="highlight">
                    <div className="highlight__icon">
                      <Icon alias="worker" />

                    </div>
                    <div className="highlight__contents">
                      <h4>
                      Arrange Your Install
                  </h4>
                      <p> After your survey has taken place and you confirm you're happy with your refined quote our team will be in touch with you to arrange your installation, so you can start generating green, renewable electricity! </p>
                    </div>
                  </div>

                </div>
              </Col8>

              <Col3>

                <Image
                  src={image1}
                  title="Solar Together Logo"
                  caption="​"
                />

                <Image
                  src={image2}
                  title="Green Energy Together installers"
                  caption="​"
                />
              </Col3>

            </div>

          </Block>





          {/* END from service template */}

          <Block>
              <div className="row" style={{ marginTop: '-100px' }}>

                      <Col5 >
                          <Image
                            src={jinko}
                            title="title"
                          />
                      </Col5>
                      <Col7 

                                   >
                          <Heading level={3}>PV system components</Heading>
                          <p>
                          Your solar system will include a combination of the following:
                          </p>
                          <TickList>
                              <li><span >Panels:</span> 
                                <a target="_blank" href="https://www.get-uk.com/static/0cc6ba67381f58a5168e6b26b6485f8f/get-tr-jkm340-360m-6tl3-b-a1c1-en-jinko-340w.pdf"style={{color:"#3c96c5", fontWeight:"normal"}} > Jinko Mono Perc All Black</a></li>                              
                              <li>Inverter:  
                                <a target="_blank" style={{color:"#3c96c5", fontWeight:"normal"}} href="https://www.get-uk.com/static/59c3b59f0a100e75c86ee650c8dd72c5/get-single-phase-f-series.pdf"> F Series Dual MPPT Inverter</a> or 
                                <a target="_blank" style={{color:"#3c96c5", fontWeight:"normal"}} href="https://www.get-uk.com/static/a6f12873ad3ceddf721e2cb561c16ab1/get-ess-s-series-inverter.pdf"> S Series Single MPPT Inverter</a>, 
                                <a target="_blank" style={{color:"#3c96c5", fontWeight:"normal"}} href="https://www.get-uk.com/static/52f4549de4db8bb0bdd05019857cce91/get-solar-edge-inverter.pdf"> Solar Edge Optimised option </a>
                              </li>
                              <li>Battery: 
                                <a target="_blank" style={{color:"#3c96c5", fontWeight:"normal"}} href="https://www.get-uk.com/static/7fe21c9666df1bc913c929d94cea437f/get-ultra-sp-ac-battery.pdf"> FoxESS Single Phase  </a> or 
                                <a target="_blank" style={{color:"#3c96c5", fontWeight:"normal"}} href="https://www.get-uk.com/static/a0523e0c86e10fb97b1e03e9f290a57c/get-ultra-sp-hybrid-battery.pdf"> Hybrid Battery Storage  </a> 
                              </li>
                              <li>Optimized Option:
                                <a target="_blank" href="https://www.get-uk.com/static/d0b3497e2a74da2c6b50130db4fa3da8/get-solar-edge-power-optimizer.pdf" style={{color:"#3c96c5", fontWeight:"normal"}}> Solar Edge Panel Power Optimisers </a> 
                              </li>                            
                              <li>Power Controller:  
                                <a target="_blank" href="https://www.get-uk.com/static/32e544b3601896dfb39de61a9527fdc5/get-immersun-automatic-power-controller.pdf" style={{color:"#3c96c5", fontWeight:"normal"}}> Immersun automatic</a>
                              </li>
                              <li>Optional Extra: 
                                <a target="_blank" href="https://www.get-uk.com/static/0cd052464a39734397a8a012e5909e9a/get-enviroguard-solar-panel-bird-exclusion-system-product-spec-sheet.pdf" style={{color:"#3c96c5", fontWeight:"normal"}}>  Envirogaurd Panel Bird Exclusion </a>,
                                <a target="_blank" href="https://www.get-uk.com/static/88e32f77bb85a4d68d644bbdfb3ec370/get-brostrend_wi-fi_range_extender_signal_booster_manual_e1_v1_v2.pdf" style={{color:"#3c96c5", fontWeight:"normal"}}> BrosTrend AC1200 WiFi Booster</a> and 
                                <a target="_blank" style={{color:"#3c96c5", fontWeight:"normal"}} href="https://www.get-uk.com/static/727e1b70b592aea705519f9e8e6ef7e5/get-renusol-vs-.pdf"> Renusol Mounting System</a>
                              </li>


                          </TickList>
                      </Col7>
                  </div>
              
          </Block>

          <div className="row" >
              <Col9>
                  <Heading level={3}>Learn more about Solar Together</Heading>
              </Col9>
              <Col11>
                  <p>
                      To find out more about this exciting opportunity <a href="https://www.solartogether.co.uk/info/5-most-frequently-asked-questions" style={{color:"#70b33b", fontWeight:"bold"}} target="_blank">click here</a> to read Solar Together Frequently Asked Questions page, or check out the video below. 
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
