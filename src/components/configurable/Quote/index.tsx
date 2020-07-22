import React, { FunctionComponent, useState, useEffect } from "react"
import { navigate } from "gatsby"
import Heading from "../Heading"
import BlockCTA from "../BlockCTA"
import { trackCustomEvent } from "gatsby-plugin-google-analytics"

import "./styles.scss"

const Quote: FunctionComponent<any> = ({
  title = "Get a quote today.",
  description = "It only takes 2 minutes to request a no-obligation quote, customised to you and your home's needs. Don't miss the chance to win your solar PV system for FREE.",
  ctaText = "Request Quote",
}) => {
  const [postcode, setPostcode] = useState("")

  const handleSubmit = event => {
    event.preventDefault()

    const eventData = {
      category: "Form",
      action: "Submit",
      label: "ShortQuote",
      // value: 0 // optional
    }

    trackCustomEvent(eventData)

    window.dataLayer = window.dataLayer || []

    return navigate("/quote", {
      state: postcode,
    })
  }

  return (
    <div className="quote">
      <Heading level={3}>{title}</Heading>
      <p>{description}</p>
      <form
        className="form form--horizontal"
        name="quote-block"
        onSubmit={handleSubmit}
      >
        <div className="form__inner" style={{ filter: "blur(0px)" }}>
          <div className="form__fields">
            <input
              required
              pattern="^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})"
              title="Please enter a valid UK postcode"
              className="form__text-input postcode-input"
              type="text"
              placeholder="Enter your postcode..."
              name="postcode"
              value={postcode}
              onChange={e => {
                setPostcode(e.target.value.toUpperCase())
              }}
            />
          </div>
          <div className="form__actions">
            <BlockCTA submit inline>
              {ctaText}
            </BlockCTA>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Quote
