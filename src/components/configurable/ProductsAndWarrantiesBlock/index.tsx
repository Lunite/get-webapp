import React, { useState, useEffect } from "react"
import Img from "gatsby-image"
import Col7 from "~/components/grid/Col7"
import Col5 from "~/components/grid/Col5"
import Heading from "../Heading"
import TickList from "../TickList"
import BlockCTA from "../BlockCTA"

import "./styles.scss"
import { imageNodesFilter } from "~/utils"

const ProductsAndWarrantiesBlock = ({ imageNodes }) => {
  const [image, setImage] = useState(undefined)

  useEffect(() => {
    setImage(imageNodesFilter(imageNodes, "homepage-p-w.jpg"))
  }, [imageNodes])

  return (
    <div className="p-and-w">
      <div className="row">
        <Col5>
          {!!image && (
            <Img
              alt="Bay Solar Farm"
              fluid={{ ...image.fluid, aspectRatio: "1" }}
            />
          )}
        </Col5>
        <Col7>
          <Heading underlined>Products &amp; Warranties</Heading>
          <p>
            We believe sustainable options should be available and affordable
            for everyone — affordability shouldn't cost your peace of mind.
          </p>
          <TickList>
            <li>
              As one of the largest installers in the country, we deal directly
              with manufacturers, letting us offer prices usually found in
              industrial and commercial settings.
            </li>
            <li>
              Our in-house Design, Installation and Commissioning &amp;
              Maintenance teams let us offer unique warranties and service
              guarantees.
            </li>
          </TickList>
          <BlockCTA secondary right arrow="right" url="/products-warranties">
            Find out more
          </BlockCTA>
        </Col7>
      </div>
    </div>
  )
}

export default ProductsAndWarrantiesBlock
