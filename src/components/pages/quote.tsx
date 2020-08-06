import React, { useState, FormEvent, useEffect } from "react"
import Hero from "../configurable/Hero"
import Heading from "../configurable/Heading"
import Col3 from "../grid/Col3"
import Col9 from "../grid/Col9"
import Section from "../configurable/Section"
import Block from "../configurable/Block"
import "./quote.scss"
import Col6 from "../grid/Col6"
import FormInput from "../olc-framework/FormInput"
import BlockCTA from "../configurable/BlockCTA"
import { imageNodesFilter } from "~/utils"
import { PageProps } from "gatsby"
import InteractiveMap from "../configurable/QuoteTool/InteractiveMap"
import Col11 from "../grid/Col11"
import Col12 from "../grid/Col12"
import { number } from "prop-types"
import { fromAddress, fromLatLong } from "../util/Quote/mapUtils"
import RadioGrid from "../configurable/QuoteTool/RadioGrid"

interface IQuoteFormValues {
  name: string
  email: string
  phone: string
  houseNumber: string
  street: string
  town: string
  postcode: string
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

const values: IQuoteFormValues = {
  name: "",
  email: "",
  phone: "",
  houseNumber: "",
  street: "",
  town: "",
  postcode: "",
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

const QuotePage: React.FC<PageProps> = props => {
  const [formValues, setFormValues] = useState<IQuoteFormValues>({
    ...values,
    ...props.location.state,
  })
  const [page, setPage] = useState(0)
  const [location, setLocation] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  })

  useEffect(() => {
    // Updates address when coordinates from map change
    const effect = async () => {
      const address = await fromLatLong(location.lat, location.lng)
      const newFv = {
        ...formValues,
        houseNumber: address[0].long_name,
        street: address[1].long_name,
        town: address[2].long_name,
        postcode: address[address.length - 1].long_name,
      }
      setFormValues(newFv)
    }
    effect()
  }, [location])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // handles form submission - will either go to the next page or submit formValues
    e.preventDefault()
    if (page !== pages - 1) {
      setPage(page + 1)
    }
  }

  const updateTextValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Updates a text value in formValues
    let newFv = { ...formValues }
    newFv[e.target.id] = e.target.value
    console.log("Updated FV to", newFv)
    setFormValues(newFv)
  }

  const updatePostcode = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Special case for initial postcode box - updates coordinates based on postcode
    fromAddress(e.target.value).then(res => setLocation(res))
    setFormValues({ ...formValues, postcode: e.target.value })
  }

  const pages = 3

  const getPage = () => {
    switch (page) {
      case 0:
        return (
          <div className="row">
            <Col6>
              <Heading level={3}>Enter your postcode to get started</Heading>
            </Col6>
            <Col6>
              <FormInput
                name="postcode"
                label="Postcode"
                placeholder="Enter postcode..."
                required
                pattern="^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})"
                title="Please enter a valid UK postcode"
                value={formValues.postcode}
                onChange={updatePostcode}
                id="postcode"
              />
              <div className="form__actions">
                <BlockCTA large submit className="fl-r">
                  Get Started
                </BlockCTA>
              </div>
            </Col6>
          </div>
        )
      case 1:
        return (
          <div className="row center">
            <Col6>
              <InteractiveMap location={location} setLocation={setLocation} />
            </Col6>
            <Col6>
              <Heading level={3}>Find your property</Heading>
              <FormInput
                name="houseNumber"
                id="houseNumber"
                label="House number/name"
                placeholder="Enter house number..."
                type="text"
                required
                value={formValues.houseNumber}
                onChange={updateTextValue}
              />
              <FormInput
                name="street"
                id="street"
                label="Street"
                type="text"
                placeholder="Enter street name..."
                required
                value={formValues.street}
                onChange={updateTextValue}
              />
              <FormInput
                name="town"
                id="town"
                label="Town"
                type="text"
                placeholder="Enter town..."
                required
                value={formValues.town}
                onChange={updateTextValue}
              />
              <FormInput
                name="postcode"
                id="postcode"
                label="Postcode"
                placeholder="Enter postcode..."
                required
                pattern="^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})"
                title="Please enter a valid UK postcode"
                value={formValues.postcode}
                onChange={updateTextValue}
              />
              <div className="form__actions">
                <BlockCTA large submit className="fl-r">
                  Next
                </BlockCTA>
              </div>
            </Col6>
          </div>
        )
      case 2:
        return (
          <>
            <Heading level={3}>
              Choose the angle that best matches your roof
            </Heading>
            <RadioGrid />
          </>
        )
      default:
        return (
          <>
            No Page Here :){" "}
            <button
              onClick={() => {
                setPage(0)
              }}
            >
              Back To Start
            </button>
          </>
        )
    }
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
          <Col12>
            <form
              name="quote-form"
              onSubmit={handleSubmit}
              className="form form--full-width"
            >
              {getPage()}
            </form>
          </Col12>
        </div>
      </Block>
    </div>
  )
}

export default QuotePage
