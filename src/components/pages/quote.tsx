import React, { useState, FormEvent, useEffect } from "react"
import Hero from "../configurable/Hero"
import Heading from "../configurable/Heading"
import Block from "../configurable/Block"
import "./quote.scss"

import Col6 from "../grid/Col6"
import FormInput from "../olc-framework/FormInput"
import BlockCTA from "../configurable/BlockCTA"
import Image from "../configurable/Image"
import { PageProps } from "gatsby"
import InteractiveMap from "../standalone/InteractiveMap"
import Col12 from "../grid/Col12"
import { fromAddress, fromLatLong } from "../util/Quote/mapUtils"
import RadioGrid from "../standalone/RadioGrid"
import Shoutout from "../configurable/Shoutout"
import Animate from "../olc-framework/Animate"
import ArrowMap from "../standalone/ArrowMap"
import SlideQuestion from "../configurable/SlideInput"
import FormSelect from "../olc-framework/FormSelect"
import FormCheckbox from "../olc-framework/FormCheckbox"

const postcodeRegex =
  "^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})"

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
    pool: boolean
    heater: boolean
  }
  aec: number
  ppw: number
  standingChange: number
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
    inclination: 1,
  },
  property: {
    bedrooms: 0,
    eCar: false,
    pump: false,
    pool: false,
    heater: false,
  },
  aec: 100,
  ppw: 100,
  standingChange: 100,
}

