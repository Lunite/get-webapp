import React, { useState, FormEvent } from "react"
import Hero from "../configurable/Hero"
import Heading from "../configurable/Heading"
import QuestionPage from "../configurable/QuoteTool"
import Col3 from "../grid/Col3"
import Col9 from "../grid/Col9"
import Section from "../configurable/Section"
import Block from "../configurable/Block"
import "./quote.scss"

interface IQuoteFormValues {
  name: string
  email: string
  phone: string
  houseNumber: string
  street: string
  town: string
  postcode: string

  location: {
    lat: number
    long: number
  }

  roof: {
    azimuth: number
    inclination: number
  }
  property: {
    bedrooms: number
    eCar: boolean
    pump: boolean
    eHeating: boolean
  }
}

const QuotePage: React.FC<{ location }> = props => {
  const [formValues, setFormValues] = useState({})
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }
  return (
    <div className="quote-page">
      <Hero imageUrl="/images/quote-banner.jpg" compact>
        <Heading level={1} underlined>
          Get a Quote
        </Heading>
      </Hero>
      <Section>
        <form
          name="quote-form"
          onSubmit={handleSubmit}
          className="quote-form"
        ></form>
      </Section>
    </div>
  )
}

export default QuotePage
