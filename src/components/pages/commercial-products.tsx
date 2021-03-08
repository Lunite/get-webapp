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
import FormInput from "../olc-framework/FormInput"
import Col12 from "../grid/Col12"
import FormSelect from "../olc-framework/FormSelect"
import { CustomerTypeContext } from "~/providers/CustomerTypeProvider"


const CommercialProducts = ({ markdownNodes }) => {
  const productsBlockRef = React.createRef() as React.RefObject<HTMLElement>

  const [filter, setFilter] = React.useState<string>('');

  const productsWarranties = markdownNodesFilter(
    markdownNodes,
    "products_and_warranties"
  )

//this makes it so the customer type is set always as what it needs to be on that page

  const { customerType, setCustomerType } = useContext(CustomerTypeContext);

  const isBusiness = React.useMemo(() => customerType === "commercial", [customerType]);
  const isDomestic = React.useMemo(() => customerType === "domestic", [customerType]);
  const isSolarTogether = React.useMemo(() => customerType === "solartogether", [customerType]);
  
    React.useEffect(() => {
      setCustomerType('commercial');
    }, []);

//END this makes it so the customer type is set always as what it needs to be on that page

  const goToProducts = () => {
    productsBlockRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  const filteredProducts = React.useMemo(() => {
    if (filter === '') {
      return productsWarranties;
    }
    return productsWarranties.filter((product) => {
      return product.frontmatter.category === filter;
    });
  }, [productsWarranties, filter]);

  const onFilterChange = React.useCallback((evt) => {
    setFilter(evt.target.value);
  }, []);

  return (
    <div className="products-and-warranties content-page">
      <Hero imageUrl="/images/products-warranties-banner.jpg" compact>
        <Heading level={1} underlined>
          Commercial Products
        </Heading>
      </Hero>


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

              <div style={{width: '500px'}}>
                <FormSelect 
                  name="category"
                  label="Filter by category"
                  options={["Inverters", "Panels", "Batteries", "EV Charger", "Other"]}
                  value={filter}
                  onChange={onFilterChange}
                />
                </div>
              

              



              <Grid>
              <div className="row">

              </div>
                {filteredProducts.map(item => {
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

export default CommercialProducts
