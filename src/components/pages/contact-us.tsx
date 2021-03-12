import React from "react"
import Img from "gatsby-image"
import Hero from "~/components/configurable/Hero"
import FormInput from "../olc-framework/FormInput"
import BlockCTA from "../configurable/BlockCTA"
import Heading from "../configurable/Heading"
import Block from "../configurable/Block"
import FormTextarea from "../olc-framework/FormTextarea"
import Col3 from "../grid/Col3"
import Col6 from "../grid/Col6"
import Col9 from "../grid/Col9"

import ContactUsDetails from "~/vectors/contact-us-details.inline.svg"
import { trackCustomEvent } from "gatsby-plugin-google-analytics"
import { useStaticQuery, graphql } from "gatsby"




const ContactUsPage = ({ location }) => {
  const { state = {} } = location

  const logFormSubmitEvent = () => {
    if (window) {
      window.dataLayer = window.dataLayer || []
    }

    const eventData = {
      category: "Form",
      action: "Submit",
      label: "Contact Us",
      // value: 0 // optional
    }

    trackCustomEvent(eventData)
  }

  return (
    <div className="contact-us-page">
      <Hero
        imageUrl="/images/contact-banner.jpg"
        // image={<Img fluid={heroImage.fluid} alt="Solar panel roof" />}
        compact
      >
        <Heading level={1} underlined>
          Contact
        </Heading>
      </Hero>
      <Block>
        <div className="container u-layout--indent container--column">
          <div className="row">
            <Col9>
              <form
                className="form form--full-width"
                onSubmit={() => {
                  logFormSubmitEvent()
                }}
                action="https://formspree.io/xwkrpynw"
                method="POST"
                name="contact-us"
                // data-netlify="true" -- to use netlify forms
              >
                <div className="row">
                  <Col6>
                    <FormInput
                      name="full-name"
                      label="Full name"
                      placeholder="Type your full name"
                      value={state?.name}
                      required
                    />
                  </Col6>
                  <Col6>
                    <FormInput
                      name="email"
                      label="Email"
                      type="email"
                      placeholder="Type your email"
                      value={state?.email}
                      required
                    />
                  </Col6>
                </div>
                <div className="row">
                  <Col6>
                    <FormInput
                      name="phone-number"
                      label="Phone number (optional)"
                      type="tel"
                      placeholder="Type your phone number"
                      value={state?.phone}
                    />
                  </Col6>
                  <Col6>
                    <FormInput
                      name="subject"
                      label="Subject"
                      placeholder="Type the subject"
                    />
                  </Col6>
                </div>
                <FormTextarea
                  name="message"
                  label="Message"
                  placeholder="Type your message"
                  required
                />
                <div className="form__actions">
                  <BlockCTA fullWidth large submit>
                    Send
                  </BlockCTA>
                </div>
              </form>
            </Col9>
            <Col3>
              <ContactUsDetails />
            </Col3>
          </div>
        </div>
      </Block>
    </div>
  )
}

export default ContactUsPage
