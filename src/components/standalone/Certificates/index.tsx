import React from "react"
import Block from "~/components/configurable/Block"
import Heading from "~/components/configurable/Heading"

import "./styles.scss"

const Certificates = () => {
  return (
    <Block className="certificates" highlightColour="blue">
      <div className="container">
        <Heading level={2} underlined>
          We are Certified
        </Heading>
        <img className="hidden-xs" src="/images/certificates.png" />
        <img
          className="visible-xs"
          style={{ maxWidth: "276px", margin: "0 auto" }}
          src="/images/certificates-mobile.jpg"
        />
      </div>
    </Block>
  )
}

export default Certificates
