import React, { FunctionComponent } from "react"
import { navigate } from "gatsby"
import Heading from "~/components/configurable/Heading"
import BlockCTA from "~/components/configurable/BlockCTA"

import "./styles.scss"

const Quote: FunctionComponent<any> = ({
  title = "Get a Free Quote today.",
  description = "It only takes 2 minutes to request a no-obligation quote, customised to you and your home's needs. Don't miss the chance to win your solar PV system for FREE.",
  ctaText = "Request Quote",
  compact = false,
}) => {
  const formState = {}

  const handleInputChange = event => {
    formState[event.target.name] = event.target.value
  }

  const shortQuoteEvent = event => {
    window.dataLayer = window.dataLayer || []

    window.dataLayer.push({
      category: "Form",
      action: "Submit",
      label: "ShortQuote",
    })
  }

  const handleSubmit = event => {
    event.preventDefault()

    navigate("/quote", {
      state: formState,
    })
  }

  const fields = (
    <>
      <div className="form__fields">
        <input
          className="form__text-input"
          type="text"
          placeholder="Name"
          name="name"
          onChange={handleInputChange}
        />
        <input
          className="form__text-input"
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleInputChange}
        />
        <input
          className="form__text-input"
          type="tel"
          placeholder="Phone"
          name="phone"
          onChange={handleInputChange}
        />
      </div>
      <div className="form__actions">
        <BlockCTA submit inline>
          {ctaText}
        </BlockCTA>
      </div>
    </>
  )

  return (
    <div className="quote">
      <Heading level={3}>{title}</Heading>
      <p>{description}</p>
      {compact && (
        <form
          className="form form--horizontal"
          onSubmit={shortQuoteEvent}
          action="https://formspree.io/mbjzlwgw"
          method="POST"
          name="quote-block"
        >
          {fields}
        </form>
      )}
      {!compact && (
        <form className="form form--horizontal" onSubmit={handleSubmit}>
          {fields}
        </form>
      )}
    </div>
  )
}

export default Quote
