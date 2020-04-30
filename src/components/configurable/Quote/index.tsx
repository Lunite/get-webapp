import React, { FunctionComponent } from "react"
import { Heading } from "~/components/configurable/Heading"
import { BlockCTA } from "~/components/configurable/BlockCTA"

export const Quote: FunctionComponent = () => {
  const formState = {}

  const handleInputChange = event => {
    formState[event.target.name] = formState[event.target.value]
  }

  const handleSubmit = () => {}

  return (
    <div className="quote">
      <Heading>Get a Free Quote today.</Heading>
      <p>TODO</p>
      <form className="form form--horizontal" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          onChange={handleInputChange}
        />
        <BlockCTA submit secondary>
          Request Quote
        </BlockCTA>
      </form>
    </div>
  )
}
