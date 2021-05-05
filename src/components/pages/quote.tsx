import React, { useState, FormEvent, useEffect, useRef } from "react"
import Hero from "../configurable/Hero"
import Heading from "../configurable/Heading"
import Block from "../configurable/Block"
import "./quote.scss"

import Col6 from "../grid/Col6"
import FormInput from "../olc-framework/FormInput"
import BlockCTA from "../configurable/BlockCTA"
import Image from "../configurable/Image"
import { PageProps, navigate } from "gatsby"
import InteractiveMap from "../standalone/InteractiveMap"
import Col12 from "../grid/Col12"
import { fromAddress, fromLatLong } from "../util/Quote/mapUtils"
import RadioGrid from "../standalone/RadioGrid"
import Shoutout from "../configurable/Shoutout"
import ArrowMap from "../standalone/ArrowMap"
import SlideQuestion from "../configurable/SlideInput"
import FormSelect from "../olc-framework/FormSelect"
import FormCheckbox from "../olc-framework/FormCheckbox"
import ProgressBar from "../configurable/ProgressBar"
import info from "~/vectors/info.svg"
import Col3 from "../grid/Col3"
import ReactModal from "react-modal"
import { useQueryParam, getSearchParams } from "gatsby-query-params"
const postcodeRegex =
  "^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})"

const googleCampaignQueryKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
]

const quoteTypes = { COMMERCIAL: "commercial", DOMESTIC: "domestic" }

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
    lng: number
  }
  companyName: string
  roof: {
    azimuth: number
    inclination: number
    area: number
    roofMaterial: string
  }
  property: {
    bedrooms: number
    eCar: boolean
    pool: boolean
    heater: boolean
    eHeater: boolean
    pump: boolean
    hotTub: boolean
    ownsHouse: string
    flat: string
    houseType: string
    buildingType: string
  }
  commercialUsage: {
    numberOfEmployees: string
    numberOfCarParkingSpaces: string
    numberOfOffices: string
    additionalItems: {
      batteryStorage: boolean
      evChargers: boolean
      solarHeat: boolean
    }
    furtherDiscussionRequired: boolean
  }
  eac: number
  ppw: number
  standingCharge: number
  discount: boolean
  worksFromHome: string
  sales: {
    timescale: "3 Months" | "6 Months" | "12 Months" | ""
    paymentMethod: "Own Funds" | "Pay Monthly" | "Both" | ""
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
  location: {
    lat: 0,
    lng: 0
  },
  companyName: null,
  roof: {
    azimuth: 0,
    inclination: 1,
    area: 21.84,
    roofMaterial: "",
  },
  commercialUsage: {
    numberOfEmployees: "",
    numberOfCarParkingSpaces: "",
    numberOfOffices: "",
    furtherDiscussionRequired: false,
    additionalItems: {
      batteryStorage: false,
      evChargers: false,
      solarHeat: false,
    },
  },
  property: {
    bedrooms: 0,
    eCar: false,
    pool: false,
    heater: false,
    eHeater: false,
    pump: false,
    hotTub: false,
    ownsHouse: "",
    flat: "",
    buildingType: "",
    houseType: "",
  },
  eac: 3500,
  ppw: 17.56,
  standingCharge: 22.26,
  discount: false,
  worksFromHome: "",
  sales: {
    timescale: "",
    paymentMethod: "",
  },
}

const awaitForLocalStorageNastyHack = () => {
  // recursive await for local storage lol???
  return new Promise(resolve => {
    if (!window || !window.localStorage) {
      setTimeout(() => resolve(awaitForLocalStorageNastyHack), 333)
    }

    return resolve()
  })
}

const propertyOptions = {
  eCar: "Electric Car",
  heater: "Air Source Heating", // check this
  pool: "Swimming Pool",
  pump: "Heat Pump",
  hotTub: "Hot Tub",
  eHeating: "Electric Heating",
}

const commercialOptions = {
  batteryStorage: "Battery Storage",
  evChargers: "EV Chargers",
  solarHeat: "Solar heat",
}

const roofTypes = {
  ["Concrete"]: "concreteRoof",
  ["Slate"]: "slateRoof",
  ["Rosemary"]: "rosemary",
  ["Flat roof"]: "flatRoof",
  ["Trapezoidal"]: "trapezoidal",
  ["Ground mounted"]: "groundMounted",
  ["In roof"]: "inRoof",
  ["Dekra"]: "dekra",
}

