import React, { FunctionComponent } from "react"
import { navigate } from "gatsby"
import Heading from "~/components/configurable/Heading"
import BlockCTA from "~/components/configurable/BlockCTA"

import "./styles.scss"

const Quote: FunctionComponent<any> = ({
  title = "Get a Free Quote today.",
  description = "It only takes 2 minutes to request a no-obligation quote, customised to you and your home's needs.",
}) => {
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
      <Heading level={3}>{title}</Heading>
      <p>{description}</p>
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
