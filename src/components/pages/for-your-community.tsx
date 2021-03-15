import React, { FunctionComponent, useContext, useEffect } from "react"
import Markdown from "react-markdown"
import Img from "gatsby-image"
import Hero from "~/components/configurable/Hero"
import Heading from "~/components/configurable/Heading"
import Block from "~/components/configurable/Block"
import Col3 from "~/components/grid/Col3"
import Col9 from "~/components/grid/Col9"
import Col10 from "~/components/grid/Col10"
import Col6 from "~/components/grid/Col6"
import Icon from "~/components/olc-framework/Icon"
import Image from "../configurable/Image"

import "./for-your-community.scss"
import { CustomerTypeContext } from "~/providers/CustomerTypeProvider"
import BlockCTA from "../configurable/BlockCTA"
import Banner from "../configurable/Banner"
import { Link } from "gatsby"


const image1 = require('../../images/raven.jpg');
const image2 = require('../../images/southcambridge.jpg');
const separator = require('../../images/commmid.jpg');


const HomepageCommunity = ({ markdownNodes }) => {
  const { setCustomerType } = useContext(CustomerTypeContext)

  useEffect(() => {
    setCustomerType("solartogether")
  }, [])


  return (
    <div className="service">
             <Banner className="visible-xs" >
        <Link to="/for-your-business" >Go to Business Site</Link>
      </Banner> 
       {/* <Banner className="banner2 visible-xs">
        <Link to="/">Go to Domestic Site</Link>
      </Banner>  */}
      <Hero imageUrl="/images/breadcrumb6.png" compact>
        <Heading level={1} underlined>
          Community Energy
        </Heading>
      </Hero>
      
      <Block className="service__block-1">
        <div className="container">
          <Col9 squidge>
            <Heading level={2}>Solar for everyone</Heading>
              <p>An increasing number of communities and housing associations are taking advantage of the support available from investors, private organisations, and governmental programs to bring renewable technology to their locality while generating revenue for the organisation.</p>
            <div className="service__highlights">
              
                <div className="highlight">
                  <div className="highlight__icon">
                    <Icon alias="solar-house" />
                  </div>
                  <div className="highlight__contents">
                    <h3>Fully funded PV - Solar PPA</h3>
                    <p>Social or community energy can take many forms. In some cases solar technology is provided at no cost to tenants, landlords or the housing association. A percentage of the energy generated is used to power tenants’ homes and communal areas, while the remaining is sold to a licensed supplier or the national grid for use off-site. The council or association receives a payment for every installation.</p>
                  </div>
                </div>
              
                <div className="highlight">
                  <div className="highlight__icon">
                    <Icon alias="energy-transform" />
                  </div>
                  <div className="highlight__contents">
                        <h3>Solar collectives</h3>
                        <p>In other cases a small group comprising homeowners with the shared interest of leveraging their group buying power to obtain better prices for solar PV and battery storage systems band together enjoying discounts for all members.</p>
                  </div>
                </div>
              
            </div>
          </Col9>
          
          <Col3>
          <div style={{marginBottom:"40px"}}>
            <Image
              src={image1}
              title="Solar Together Logo"
              caption="​"
            />
            
                          <BlockCTA secondary url="/project/very-happy-with-the-system-we-purchased/" arrow="right">
                See case study
              </BlockCTA></div>
            <div>
            <Image
              src={image2}
              title="Green Energy Together installers"
              caption="​"
            />
                          <BlockCTA secondary url="/project/south-cambridgeshire-district-council/" arrow="right">
                          See case study
              </BlockCTA>
              </div>
          </Col3>
          
        </div>
      </Block>
      
        <Block className="wide-image">

         
        <Image
              className="wide-image__img"
              src={image2}
              title="Green Energy Together installers"
              caption="​"
            />
        
        </Block>
    
        <>
          <Block className="service__block-2">
            <div className="container">
              <Col10 indent>
                <Heading level={2}>Removing barriers to sustainability</Heading>
                <Markdown> We believe that wide adoption of renewable technologies requires a wider approach to our concept of sustainability. Climate solutions are only solutions if they can be sustained long term. They must be financially sustainable for all stakeholders, including local governments and investors, and they must include all strata of society.</Markdown>
                <div className="service__highlights">
                  
                    <div className="highlight">
                      <div className="highlight__icon">
                        <Icon alias="solar-house" />
                      </div>
                      <div className="highlight__contents">
                      <h3>The green future now
</h3>
                        <p>Through viable business models that remove the privilege from sustainability the green future can be achieved, and there is ample support for local communities to join that future. </p>
                      </div>
                    </div>
                 
                 
                    <div className="highlight">
                      <div className="highlight__icon">
                        <Icon alias="energy-transform" />
                      </div>
                      <div className="highlight__contents">
                        <h3>What are the benefits?</h3>
                        <p>Benefits include cutting carbon emissions significantly, produce cheaper electricity for tenants and direct payments to the housing association or council for every installation. Get in touch and learn how community energy can benefit your organisation.</p>
                      </div>
                    </div>
                  
                </div>
              </Col10>
            </div>
          </Block>
        </>
     
    </div>
  )
}

export default HomepageCommunity
