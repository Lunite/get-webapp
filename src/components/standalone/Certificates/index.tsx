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
        <img src="/images/certificates.png" />
      </div>
    </Block>
  )
}

export default Certificates
