import React from "react"
import Col7 from "~/components/grid/Col7"
import Col5 from "~/components/grid/Col5"
import Image from "../Image"
import Heading from "../Heading"
import TickList from "../TickList"
import BlockCTA from "../BlockCTA"

import "./styles.scss"

const ProductsAndWarrantiesBlock = () => {
  return (
    <div className="p-and-w">
      <div className="row">
        <Col5>
          <Image src="/images/homepage-p-w.jpg" title="Bay Solar Farm" />
        </Col5>
        <Col7>
          <Heading underlined>Products &amp; Warranties</Heading>
          <p>
            At Green Energy Together, we are technical consultants - our team
            will only recommend the system that works best for you based on
            accurate predictions of your return on investment.
          </p>
          <TickList>
            <li>
              Maximise power output and investment return and ensure ongoing
              system safety.
            </li>
            <li>
              Ensuring savings for power plant owners through a combination of
              preventive maintenance and high-quality data analysis from the
              latest software.
            </li>
          </TickList>
          <BlockCTA secondary right arrow="right" url="/products">
            Find out more
          </BlockCTA>
        </Col7>
      </div>
    </div>
  )
}

export default ProductsAndWarrantiesBlock