const SPECIAL_PRICE_KEY = "utm_campaign"
const SPECIAL_PRICE_VALUE = "special_price"

const QuotePage: React.FC<PageProps> = props => {
  const [formValues, setFormValues] = useState<IQuoteFormValues>({
    ...values,
    ...props.location.state,
  })
  const [listed, setListed] = useState<string>("No")
  const [page, _setPage] = useState(0)
  const setPage = num => {
    if (num > page) {
      setAnim("next-scroll-out")
      setTimeout(() => {
        setAnim("next-scroll-in")
        _setPage(num)
      }, 150)
    } else {
      setAnim("prev-scroll-out")
      setTimeout(() => {
        setAnim("prev-scroll-in")
        _setPage(num)
      }, 150)
    }
  }
  const [location, setLocation] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  })
  const [status, setStatus] = useState<"form" | "loading">("form") // status for when values are posted
  const scrollRef = useRef<HTMLDivElement>(null)
  const [anim, setAnim] = useState<string>("fade-in")
  const quoteType = useQueryParam("type", quoteTypes.DOMESTIC)
  const [errorText, setErrorText] = useState(null)
  // Check for discount query string params on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(props.location.search)

    const campaignValues = googleCampaignQueryKeys.reduce((obj, key) => {
      obj[key] = urlParams.get(key) || null
      return obj
    }, {})

    setFormValues({ ...formValues, ...campaignValues })

    const checkForDiscount = async () => {
      await awaitForLocalStorageNastyHack() // awaits local storage
      const storedSpecialVal = window.localStorage.getItem(SPECIAL_PRICE_KEY)
      let discount = false
      if (storedSpecialVal === SPECIAL_PRICE_VALUE) {
        // if value exists, set discounted to true
        discount = true
      } else if (urlParams.get(SPECIAL_PRICE_KEY) === SPECIAL_PRICE_VALUE) {
        // if query string params exist, update local storage + set discount true
        window.localStorage.setItem(SPECIAL_PRICE_KEY, SPECIAL_PRICE_VALUE)
        discount = true
      }
      setFormValues({ ...formValues, discount })
    }
    checkForDiscount()
  }, [])

  useEffect(() => {
    page !== 0 && scrollRef.current && scrollRef.current.scrollIntoView({ block: "center"})
    page === 0 && window.scrollTo(0, 0)
  }, [page])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // handles form submission - will either go to the next page or submit formValues
    e.preventDefault()
    if (page !== pages - 1) {
      setPage(page + 1)
    } else {
      const postFormValues = async () => {
        const req: RequestInit = {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formValues,
            roof: {
              ...formValues.roof,
              roofMaterial: roofTypes[formValues.roof.roofMaterial],
            },
            location: {...location}
          }), // I know, i know
        }
        try {
          let quote = await fetch(
            // "https://europe-west2-get-uk.cloudfunctions.net/get-quote",
            // "https://enjfl9p7t8b746.m.pipedream.net/",
            // "http://localhost:8081",
            "https://europe-west2-get-solar.cloudfunctions.net/quote",
            req
          ) // post form values
          quote = await quote.json()

          return navigate("/yourquote", { state: quote }) // Navigates to show quote page with the returned values
        } catch (error) {
          setErrorText(
            "There has been an error collecting your quote. Please try again later and contact us if the issue continues."
          )
          setStatus("form")
          setPage(0)
        }
      }
      setAnim("fade-in")
      setStatus("loading")
      return postFormValues() // so it can be async
    }
  }

  const prevPage = () => {
    setPage(page - 1)
  }

  const updateTextValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Updates a text value in formValues
    let newFv = { ...formValues }
    newFv[e.target.id] = e.target.value
    setFormValues(newFv)
  }

  const updateInclination = (e: number) => {
    const newFv = { ...formValues }
    newFv.roof.inclination = e
    setFormValues(newFv)
  }

  const updateLocation = async (coords: { lat: number; lng: number }) => {
    console.log("update location")
 
    setLocation(coords)
    propagateLocation(coords)
  }

  const updatePostcode = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Special case for initial postcode box - updates coordinates based on postcode
    let pc = e.target.value.toUpperCase()
    if (new RegExp(postcodeRegex).test(pc)) {
      fromAddress(pc).then(async res => {
        updateLocation(res as { lat: number; lng: number })
      })
    }
  }

  const propagateAddress = () => {
    const address = `${formValues.houseNumber}, ${formValues.street}, ${formValues.town}`
    // fromAddress(address).then(coords =>
    //   setLocation(coords as { lat: number; lng: number })
    // )
  }

  const propagateLocation = async (loc: { lat: number; lng: number }) => {
    console.log("Propagate loc")
    const address = await fromLatLong(loc.lat, loc.lng)
    console.log(
      address.find(
        element =>
          element.types.includes("street_number") ||
          element.types.includes("premise")
      )
    )

    if (address) {
      const houseNumber = address.find(
        element =>
          element.types.includes("street_number") ||
          element.types.includes("premise")
      ) || { long_name: formValues.houseNumber }

      const street = address.find(element =>
        element.types.includes("route")
      ) || { long_name: "" }

      const town = address.find(element =>
        element.types.includes("postal_town")
      ) || { long_name: "" }

      const postcode = address.find(element =>
        element.types.includes("postal_code")
      ) || { long_name: "" }

      const newFv = {
        ...formValues,
        houseNumber: houseNumber.long_name,
        street: street.long_name,
        town: town.long_name,
        postcode: postcode.long_name,
      }
      setFormValues(newFv)
    }
  }

  const toggleProperty = (id: string) => {
    const newP = { ...formValues.property }
    newP[id] = !newP[id]
    setFormValues({ ...formValues, property: newP })
  }

  const validateRadioGrid = () => {
    if (formValues.roof.inclination === 1) {
      // if no inclination has been selected
      setErrorText(
        'Please select an inclination value or click "unsure" to use the national average'
      )
    } else {
      setPage(page + 1)
    }
  }

  const pages = 10

  const getPage = p => {
    switch (p) {
      case 0:
        return (
          <Shoutout
            image={
              <Image
                src="/images/green-energy-together.jpg"
                title="Products"
                className="firstpageImage"
              />
            }
            text={
              <div className="firstpage">
                <div>
                  {quoteType?.toLowerCase() !== quoteTypes.COMMERCIAL ? (
                    <>
                      <Heading underlined level={1}>
                        Get your instant quote in minutes
                      </Heading>
                      <Heading level={3}>No sales visit required</Heading>
                    </>
                  ) : (
                    <>
                      <Heading underlined level={1}>
                        Get a Quote
                      </Heading>
                      <Heading level={3}>
                        Enter your postcode to get started
                      </Heading>
                    </>
                  )}
                </div>
                <FormInput
                  name="postcode"
                  placeholder="Enter postcode..."
                  required
                  pattern={postcodeRegex}
                  title="Please enter a valid UK postcode"
                  onChange={updatePostcode}
                  id="postcode"
                />

                <div className="form__actions">
                  <BlockCTA large submit className="fl-r hide-mob">
                    Get Started
                  </BlockCTA>
                  <BlockCTA large submit fullWidth className="hide-lg">
                    Get Started
                  </BlockCTA>
                </div>
              </div>
            }
          />
        )
      case 1:
        return (
          <div className="row center">
            <Col6>
              <InteractiveMap
                location={location}
                setLocation={updateLocation}
              />
            </Col6>
            <Col6>
              <Heading level={3} underlined>
                Find your property
              </Heading>
              <br />
              <div>
                {quoteType?.toLowerCase() === quoteTypes.COMMERCIAL && (
                  <FormInput
                    name="companyName"
                    id="companyName"
                    label="Company name*"
                    placeholder="Enter company name..."
                    type="text"
                    required
                    value={formValues.companyName}
                    onChange={updateTextValue}
                  />
                )}
                <FormInput
                  name="houseNumber"
                  id="houseNumber"
                  label="House number/name*"
                  placeholder="Enter house number..."
                  type="text"
                  required
                  value={formValues.houseNumber}
                  onBlur={propagateAddress}
                  onChange={updateTextValue}
                />
                <FormInput
                  name="street"
                  id="street"
                  label="Street*"
                  type="text"
                  placeholder="Enter street name..."
                  required
                  value={formValues.street}
                  onChange={updateTextValue}
                  onBlur={propagateAddress}
                />
                <FormInput
                  name="town"
                  id="town"
                  label="Town*"
                  type="text"
                  placeholder="Enter town..."
                  required
                  value={formValues.town}
                  onChange={updateTextValue}
                  onBlur={propagateAddress}
                />
                <FormInput
                  name="postcode"
                  id="postcode"
                  label="Postcode*"
                  placeholder="Enter postcode..."
                  required
                  pattern="^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})"
                  title="Please enter a valid UK postcode"
                  value={formValues.postcode}
                  onChange={updateTextValue}
                  onBlur={propagateAddress}
                />
              </div>
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
            <div className="row">
              <Col6>
                <ArrowMap
                  location={location}
                  setAzimuth={azimuth => {
                    setFormValues({
                      ...formValues,
                      roof: { ...formValues.roof, azimuth },
                    })
                  }}
                />
              </Col6>
              <Col6>
                <Block>
                  <Heading level={3} underlined>
                    Generating your quote
                  </Heading>
                  <p>
                    At Green Energy Together we love efficient processes. The
                    following information will allow us to generate an
                    extraordinarily comprehensive quote available for you
                    immediately, including costs, recommended system size,
                    This process takes approximately 3 minutes.
                  </p>
                  <br />
                  <p>
                    <em>100% transparency. 100% efficiency. 0% hassle.</em>
                  </p>
                </Block>
              </Col6>
            </div>
            <div className="form__actions">
              <BlockCTA large left action={prevPage}>
                Back
              </BlockCTA>
              <BlockCTA
                large
                action={() => {
                  setPage(page + 1)
                }}
                right
              >
                Next
              </BlockCTA>
            </div>
          </>
        )
      case 3:
        return quoteType.toLowerCase() === quoteTypes.COMMERCIAL ? (
          <>
            <Heading>Tell us about your roof*</Heading>
            <FormSelect
              required
              name="roofMaterial"
              label="What is your property made from?*"
              options={Object.keys(roofTypes)}
              value={formValues.roof.roofMaterial}
              onChange={e => {
                setFormValues({
                  ...formValues,
                  roof: {
                    ...formValues.roof,
                    roofMaterial: e.target.value,
                  },
                })
              }}
            />
            <FormSelect
              required
              name="buildingType"
              label="Select your building type*"
              options={[
                "School or University",
                "Warehouse",
                "Farm",
                "Commercial building",
                "Offices",
                "Hospital or care",
                "Other",
              ]}
              value={formValues.property.buildingType}
              onChange={e => {
                setFormValues({
                  ...formValues,
                  property: {
                    ...formValues.property,
                    buildingType: e.target.value,
                  },
                })
              }}
            />
            <div className="form__actions">
              <BlockCTA large left action={prevPage}>
                Back
              </BlockCTA>
              <BlockCTA
                large
                right
                submit
                action={() => {
                  setFormValues({
                    ...formValues,
                    roof: { ...formValues.roof, inclination: -1 },
                  })
                }}
              >
                Next
              </BlockCTA>
            </div>
          </>
        ) : (
          <>
            <Heading level={3}>
              Choose the angle that best matches your roof*
            </Heading>
            <RadioGrid
              selectedValue={formValues.roof.inclination}
              setSelected={updateInclination}
            />
            <div className="form__actions">
              <BlockCTA large left action={prevPage}>
                Back
              </BlockCTA>
              <BlockCTA large right action={validateRadioGrid}>
                Next
              </BlockCTA>
              <BlockCTA
                className="btn-unsure"
                title="Don't worry, we will use the national average."
                large
                right
                action={() => {
                  setFormValues({
                    ...formValues,
                    roof: { ...formValues.roof, inclination: -1 },
                  })
                  setPage(page + 1)
                }}
              >
                Unsure
              </BlockCTA>
            </div>
          </>
        )
      case 4:
        return quoteType.toLowerCase() === quoteTypes.COMMERCIAL ? (
          <>
            <SlideQuestion
              title="How big is your roof?"
              subtitle={
                <span style={{ display: "flex", alignItems: "center" }}>
                  <img src={info} alt="Tip:" style={{ marginRight: "20px" }} />
                  <em style={{ fontSize: "0.85em" }}>
                    For reference, 1m<sup>2</sup> is about as big as a bath
                    towel, 10m<sup>2</sup> is about as big as a parking space
                    and 250m<sup>2</sup> is about as big as a tennis court.
                    <br />
                    Don't worry if you're not sure of the exact size - we only
                    need an estimate.
                    <br />
                    If your roof is bigger than 80m<sup>2</sup> further
                    information might be necessary to refine your quote. An
                    advisor will be in touch to assist you.
                  </em>
                </span>
              }
              min={5}
              max={1000000}
              average={21.84}
              value={formValues.roof.area}
              onChange={e => {
                setFormValues({
                  ...formValues,
                  roof: { ...formValues.roof, area: Number(e.target.value) },
                })
              }}
              inputBox
              inputAdornments={{
                end: (
                  <span>
                    m<sup>2</sup>
                  </span>
                ),
              }}
              key={"roof"}
            />
            <div className="form__actions">
              <BlockCTA large left action={prevPage}>
                Back
              </BlockCTA>
              <BlockCTA large submit right>
                Next
              </BlockCTA>
              <BlockCTA
                className="btn-unsure"
                title="Don't worry, we will use the national average."
                large
                right
                action={() => {
                  setFormValues({
                    ...formValues,
                    roof: { ...formValues.roof, area: -1 },
                  })
                  setPage(page + 1)
                }}
              >
                Unsure
              </BlockCTA>
            </div>
          </>
        ) : (
          <>
            <Heading level={3}>Please tell us about your property</Heading>
            <br />
            <div className="row lower-margin">
              <Col3>
                <input
                  required
                  className="hidden radio-label"
                  type="radio"
                  name="housetype"
                  id="flat"
                  value="flat"
                  checked={formValues.property.houseType === "flat"}
                  onChange={e => {
                    setErrorText(
                      "We cannot install a panel in a flat, please contact us directly for more information"
                    )
                  }}
                />
                <label className="button-label" htmlFor="flat">
                  <img
                    className="house-type label-image "
                    src="/images/flats-type.png"
                  />
                </label>
                <div className="input-label-text">Flat/Apartment</div>
              </Col3>
              <Col3>
                <input
                  required
                  className="hidden radio-label"
                  type="radio"
                  name="housetype"
                  id="terraced"
                  value="terraced"
                  checked={formValues.property.houseType === "terraced"}
                  onChange={e => {
                    setFormValues({
                      ...formValues,
                      property: {
                        ...formValues.property,
                        houseType: e.target.value,
                      },
                    })
                  }}
                />
                <label className="button-label" htmlFor="terraced">
                  <img
                    className=" house-type label-image"
                    src="/images/terraced-type.png"
                  />
                </label>
                <div className="input-label-text">Terraced House</div>
              </Col3>
              <Col3>
                <input
                  required
                  className="hidden radio-label"
                  type="radio"
                  name="housetype"
                  id="semi-detached"
                  value="semi-detached"
                  checked={formValues.property.houseType === "semi-detached"}
                  onChange={e => {
                    setFormValues({
                      ...formValues,
                      property: {
                        ...formValues.property,
                        houseType: e.target.value,
                      },
                    })
                  }}
                />
                <label className="button-label" htmlFor="semi-detached">
                  <img
                    className="house-type label-image"
                    src="/images/semi-detached-type.png"
                  />
                </label>
                <div className="input-label-text">Semi-detached House</div>
              </Col3>
              <Col3>
                <input
                  required
                  className="hidden radio-label"
                  type="radio"
                  name="housetype"
                  id="detached"
                  value="detached"
                  onChange={e => {
                    setFormValues({
                      ...formValues,
                      property: {
                        ...formValues.property,
                        houseType: e.target.value,
                      },
                    })
                  }}
                  checked={formValues.property.houseType === "detached"}
                />
                <label className="button-label" htmlFor="detached">
                  <img
                    className="house-type label-image"
                    src="/images/detached-type.png"
                  />
                </label>
                <div className="input-label-text">Detached House</div>
              </Col3>
            </div>
            <br />
            <FormSelect
              required
              name="listed"
              label="Is your property a listed building?*"
              options={["No", "Yes"]}
              value={listed}
              onChange={e => {
                setListed(e.target.value)
              }}
            />
            <div className="form__actions">
              <BlockCTA large left action={prevPage}>
                Back
              </BlockCTA>
              <BlockCTA
                large
                right
                action={() => {
                  if (listed != "No") {
                    setErrorText(
                      "We cannot install panels on listed buildings, please contact us directly for more information."
                    )
                  } else {
                    setFormValues({
                      ...formValues,
                      roof: { ...formValues.roof, area: -1 },
                    })
                    setPage(page + 1)
                  }
                }}
              >
                Next
              </BlockCTA>
            </div>
          </>
        )
      case 5:
        return (
          <>
            <SlideQuestion
              title="How much electricity do you use each year?"
              subtitle={
                <span style={{ display: "flex", alignItems: "center" }}>
                  <img src={info} alt="Tip:" style={{ marginRight: "5px" }} />
                  <em>You can find this information on your energy bill.</em>
                </span>
              }
              min={1000}
              max={12500}
              step={5}
              average={3500}
              value={formValues.eac}
              onChange={e => {
                setFormValues({ ...formValues, eac: Number(e.target.value) })
              }}
              inputAdornments={{ end: "kWh" }}
              key={"eac"}
              inputBox
            />
            <div className="form__actions">
              <BlockCTA large left action={prevPage}>
                Back
              </BlockCTA>
              <BlockCTA large submit right>
                Next
              </BlockCTA>
              <BlockCTA
                className="btn-unsure"
                title="Don't worry, we will use the national average."
                large
                right
                action={() => {
                  setFormValues({
                    ...formValues,
                    eac: -1,
                    ppw: -1,
                    standingCharge: -1,
                  })
                  setPage(page + 3)
                }}
              >
                Unsure
              </BlockCTA>
            </div>
          </>
        )
      case 6:
        return (
          <>
            <SlideQuestion
              title="What do you pay per kWh of electricity?"
              subtitle={
                <span style={{ display: "flex", alignItems: "center" }}>
                  <img src={info} alt="Tip:" style={{ marginRight: "5px" }} />
                  <em>You can find this information on your energy bill.</em>
                </span>
              }
              min={1}
              step={0.01}
              max={200}
              average={17.56}
              value={formValues.ppw}
              onChange={e => {
                setFormValues({
                  ...formValues,
                  ppw: Number(e.target.value),
                })
              }}
              type="money"
              key={"ppw"}
              inputBox
            />
            <div className="form__actions">
              <BlockCTA large left action={prevPage}>
                Back
              </BlockCTA>
              <BlockCTA large submit right>
                Next
              </BlockCTA>
              <BlockCTA
                className="btn-unsure"
                title="Don't worry, we will use the national average."
                large
                right
                action={() => {
                  setFormValues({ ...formValues, ppw: -1 })
                  setPage(page + 1)
                }}
              >
                Unsure
              </BlockCTA>
            </div>
          </>
        )
      case 7:
        return (
          <>
            <SlideQuestion
              title="What do you pay as a standing charge?"
              subtitle={
                <span style={{ display: "flex", alignItems: "center" }}>
                  <img src={info} alt="Tip:" style={{ marginRight: "5px" }} />
                  <em>You can find this information on your energy bill.</em>
                </span>
              }
              min={0}
              max={60}
              step={0.01}
              average={22.26}
              value={formValues.standingCharge}
              onChange={e => {
                setFormValues({
                  ...formValues,
                  standingCharge: Number(e.target.value),
                })
              }}
              type="money"
              key={"sc"}
              inputBox
            />
            <div className="form__actions">
              <BlockCTA large left action={prevPage}>
                Back
              </BlockCTA>
              <BlockCTA large submit right>
                Next
              </BlockCTA>
              <BlockCTA
                className="btn-unsure"
                title="Don't worry, we will use the national average."
                large
                right
                action={() => {
                  setFormValues({ ...formValues, standingCharge: -1 })
                  setPage(page + 1)
                }}
              >
                Unsure
              </BlockCTA>
            </div>
          </>
        )
      case 8:
        return quoteType.toLowerCase() === quoteTypes.COMMERCIAL ? (
          <>
            <div className="row">
              <Col6>
                <Heading level={3}> Commercial Usage</Heading>
                <div>
                  <FormSelect
                    name="numberOfEmployees"
                    label="Number of employees"
                    options={["1-10", "10-100", "100+"]}
                    onChange={e => {
                      setFormValues({
                        ...formValues,
                        commercialUsage: {
                          ...formValues.commercialUsage,
                          numberOfEmployees: e.target.value,
                        },
                      })
                    }}
                  />
                  <br />

                  <FormSelect
                    name="parkingSpaces"
                    label="Number of car parking spaces"
                    options={["1-10", "10-100", "100+"]}
                    onChange={e => {
                      setFormValues({
                        ...formValues,
                        commercialUsage: {
                          ...formValues.commercialUsage,
                          numberOfCarParkingSpaces: e.target.value,
                        },
                      })
                    }}
                  />
                  <br />
                  <FormSelect
                    name="numberOfOffices"
                    label="Number of offices/buildings"
                    options={["1-10", "10-100", "100+"]}
                    onChange={e => {
                      setFormValues({
                        ...formValues,
                        commercialUsage: {
                          ...formValues.commercialUsage,
                          numberOfOffices: e.target.value,
                        },
                      })
                    }}
                  />
                  <br />
                  <FormCheckbox
                    name="additionalItems"
                    label="Do you require any of the following additional items?"
                    options={Object.keys(commercialOptions)}
                    getOptionLabel={e => commercialOptions[e]}
                    onChange={e => {
                      const additionalItems = {
                        ...formValues.commercialUsage.additionalItems,
                      }
                      additionalItems[e.target.value] = !additionalItems[
                        e.target.value
                      ]
                      console.log(additionalItems)
                      setFormValues({
                        ...formValues,
                        commercialUsage: {
                          ...formValues.commercialUsage,
                          additionalItems,
                        },
                      })
                    }}
                    value={formValues.commercialUsage}
                  />
                  <br />
                  <FormSelect
                    name="discussFunding"
                    label="Would you like to discuss funding options?"
                    options={["Yes", "No"]}
                    required
                    value={
                      formValues.commercialUsage.furtherDiscussionRequired
                        ? "yes"
                        : "no"
                    }
                    onChange={e => {
                      setFormValues({
                        ...formValues,
                        commercialUsage: {
                          ...formValues.commercialUsage,
                          furtherDiscussionRequired:
                            e.target.value === "Yes" ? true : false,
                        },
                      })
                    }}
                  />
                </div>
              </Col6>
              <Col6>
                <Block className="hide-mob">
                  <Heading level={3} underlined>
                    Why we need this information
                  </Heading>
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
              <BlockCTA
                large
                right
                submit
                action={() => {
                  console.log(formValues)
                }}
              >
                Next
              </BlockCTA>
            </div>
          </>
        ) : (
          <>
            <div className="row">
              <Col6>
                <Heading level={3}>Household Usage</Heading>
                <div>
                  <FormSelect
                    required
                    name="beds"
                    label="How many bedrooms do you have?*"
                    value={formValues.property.bedrooms === 6 ? "6+" : formValues.property.bedrooms.toString()}
                    options={["2", "3", "4", "5", "6+"]}
                    onChange={e => {
                      setFormValues({
                        ...formValues,
                        property: {
                          ...formValues.property,
                          bedrooms: Number(e.target.value[0]) || 6,
                        },
                      })
                    }}
                  />
                  <br />

                  <FormSelect
                    required
                    name="ownsHome"
                    label="Do you own your home?*"
                    options={["Yes", "No"]}
                    value={formValues.property.ownsHouse}
                    onChange={e => {
                      setFormValues({
                        ...formValues,
                        property: {
                          ...formValues.property,
                          ownsHouse: e.target.value,
                        },
                      })
                    }}
                  />
                  <br />
                  <FormSelect
                    required
                    name="flat"
                    label="Do you live in a flat?*"
                    options={[
                      "Yes, on the top floor",
                      "Yes, but NOT on the top floor",
                      "I do not live in a flat",
                    ]}
                    value={formValues.property.flat}
                    onChange={e => {
                      setFormValues({
                        ...formValues,
                        property: {
                          ...formValues.property,
                          flat: e.target.value,
                        },
                      })
                    }}
                  />
                  <br />
                  <FormSelect
                    required
                    name="salesTimescale"
                    label="How many months until want you to make the purchase?*"
                    options={[
                      "3 Months",
                      "6 Months",
                      "12 Months",
                      "12 Months +",
                    ]}
                    value={formValues.sales.timescale}
                    onChange={e => {
                      setFormValues({
                        ...formValues,
                        sales: {
                          ...formValues.sales,
                          timescale: e.target.value as
                            | "3 Months"
                            | "6 Months"
                            | "12 Months",
                        },
                      })
                    }}
                  />
                  <br />
                  <FormSelect
                    required
                    name="salesPaymentMethod"
                    label="How would you be making the purchase?*"
                    options={["Own Funds", "Pay Monthly", "Both"]}
                    value={formValues.sales.paymentMethod}
                    onChange={e => {
                      setFormValues({
                        ...formValues,
                        sales: {
                          ...formValues.sales,
                          paymentMethod: e.target.value as
                            | "Own Funds"
                            | "Pay Monthly"
                            | "Both",
                        },
                      })
                    }}
                  />
                  <br />
                  {/* <FormSelect
                    required
                    name="workFromHome"
                    label="Do you work from home?*"
                    options={["Yes, permanently", "Yes, temporarily", "No"]}
                    value={formValues.worksFromHome}
                    onChange={e => {
                      setFormValues({
                        ...formValues,
                        worksFromHome: e.target.value,
                      })
                    }}
                  />
                  <br /> */}
                  <FormCheckbox
                    name="own"
                    label="Do you own any of the following?"
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
              </Col6>
              <Col6>
                <Block className="hide-mob">
                  <Heading level={3} underlined>
                    Why we need this information
                  </Heading>
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
      case 9:
        return (
          <Col12>
            <Col6>
              <div>
                <Heading level={3}>Enter your contact details</Heading>

                <FormInput
                  name="name"
                  id="name"
                  label="Full name*"
                  placeholder="Type your full name..."
                  value={formValues.name}
                  onChange={updateTextValue}
                  required
                />
                <FormInput
                  name="email"
                  id="email"
                  label="Email*"
                  type="email"
                  placeholder="Type your email..."
                  value={formValues.email}
                  onChange={updateTextValue}
                  required
                />
                <FormInput
                  name="phone"
                  id="phone"
                  label="Phone number*"
                  type="tel"
                  placeholder="Type your phone number..."
                  value={formValues.phone}
                  onChange={updateTextValue}
                  required
                />
              </div>
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
              <Image
                src="/images/staff.jpg"
                className="contact-image-bottom hide-mob"
                title="Fast Response"
              />
            </Col6>
          </Col12>
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
    <>
      <ReactModal
        isOpen={!!errorText}
        contentLabel="Inline Styles Modal Example"
        onRequestClose={() => {
          setErrorText(null)
        }}
        style={{
          overlay: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          },
          content: {
            borderRadius: 15,
            padding: 40,
            backgroundColor: "#3c96c5",
            position: "relative",
            color: "white",
          },
        }}
      >
        <h1>Sorry</h1>
        <br />
        <p>{errorText}</p>
        <br />
        <BlockCTA
          large
          action={() => {
            setErrorText(null)
          }}
          right
        >
          Close
        </BlockCTA>
      </ReactModal>
      <div className="quote-page">
        <Hero imageUrl="/images/quote-banner.jpg" compact>
          <Heading level={1} underlined>
            Get a Quote
          </Heading>
        </Hero>
        <Block>
          <div
            className={`container container--column quote-container`}
            ref={scrollRef}
          >
            <Col12>
              <form
                name="quote-form"
                onSubmit={handleSubmit}
                className={`form form--full-width .anim-scroll ${anim}`}
                key={page.toString()}
              >
                {status === "form" ? (
                  getPage(page)
                ) : (
                  <div className="loading-container">
                    <Heading level={3}>
                      Please wait while we generate your quote...
                    </Heading>
                    <ProgressBar duration={9000} color="#3c96c5" />
                  </div>
                )}
              </form>
            </Col12>
          </div>
        </Block>
      </div>
    </>
  )
}

export default QuotePage