const propertyOptions = {
  eCar: "Electric Car",
  pump: "Air Source Heating", // check this
  pool: "Swimming Pool",
  heater: "Electric Storage Heating",
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

  useEffect(() => {
    page !== 0 && window.scrollTo(0, 200)
  }, [page])

  useEffect(() => {
    console.log(formValues)
  }, [formValues])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // handles form submission - will either go to the next page or submit formValues
    e.preventDefault()
    if (page !== pages - 1) {
      setPage(page + 1)
    }
  }

  const prevPage = () => {
    setPage(page - 1)
  }

  const updateTextValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Updates a text value in formValues
    let newFv = { ...formValues }
    newFv[e.target.id] = e.target.value
    console.log("Updated FV to", newFv)
    setFormValues(newFv)
  }

  const updateInclination = (e: number) => {
    const newFv = { ...formValues }
    newFv.roof.inclination = e
    setFormValues(newFv)
  }

  const updatePostcode = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Special case for initial postcode box - updates coordinates based on postcode
    if (e.target.value.match(postcodeRegex)) {
      fromAddress(e.target.value).then(res => setLocation(res))
    }
    setFormValues({ ...formValues, postcode: e.target.value })
  }

  const toggleProperty = (id: string) => {
    const newP = { ...formValues.property }
    newP[id] = !newP[id]
    setFormValues({ ...formValues, property: newP })
  }

  const pages = 10

  const getPage = () => {
    switch (page) {
      case 0:
        return (
          <Shoutout
            image={<Image src="/images/products-bulb.jpg" title="Products" />}
            text={
              <>
                <Animate
                  properties={["opacity", "transform"]}
                  startValues={["0", "translateY(40px) rotate(0.5deg)"]}
                  endValues={["1", "translateY(0) rotate(0deg)"]}
                >
                  <div>
                    <Heading underlined level={1}>
                      Get a Quote
                    </Heading>
                    <Heading level={3}>
                      Enter your postcode to get started
                    </Heading>
                  </div>
                </Animate>
                <Animate
                  properties={["opacity", "transform"]}
                  startValues={["0", "translateY(40px) rotate(0.5deg)"]}
                  endValues={["1", "translateY(0) rotate(0deg)"]}
                >
                  <FormInput
                    name="postcode"
                    placeholder="Enter postcode..."
                    required
                    pattern={postcodeRegex}
                    title="Please enter a valid UK postcode"
                    value={formValues.postcode}
                    onChange={updatePostcode}
                    id="postcode"
                  />
                </Animate>
                <Animate
                  properties={["opacity", "transform"]}
                  startValues={["0", "translateY(40px) rotate(0.5deg)"]}
                  endValues={["1", "translateY(0) rotate(0deg)"]}
                >
                  <div className="form__actions">
                    <BlockCTA large submit className="fl-r">
                      Get Started
                    </BlockCTA>
                  </div>
                </Animate>
              </>
            }
          />
        )
      case 1:
        return (
          <div className="row center">
            <Col6>
              <InteractiveMap location={location} setLocation={setLocation} />
            </Col6>
            <Col6>
              <Heading level={3}>Find your property</Heading>
              <Heading level={5}> Please select your roof on the map</Heading>
              <Animate
                properties={["opacity", "transform"]}
                startValues={["0", "translateY(40px) rotate(0.5deg)"]}
                endValues={["1", "translateY(0) rotate(0deg)"]}
              >
                <div>
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
                </div>
              </Animate>
              <div className="form__actions">
                <BlockCTA large left action={prevPage}>
                  Back
                </BlockCTA>
                <BlockCTA large submit right>
                  Next
                </BlockCTA>
              </div>
            </Col6>
          </div>
        )
      case 2:
        return (
          <>
            <Heading level={3}>Which direction does your roof face?</Heading>
            <Heading level={5}>
              Rotate the arrow to match the direction of your roof
            </Heading>
            <ArrowMap location={location} />
            <div className="form__actions">
              <BlockCTA large left action={prevPage}>
                Back
              </BlockCTA>
              <BlockCTA large submit right>
                Next
              </BlockCTA>
            </div>
          </>
        )
      case 3:
        return (
          <>
            <Heading level={3}>
              Choose the angle that best matches your roof
            </Heading>
            <RadioGrid
              selectedValue={formValues.roof.inclination}
              setSelected={updateInclination}
            />
            <div className="form__actions">
              <BlockCTA large left action={prevPage}>
                Back
              </BlockCTA>
              <BlockCTA large submit right>
                Next
              </BlockCTA>
            </div>
          </>
        )
      case 4:
        return (
          <>
            <SlideQuestion
              title="Enter your annual electric consumption"
              min={0}
              max={200}
              value={formValues.aec}
              onChange={e => {
                setFormValues({ ...formValues, aec: Number(e.target.value) })
              }}
              inputAdornments={{ end: "W" }}
            />
            <div className="form__actions">
              <BlockCTA large left action={prevPage}>
                Back
              </BlockCTA>
              <BlockCTA large submit right>
                Next
              </BlockCTA>
            </div>
          </>
        )
      case 5:
        return (
          <>
            <SlideQuestion
              title="Price per Watt of electricity"
              min={0}
              max={200}
              value={formValues.ppw}
              onChange={e => {
                setFormValues({ ...formValues, ppw: Number(e.target.value) })
              }}
              inputAdornments={{ start: "£" }}
            />
            <div className="form__actions">
              <BlockCTA large left action={prevPage}>
                Back
              </BlockCTA>
              <BlockCTA large submit right>
                Next
              </BlockCTA>
            </div>
          </>
        )
      case 6:
        return (
          <>
            <SlideQuestion
              title="Standing Charge"
              min={0}
              max={200}
              value={formValues.standingChange}
              onChange={e => {
                setFormValues({
                  ...formValues,
                  standingChange: Number(e.target.value),
                })
              }}
              inputAdornments={{ start: "£" }}
            />
            <div className="form__actions">
              <BlockCTA large left action={prevPage}>
                Back
              </BlockCTA>
              <BlockCTA large submit right>
                Next
              </BlockCTA>
            </div>
          </>
        )
      case 7:
        return (
          <>
            <div className="row">
              <Col6>
                <Heading level={3}>Household Usage</Heading>
                <Animate
                  properties={["opacity", "transform"]}
                  startValues={["0", "translateY(40px) rotate(0.5deg)"]}
                  endValues={["1", "translateY(0) rotate(0deg)"]}
                >
                  <div>
                    <FormSelect
                      name="beds"
                      label="Number of bedrooms"
                      options={["1", "2", "3", "4", "5", "6+"]}
                      onChange={e => {
                        setFormValues({
                          ...formValues,
                          property: {
                            ...formValues.property,
                            bedrooms: Number(e.target.value[0]),
                          },
                        })
                      }}
                    />
                    <br />
                    <FormCheckbox
                      name="own"
                      label="And if you own:"
                      options={Object.keys(propertyOptions)}
                      getOptionLabel={option => {
                        return propertyOptions[option]
                      }}
                      onChange={e => {
                        toggleProperty(e.target.value)
                      }}
                      value={formValues.property}
                    />
                  </div>
                </Animate>
              </Col6>
              <Col6>
                <Block>
                  <Heading level={4}>Why we need this information</Heading>
                  <p>
                    Our usage-based model means that our designs are truly cost
                    effective and based around your consumption, lifestyle and
                    needs. This is in order to design a system that generates
                    the optimum amount of energy, minimising surplus export to
                    the grid and reducing payback time.
                  </p>
                </Block>
              </Col6>
            </div>
            <div className="form__actions">
              <BlockCTA large left action={prevPage}>
                Back
              </BlockCTA>
              <BlockCTA large submit right>
                Next
              </BlockCTA>
            </div>
          </>
        )
      case 8:
        return (
          <>
            <Col6>
              <Heading level={3}>Enter your personal details</Heading>
              <Animate
                properties={["opacity", "transform"]}
                startValues={["0", "translateY(40px) rotate(0.5deg)"]}
                endValues={["1", "translateY(0) rotate(0deg)"]}
              >
                <div>
                  <FormInput
                    name="name"
                    id="name"
                    label="Full name"
                    placeholder="Type your full name..."
                    value={formValues.name}
                    onChange={updateTextValue}
                    required
                  />
                  <FormInput
                    name="email"
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="Type your email..."
                    value={formValues.email}
                    onChange={updateTextValue}
                    required
                  />
                  <FormInput
                    name="phone"
                    id="phone"
                    label="Phone number"
                    type="tel"
                    placeholder="Type your phone number..."
                    value={formValues.phone}
                    onChange={updateTextValue}
                    required
                  />
                </div>
              </Animate>
              <div className="form__actions">
                <BlockCTA large left action={prevPage}>
                  Back
                </BlockCTA>
                <BlockCTA large submit right>
                  Submit
                </BlockCTA>
              </div>
            </Col6>
            <Col6>
              <Image src="/images/quote-24.jpg" title="Fast Response" />
            </Col6>
          </>
        )
      default:
        return (
          <>
            No Page Here :)
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
        <div className="container container--column">
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
