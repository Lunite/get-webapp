import React from "react"
import Block from "~/components/configurable/Block"
import Heading from "~/components/configurable/Heading"

const Certificates = () => {
  return (
    <Block className="certificates" highlightColour="blue">
      <div className="container">
        <Heading level={2} underlined>
          Our Certifications
        </Heading>
        <p>
          Quality is what we do. Green Energy Together has had its Quality
          Management System certified against a number of national and
          international quality standards. To attain and maintain these
          certifications, our business undertakes a vigorous programme to ensure
          the ongoing quality and improvement of our Management Systems. Review
          is undertaken by regular internal and external audits, conducted by
          our third-party certification partners.
        </p>
        <img
          className="hidden-xs"
          src="/images/certificates.png"
          alt="Certificate Logos"
        />
        <img
          className="visible-xs"
          style={{ maxWidth: "276px", margin: "0 auto" }}
          src="/images/certificates-mobile.jpg"
          alt="Certificate Logos"
        />
        <div
          style={{
            paddingTop: "20px",
            color: "grey",
            fontSize: "10px",
            margin: "auto",
            display: "flex",
            alignContent: "center",
          }}
        >
          <p>
            *All works carried out by the Green Energy Together brand operate
            under Solarplicity Smart Systems registration NAPIT 30902 and MCS
            NAP30902.
          </p>
        </div>
      </div>
    </Block>
  )
}

export default Certificates
