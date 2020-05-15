import React, { FunctionComponent } from "react"
import { navigate } from "gatsby"
import Heading from "~/components/configurable/Heading"
import BlockCTA from "~/components/configurable/BlockCTA"

import "./styles.scss"

const Quote: FunctionComponent = () => {
  const formState = {}

  const handleInputChange = event => {
    formState[event.target.name] = event.target.value
  }

  const handleSubmit = event => {
    event.preventDefault()

    navigate("/quote", {
      state: formState,
    })
  }

  return (
    <div className="quote">
      <Heading level={3}>Get a Free Quote today.</Heading>
      <p>
        It only takes 2 minutes to request a no-obligation quote, customized to
        your needs.
      </p>
      <form className="form form--horizontal" onSubmit={handleSubmit}>
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
            Request Quote
          </BlockCTA>
        </div>
      </form>
    </div>
  )
}

export default Quote
