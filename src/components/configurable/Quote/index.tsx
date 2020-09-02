import React, { FunctionComponent, useState } from "react"
import { navigate } from "gatsby"
import Heading from "~/components/configurable/Heading"
import BlockCTA from "~/components/configurable/BlockCTA"
import { trackCustomEvent } from 'gatsby-plugin-google-analytics'

import "./styles.scss";

const HERT_PAGE = '/hert_collective';

const Quote: FunctionComponent<any> = ({
  title = "Get a quote today.",
  description = "It only takes 2 minutes to request a no-obligation quote, customised to you and your home's needs.",
  ctaText = "Request Quote",
  compact = false,
}) => {
  const [submitted, setSubmitted] = useState(false)
  const formState = {
    // If this the `/hert_collective` could have queryParams change this to includes
    isHert: window.location.pathname === HERT_PAGE ? 'yes' : 'no',
    isShortQuote: 'yes',
  }



  console.log(window.location.pathname === '/' ? 'yes' : 'no' )


  const handleInputChange = event => {
    formState[event.target.name] = event.target.value
  }

  const handleSubmit = event => {
    event.preventDefault();

    const eventData = {
      category: "Form",
      action: "Submit",
      label: "ShortQuote",
      // value: 0 // optional
    }

    trackCustomEvent(eventData);

    window.dataLayer = window.dataLayer || []

    if (compact) {
      setSubmitted(true)
    }

    const form = event.target;
    const data:any = new FormData(form);
    data.isHert = formState.isHert;
    data.isShortQuote = formState.isShortQuote;
    const xhr = new XMLHttpRequest()
    xhr.open(form.method, form.action)
    xhr.setRequestHeader("Accept", "application/json")
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) {
        return
      }
    }
    xhr.send(data)

    if (!compact) {
      return navigate("/quote", {
        state: formState,
      })
    }
  }

  return (
    <div className="quote">
      <Heading level={3}>{title}</Heading>
      <p>{description}</p>
      <form
        className="form form--horizontal"
        action="https://formspree.io/mbjzlwgw"
        method="POST"
        name="quote-block"
        onSubmit={handleSubmit}
      >
        <div
          className="form__inner"
          style={{ filter: submitted ? "blur(40px)" : "blur(0px)" }}
        >
          <div className="form__fields">
            <input
              className="form__text-input"
              type="text"
              placeholder="Full name"
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
            <input style={{opacity: 0}} name='isHert' onChange={() => {}} />

            <input style={{opacity: 0}} name='isShortQuote' value='yes' onChange={() => {}} />


          </div>
          <div className="form__actions">
            <BlockCTA submit inline>
              {ctaText}
            </BlockCTA>
          </div>
        </div>
        <div
          className="form__submitted-text"
          style={
            submitted
              ? { opacity: 1, pointerEvents: "all" }
              : { opacity: 0, pointerEvents: "none" }
          }
        >
          <Heading level={5}>Thank you. We will be in touch</Heading>
        </div>
      </form>
    </div>
  )
}

export default Quote
