import React, { useContext } from "react"
import Img from "gatsby-image"
import Hero from "../configurable/Hero"
import Heading from "../configurable/Heading"
import Block from "../configurable/Block"
import Image from "../configurable/Image"
import Icon from "../olc-framework/Icon"
import HighlightBlock from "../configurable/HighlightBlock"
import Grid from "../configurable/Grid"
import { markdownNodesFilter } from "~/utils"
import Col9 from "../grid/Col9"
import Col4 from "../grid/Col4"
import Col8 from "../grid/Col8"
import Col11 from "../grid/Col11"
import Col6 from "../grid/Col6"
import Col7 from "../grid/Col7"
import Col5 from "../grid/Col5"
import TickList from "../configurable/TickList"
import BlockCTA from "../configurable/BlockCTA"
import "../configurable/ProductsAndWarrantiesBlock/styles.scss"
import "../configurable/BlockCTA/styles.scss"
import { CustomerTypeContext } from "~/providers/CustomerTypeProvider"

const image1 = require('../../images/install1x1.jpg');
const image2 = require('../../images/hold.jpg');
const image3 = require('../../images/folder1.jpg');
const image4 = require('../../images/HIP.png');

const ProductsAndWarranties = ({ markdownNodes }) => {
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

      //this makes it so the customer type is set always as what it needs to be on that page

      const { customerType, setCustomerType } = useContext(CustomerTypeContext);

      const isBusiness = React.useMemo(() => customerType === "commercial", [customerType]);
      const isDomestic = React.useMemo(() => customerType === "domestic", [customerType]);
      const isSolarTogether = React.useMemo(() => customerType === "solartogether", [customerType]);
      
        React.useEffect(() => {
          setCustomerType('domestic');
        }, []);
    
    //END this makes it so the customer type is set always as what it needs to be on that page
  return (
    <div className="products-and-warranties content-page">
      <Hero imageUrl="/images/products-warranties-banner.jpg" compact>
        <Heading level={1} underlined>
          Products &amp; Warranties
        </Heading>
      </Hero>
      <Block >
        <div className="container u-layout--indent">
          <div className="row">
            <Col8>
              <Heading level={3}>Redefining solar</Heading>
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
              <p>
                Our designs are cost effective because we only sell you what
                your lifestyle needs. Throughout the process, your home and
                investment are in safe hands.
              </p>
              <Image src={image2} title="Help achieve" />
              <p>
                Quality of products, equipment, system design and effective
                installation techniques will affect the performance and
                longevity of your solar system, so it's crucial to have both
                effective and reasonably priced solutions.
              </p>
            </Col8>
            <Col4>
              <div>                
                <Image src={image1} title="Help achieve2" />                
              </div>
                
                
            </Col4>
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
                green. 
              </p>
              
              <Icon alias="solar-fitting" style={{ fontSize: 90, color:"#051c3f", minWidth:"70px", marginBottom:"15px", marginTop:"15px" }} />
              <Heading level={4}>End to end service</Heading>
              <p>
                Our service includes the offer of a detailed
                commissioning review. A qualified engineer will review the
                documentation, undertake any necessary registrations for the
                property and issue them on your behalf.
              </p>
              
              <Icon alias="solar-energy" style={{ fontSize: 90, color:"#051c3f", minWidth:"70px", marginBottom:"15px", marginTop:"15px" }} />
              <Heading level={4}>Performance optimisation</Heading>
              <p>
                We'll look after you and your system in
                line with the data we receive from your remote monitoring
                solution, while our Customer Care team will be available to
                answer your questions, all for free for 2 years. 
              </p>
              

            </Col8>
            
            <Col4>
            <div style={{marginBottom:"30px"}}>
              <Image src={image3} title="Help achieve" />
            </div>
            <div>
                <HighlightBlock
                  title="Warranty Data"
                  action={goToProducts}
                  actionText="Jump to products area"
                >
                  <li>
                    <Icon alias="battery-charging" />
                    5+ years warranty on inverters
                  </li>
                  {/* <li>
                    <Icon alias="worker" />2 years workmanship warranty
                  </li> */}
                  <li>
                    <Icon alias="sun" />
                    25+ years performance warranty and 10+ years product warranty
                    on panels
                  </li>
                </HighlightBlock>
              </div>
            </Col4>
          </div>

          <div className="p-and-w" style={{marginTop:"70px"}}>
            <div className="row">
              <Col5>
                  <Image src={image4} title="Help achieve" />
              </Col5>
              <Col7>
              <Heading level={3}>Security at the highest level </Heading>
                <p>
                In addition to the warranty offered by the manufacturer we offer a 2 year warranty over our workmanship, and as a <a href="https://www.hip.insure/customers/find-approved-supplier/" target="blank" style={{color:"#3c96c5", fontWeight:"normal"}}>Home Improvement Protection Accredited Trader</a> your home is protected against any eventuality.
                </p>
                <Heading level={4}>Deposit Protection & Guarantee Insurance</Heading>
                <p>
                Authorised by the <a href="https://www.fca.org.uk/" target="blank" style={{color:"#3c96c5", fontWeight:"normal"}}>Financial Conduct Authority</a> and guaranteed for up to 10 years, the Home Improvement Protection’s scheme provide the best levels of insurance-backed warranty. So whatever happens, HIP is set out to honour the terms of the guarantee originally issued.
                </p>
                <BlockCTA secondary right external arrow="right" url="https://www.fca.org.uk/">
                  Find out more
                </BlockCTA>
                


              </Col7>
            </div>
          </div>


          <div className="row" style={{ marginTop: 60 }}>
            <Col9>
              <Heading level={2}>Superior system design</Heading>
            </Col9>
            <Col11>
              <p>
                Our usage-based model makes our designs really cost effective.
                Our team will only recommend the system that works best for you,
                based on the amount of energy you use, and we provide an
                accurate forecast on your return on investment. The system
                providing a great ROI is one that generates the perfect amount
                of energy for you to consume at home without exporting a large
                surplus out on to the grid. We're confident our designs are
                perfect for you, our customer, and we'll back that up by
                providing your final quote and the calculation in an easy to
                understand and simple format.
              </p>
              <div className="row">
                <Col6>
                  <p>
                    After analysing a number of key factors, including your
                    location, building and roof orientation and inclination, we
                    use state-of-the-art modelling technology to design your
                    proposed system. Our desktop survey process uses
                    industry-leading PV*SOL simulation software, enabling 3D
                    visualisation and accurate shading analysis.
                  </p>
                  <p>
                    This programme considers every factor, including the last 10
                    years of local meteorological data, for optimal performance
                    and return on investment.
                  </p>
                </Col6>
                <Col6>
                  <p>
                    The government, via Energy Companies, offers the Smart
                    Export Guarantee for excess energy not being used on site to
                    be exported onto the grid, and this guarantee will buy that
                    energy from you at a low rate. Sadly, the rate per KWH
                    offered doesn’t come close to offset the initial cost of the
                    system. Therefore, our modelling as close to 100% of
                    consumption as possible prevents oversizing of the system
                    and over-generation, avoiding surplus energy being exported
                    at a loss and reducing payback time.
                  </p>
                </Col6>
              </div>
            </Col11>
          </div>
        </div>
      </Block>
      {!!productsWarranties?.length && (
        <Block>
          <div className="container"  style={{ paddingTop: "0px", marginTop:"-100px" }}>
            <div
              className="row"
              style={{
                marginTop: 78,
                borderTop: "1px solid #d1d1d1",
                paddingTop: 52,
              }}
              ref={productsBlockRef}
            >
              <Heading level={3}>Products:</Heading>
              <p>
                Here's the collection of technical specifications for all our
                products, including performance, technical characteristics and
                warranty. For further information, get in touch with one of our
                advisors.
              </p>
              <Grid>
                {productsWarranties.map(item => {
                  const pwItem = item.frontmatter

                  return (
                    <li key={item.fields.slug}>
                      {pwItem.image?.childImageSharp && (
                        <Img
                          fluid={pwItem.image.childImageSharp.fluid}
                          alt={pwItem.title}
                        />
                      )}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "top",
                          marginTop: 24,
                        }}
                      >
                        <p className="grid-item__title">{pwItem.title}</p>
                        {pwItem.pdf?.publicURL && (
                          <>
                            <a
                              href={pwItem.pdf.publicURL}
                              target="_blank"
                              style={{
                                display: "block",
                                marginTop: 0,
                                marginLeft: 24,
                              }}
                            >
                              <div
                                className="icon__circle-wrapper"
                                style={{ fontSize: 32, color: "#70b33b" }}
                              >
                                <Icon
                                  alias="pdf"
                                  className="grid__icon u-styling--box-shadow"
                                />
                              </div>
                            </a>
                          </>
                        )}
                      </div>
                    </li>
                  )
                })}
              </Grid>
            </div>
          </div>
        </Block>
      )}
    </div>
  )
}

export default ProductsAndWarranties
