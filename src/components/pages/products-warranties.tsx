import React from "react"
import Hero from "../configurable/Hero"
import Heading from "../configurable/Heading"
import Block from "../configurable/Block"
import Col9 from "../grid/Col9"
import Col3 from "../grid/Col3"
import Image from "../configurable/Image"
import Icon from "../olc-framework/Icon"
import Col11 from "../grid/Col11"
import Col6 from "../grid/Col6"
import HighlightBlock from "../configurable/HighlightBlock"
import Grid from "../configurable/Grid"

const ProductsAndWarranties = ({ pageContext }) => {
  const { productsWarranties } = pageContext
  const productsBlockRef = React.createRef() as React.RefObject<HTMLElement>

  const goToProducts = () => {
    productsBlockRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  return (
    <div className="products-and-warranties content-page">
      <Hero image="/images/products-warranties-banner.jpg" compact>
        <Heading level={1} underlined>
          Products &amp; Warranties
        </Heading>
      </Hero>
      <Block>
        <div className="container u-layout--indent">
          <div className="row">
            <Col9>
              <Heading level={3}>Redefining solar</Heading>
              <p>
              We believe in the solar future.  We believe the future of energy is green, renewable, ethical and fair-priced and our transparent approach places us well to deliver the future, now.
              </p>
              <p>
              As one of the largest commercial installers in the country, with over 400 million watts of solar generated in the last decade including landmarks like King's College Hospital and Paddington Train Station, we get great deals directly from the manufacturers and we pride ourselves on our fair market pricing.
              </p>
              <p>
              Our designs are cost effective because we only sell you what your lifestyle needs. Throughout the process, your home and investment are in safe hands.
              </p>
              <Image src="/images/climb-mountain.jpg" title="Help achieve" />
              <p>
              Quality of products, equipment, system design and effective installation techniques will affect the performance and longevity of your solar system, so it's crucial to have both effective and reasonably priced solutions.
              </p>
            </Col9>
          </div>
          <div
            className="row"
            style={{
              marginTop: 78,
            }}
          >
            <Col9
              style={{
                borderTop: "1px solid #d1d1d1",
                paddingTop: 52,
              }}
            >
              <Heading level={3}>Peace of mind</Heading>
              <p>
              Every step of the process and scope of the work is clearly outlined and explained. We pride ourselves on ensuring that you understand everything clearly before making the decision to go green. Our service includes the offer of a detailed commissioning review. A qualified engineer will review the documentation, undertake any necessary registrations for the property and issue them on your behalf.
              </p>
              <Icon alias="power" style={{ fontSize: 90 }} />
              <Heading level={4}>Performance optimisation</Heading>
              <p>
              Operations &amp; Maintenance plans are essential for the majority of solar installations.  At Green Energy Together, after your install for 2 years,  we'll look after you and your system in line with the data we receive from your remote monitoring solution, while our Customer Care team will be available to answer your questions, all for free for 2 years. We can then offer you a maintenance package that suits your needs, when you are ready.
              </p>
              <Icon alias="solar-panel" style={{ fontSize: 90 }} />
              <Heading level={4}>Warranties</Heading>
              <p>
              All of the solar panels we supply come with a 10 year product warranty (materials warranty) and a 25 year linear performance warranty. All of the inverters we supply come with at least a 5 year warranty as standard. In addition, we offer a 2 years warranty over our workmanship. Full details of specific components can be found below in the products section
              </p>
            </Col9>
            <Col3>
              {/* <HighlightBlock title="Warranty Data" action={goToProducts}>
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
              </HighlightBlock> */}
            </Col3>
          </div>
          <div className="row" style={{ marginTop: 60 }}>
            <Col9>
              <Heading level={2}>
                Superior system design
              </Heading>
            </Col9>
            <Col11>
              <p>
              Our usage-based model makes our designs really cost effective. Our team will only recommend the system that works best for you, based on the amount of energy you use and we provide an accurate forecast on your return on investment. The system providing a great ROI is one that generates the perfect amount of energy for you to consume at home without exporting a large surplus out on to the grid. We're confident our designs are perfect for you our customer and we'll back that up by providing your final quote and the calculation in an easy to understand and simple format.
              </p>
              <div className="row">
                <Col6>
                  <p>
                  After analysing a number of key factors, including your location, building and roof orientation and inclination, we use state-of-the-art modelling technology to design your proposed system. Our desktop survey process uses industry-leading PV*SOL simulation software, enabling 3D visualisation and accurate shading analysis.
                  </p>
                  <p>
                  This program considers every factor, including the last 10 years of local meteorological data, for optimal performance and return on investment.

                  </p>
                </Col6>
                <Col6>
                  <p>
                  The government via Energy Companies offer the Smart Export Guarantee for excess energy not being used on site to be exported onto the grid and this guarantee will buy that energy from you at a low rate.  Sadly the rate per KWH offered doesn’t come close to offset the initial cost of the system. Therefore, our modelling as close to 100% of consumption as possible prevents over sizing of the system and over generation. Avoiding surplus exported enrgy at a loss and reducing payback time.
                  </p>
                </Col6>
              </div>
            </Col11>
          </div>
        </div>
      </Block>
      {/* {productsWarranties?.length && (
        <Block style={{ paddingTop: 0 }}>
          <div className="container">
            <div
              className="row"
              style={{
                marginTop: 78,
                borderTop: "1px solid #d1d1d1",
                paddingTop: 52,
              }}
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
                  const pwItem = item.acf.product_warranty

                  return (
                    <li key={item.slug}>
                      {pwItem.image?.source_url && (
                        <Image
                          className="grid-item__image"
                          src={pwItem.image.source_url}
                          title={pwItem.image?.title || ""}
                        />
                      )}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "top",
                          marginTop: 24,
                        }}
                      >
                        <p className="grid-item__title">{item.title}</p>
                        {pwItem.pdf && (
                          <>
                            <a
                              href={pwItem.pdf}
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
      )} */}
    </div>
  )
}

export default ProductsAndWarranties
