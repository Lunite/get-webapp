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

const image1 = require('../../images/broadoak_1x1.jpg');
const image2 = require('../../images/paddington_rec.jpg');
const image3 = require('../../images/chestdrill.jpg');
const image4 = require('../../images/HIP.png');


const TestPage = ({ markdownNodes }) => {
  const productsBlockRef = React.createRef() as React.RefObject<HTMLElement>

  const { customerType, setCustomerType } = useContext(CustomerTypeContext);

  const isDomestic = React.useMemo(() => customerType === "domestic", [customerType]);

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

  return (
    <div className="products-and-warranties content-page" style={{background: isDomestic ? 'red' : 'initial'}}>
      <Hero imageUrl="/images/products-warranties-banner.jpg" compact>
        <Heading level={1} underlined>
          Test Page
        </Heading>
      </Hero>
      <Block >
        <div className="container u-layout--indent">
          <div className="row">
            <Col8>
              <Heading level={3}>Commercial Test Title</Heading>
              
            </Col8>
          </div>
        </div>
      </Block>
      
    </div>
  )
}

export default TestPage
