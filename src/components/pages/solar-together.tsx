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
import "./faq.scss"
import Collapsible from "../configurable/Collapsible"

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
                  <a href="tel:02038669896" style={{color:"white", fontWeight:"bold"}}> 020 3866 9896</a>
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
                      <p>If you haven't done it yet, <a href="https://www.solartogether.co.uk/devon/home" style={{color:"#70b33b", fontWeight:"bold"}} target="_blank">click here</a> to choose your local area, and receive your personal recommendation for your home from Solar Together.</p>
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
                      <p>Once you have registered with Solar Together and your initial recommendation has been agreed we will reach out to you to book your survey. If you have any questions don't hesitate to contact us on <a href="tel:02038669896" style={{color:"#70b33b", fontWeight:"bold"}}>020 3866 9896</a> or email us at <a href="mailto:devon@get-uk.com" style={{color:"#70b33b", fontWeight:"bold"}}>devon@get-uk.com</a>.</p>
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
                  To find out more about this exciting opportunity check out the video below. To read Solar Together Frequently Asked Questions page <a href="https://www.solartogether.co.uk/info/5-most-frequently-asked-questions" style={{color:"#70b33b", fontWeight:"bold"}} target="_blank">click here</a>, or find out more about the registration process at <a href="https://www.youtube.com/watch?v=0qP93bnbm08" style={{color:"#70b33b", fontWeight:"bold"}} target="_blank">Solar Together Youtube channel.</a>
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
                src={`https://www.youtube.com/embed/sXZvvBBTZhE`}
                frameBorder="0"
              />
            </div>
          </Col9>
        </div>

        {/* Start FAQs block */}

        <div className="faq-page" style={{marginTop:"70px"}}> 
          <Block>
            <div className="container u-layout--indent">
              <div className="row">
                <Col9>
                    <Heading level={3}>Still Have Questions?</Heading>
                </Col9>
                <Col11>
                  <p>
                  Please check out our FAQ below. Don't see an answer to your question? Feel free to contact us on <a href="tel:02038669896" style={{color:"#70b33b", fontWeight:"bold"}}>020 3866 9896</a> or email us at <a href="mailto:devon@get-uk.com" style={{color:"#70b33b", fontWeight:"bold"}}>devon@get-uk.com</a>
                  </p>
                </Col11>
              </div>        
            </div>              
            <div className="container u-layout--squidge container--column" style={{marginTop:"70px", marginBottom:"-100px"}}>             
                <Collapsible                   
                    heading='How long do the solar panels usually last beyond the 25-year warranty?'
                    content='The Solar Panel itself will continue to generate after the 25 year warranty however the cell within it will continue to degrade outside of the warranted performance timeframe so we would recommend that the panels are replaced to ensure you can get the most of the renewable energy.'
                  />
                <Collapsible                   
                    heading='Do Solar Panels work with Smart Meters?'
                    content='Yes, Solar Panels work with Smart Meters, the more energy you generate and use in your household the less energy your meter will record from the grid. Your Smart Meter will also record export if you are using this for the Smart Export Guarantee however the meter we install will also record this.'
                  />
                <Collapsible                   
                    heading='Can we add a battery at a later date?'
                    content='Yes, a battery can be added at a later date, it is more cost effective to install at the same time as the solar panels however not essential.'
                  />
                <Collapsible                   
                    heading='What Maintenance is required on the panels and how often?'
                    content='As part of the installation we will connect your solar panels to a monitoring portal, this will send you any notifications if the system is not working as it should. In these instances, you should contact us and we will remotely diagnose any issues with your system. With regards to maintenance we recommend the panels are cleaned every 2 years, this can be done using a window cleaning contractor or we can provide this service. Electrical inspection is recommended to be every 2 years with the system being retested at this time.'
                  />
                <Collapsible                   
                    heading='Can panels go onto a flat roof?'
                    content='Yes this is possible, depending on the type of roof which we will determine during your survey we will be able to install a flat roof mounting structure fixed direct or supported using ballast.'
                  />
                <Collapsible                   
                    heading='How easy is it to repair the roof under panels?'
                    content='It is very simple, the panels are fixed using clamps which can be removed to allow access to the roof underneath it. We will check your roof prior to install and take lots of photos during the install to ensure we do not cause any damage.'
                  />
                <Collapsible                   
                    heading='What about multiple roof’s?'
                    content='We can install Solar on multiple roof’s, it will affect how the panels are connected to each other so we will determine the best way to install them at the design stage.'
                  />
                <Collapsible                   
                    heading='How much does a solar panel weigh?'
                    content='Typically a solar panels weights between 18-20 KG’s.'
                  />
                <Collapsible                   
                    heading='How delicate are the panels? As an example on a windy day will a falling branch damage the panels?'
                    content='The Solar Panels are very durable to ensure they last the full warranted 25 years. Birds, branches and minor debris will not damage the panels as the glass is designed to protect them.'
                  />
                <Collapsible                   
                    heading='Are we able to get electricity during a power cut?'
                    content='Typically no, however if you opt to have an Emergency Power Source (EPS) fitted with your solar panels you can use the charged energy (if you have a battery) from the Solar Panels on a selected outlet.'
                  />
                <Collapsible                   
                    heading='If the battery is full what happens to the surplus energy?'
                    content='In the first instance the solar energy will be directed to your house if you need the energy, the solar energy will then be directed to your batteries if you do not need the solar energy at that time. Once the batteries are full and you do not need the solar energy the energy will be exported to the grid. Please note if you want to change the operation of the batteries to work differently this can be done through the battery app.'
                  />
                <Collapsible                   
                    heading='Have you ever fitted any solar panels on a church roof?'
                    content='This is not something we have seen very often over the years however we have done 2 installations on church roofs. Due to the age of the buildings planning consent was needed on both occasions.'
                  />
                <Collapsible                   
                    heading='With technology changing all the time, how do we know if these panels and batteries wont be out of date in a year or so?'
                    content='The Panels, Inverters and Batteries we supply are at the forefront of the domestic market ensuring we are giving you the best technology available. Obviously over time technology improves however the estimated savings and performance of your system that we have designed is based on the technology present today. It may be that product development makes it cost effective in the future to change pieces of equipment for improved technology which is why we make sure each component is interchangeable.'
                  />
                <Collapsible                   
                    heading='Does my inverter need changing if I install a battery retro-fit?'
                    content='No, the battery system we offer can be stand alone from your existing inverter, however depending on the age of the inverter and where it is within its warranty lifecycle it may be cost effective for you to change it during the works.'
                  />
                <Collapsible                   
                    heading='Does your export company need to be the same company that you buy your energy from?'
                    content='No however often the grid supplier will offer preferential rates for export if they are involved in the Smart Export Guarantee scheme.'
                  />
                <Collapsible                   
                    heading='What Battery technology are you using: Lead or Lithium?'
                    content='The battery cells used are Class 1 Lithium Cells'
                  />
                <Collapsible                   
                    heading='How many charge cycles do they last for?'
                    content='We have a unique agreement with the battery supplier that means the battery is warranted for a length of time rather than cycles. This is 15 years from the date of installation and includes a performance warranty for this period also.'
                  />
                <Collapsible                   
                    heading='Typical Panel Failure rate'
                    content='0.05% is considered the typical panel failure rate which equates to a median failure rate of 5 out of 10,000 annually.'
                  />
                <Collapsible                   
                    heading='Do I have to have an up to date electrical certificate for installation to take place?'
                    content='No, it is not a requirement, we will carry out a minor works certificate on your property on completion of your installation. If we do find anything which requires attending from a safety perspective, we will assist with making it safe on site and offer you some advice about getting it repaired if necessary.'
                  />
                <Collapsible                   
                    heading='Do you make sure that any cabling is hidden within the cavity walls? I wouldn’t want cables to be visible outside or in?'
                    content='We will review the best cable routes with you when on site carrying out the survey to ensure the installation has minor impact on your property. Where possible we will install within the floor space and cavity walls however this is not always possible. In these instances, we will contain the cabling within aesthetically pleasing containment to ensure it does not detriment your property. We will agree this with you prior to any works taking place.'
                  />
                <Collapsible                   
                    heading='If I am planning to move in a few years, is it worth to invest in solar panels?'
                    content='More than ever! New research indicates that installing solar on your property can boost its value by over £30,000.'
                  />
                <Collapsible                   
                    heading='Does the power diverter work in conjunction with a gas boiler or do you end up heating water all with electricity?'
                    content='We will check your Gas and Electrical heating arrangement before recommending the Power Diverter to ensure that the Gas will only be utilised when required.'
                  />
                <Collapsible                   
                    heading='To get the best out of the battery, I was told that it`s best to use all the electricity/or as much as possible that it`s produced in one day. If you can`t - especially during the summer months will this be detrimental to the battery?'
                    content='This is not the case, the battery will store the energy until when you need to use it, if you consider that when the sun is down you will not be using any Solar Energy the Battery will be supplying you with any energy you have saved from the Solar (that your house did not need) during the day at night time to ensure you import as little power as possible, this will continue until the battery reaches its minimum charge level.'
                  />
                <Collapsible                   
                    heading='Where is the equipment Manufactured?'
                    content='The technology is manufactured from various locations throughout the world with the largest location being China. This is because the raw materials required for the Solar Panels and Batteries are readily available in China whereas they have to be imported in most other regions. We ensure all of our products and warranties are procured with market leading protections to ensure you receive the best product.'
                  />
                </div>              
          </Block>          
        </div> 
      
         {/* Ends FAQs block */}


      </Block>
    </div>
  )
}

export default SolarTogether
