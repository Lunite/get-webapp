import React, { useState, FormEvent } from "react"
import Hero from "../configurable/Hero"
import Heading from "../configurable/Heading"
import QuestionPage from "../configurable/QuoteTool"
import Col3 from "../grid/Col3"
import Col9 from "../grid/Col9"
import Section from "../configurable/Section"
import Block from "../configurable/Block"
import "./quote.scss"
import Col6 from "../grid/Col6"
import FormInput from "../olc-framework/FormInput"
import BlockCTA from "../configurable/BlockCTA"

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

const defaultValues: IQuoteFormValues = {
  name: "",
  email: "",
  phone: "",
  houseNumber: "",
  street: "",
  town: "",
  postcode: "",

  location: {
    lat: 0,
    long: 0,
  },

  roof: {
    azimuth: 0,
    inclination: 0,
  },
  property: {
    bedrooms: 0,
    eCar: false,
    pump: false,
    eHeating: false,
  },
}

const QuotePage: React.FC<{ location }> = props => {
  const [formValues, setFormValues] = useState<IQuoteFormValues>(defaultValues)
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
      <Block>
        <div className="container u-layout--indent container--column">
          <Col9>
            {" "}
            <form
              name="quote-form"
              onSubmit={handleSubmit}
              className="form form--full-width"
            >
              <div className="row">
                <Col6>
                  <Heading level={3}>
                    Enter your postcode to get started
                  </Heading>
                </Col6>
                <Col6>
                  <FormInput
                    name="postcode"
                    label="Postcode"
                    placeholder="Enter postcode..."
                    required
                    pattern="^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})"
                    title="Please enter a valid UK postcode"
                  />
                  <div className="form__actions">
                    <BlockCTA large submit className="align-end">
                      Get Started
                    </BlockCTA>
                  </div>
                </Col6>
              </div>
            </form>
          </Col9>
        </div>
      </Block>
    </div>
  )
}

export default QuotePage
