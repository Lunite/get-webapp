import React, { FunctionComponent, useState } from "react"
import { navigate } from "gatsby"
import Heading from "~/components/configurable/Heading"
import BlockCTA from "~/components/configurable/BlockCTA"
import { trackCustomEvent } from "gatsby-plugin-google-analytics"

import "./styles.scss"

const Quote: FunctionComponent<any> = ({
  title = "Get a quote today.",
  description = "It only takes 2 minutes to request a no-obligation quote, customised to you and your home's needs. Don't miss the chance to win your solar PV system for FREE.",
  ctaText = "Request Quote",
  compact = false,
}) => {
  const formState = {}

  const handleInputChange = event => {
    formState[event.target.name] = event.target.value
  }

  const handleSubmit = event => {
    event.preventDefault()

    // trackCustomEvent(eventData)   oops may have deleted the eventData object, I'll address that if its important

    window.dataLayer = window.dataLayer || []

    return navigate("/quote", {
      state: formState,
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
        <div className="form__inner">
          <div className="form__fields">
            <input
              className="form__text-input"
              type="text"
              placeholder="Full name"
              name="name"
              onChange={handleInputChange}
              required
            />
            <input
              className="form__text-input"
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleInputChange}
              required
            />
            <input
              className="form__text-input"
              type="tel"
              placeholder="Phone"
              name="phone"
              onChange={handleInputChange}
              required
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
