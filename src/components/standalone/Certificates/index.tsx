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
        <p>
          To further our commitment to our customers, Green Energy Together has
          had its Quality Management System certified against a number of
          national and international quality standards. To attain and maintain
          these certifications, our business undertakes a vigorous program to
          ensure the ongoing quality and improvement of our Management Systems.
          Review is undertaken by regular internal audits and external audits,
          conducted by our third-party certification auditors.
        </p>
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
