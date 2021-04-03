import React, { useState } from "react"
import { PageProps } from "gatsby"
import "./yourquote.scss"
import Heading from "../configurable/Heading"
import Hero from "../configurable/Hero"
import Col12 from "../grid/Col12"
import Block from "../configurable/Block"
import StarRatings from "react-star-ratings"
import FormInput from "../olc-framework/FormInput"
import { ControlledFormTextarea } from "../olc-framework/FormTextarea"
import BlockCTA from "../configurable/BlockCTA"
import ProgressBar from "../configurable/ProgressBar"

// let results: any = {
//   // for testing purposes - replace with props.window.state
//   totalCost: 8240.25,
//   vat: 392.39,
//   yearsPayback: 0,
//   systemSize: 5.5,
//   panelQuantity: 20,
//   batterySize: 5,
//   gridUseage: [],
//   solarGeneration: [],
//   solarToGrid: [],
//   solarHomeUse: [],
//   gridUse: [],
//   solarToGridBattery: [],
//   solarToHomeBattery: [],
//   gridUseSolarBattery: [],
//   predictedOutput: 0,
//   assumedInflation: 0,
//   onsiteEnergyConsumption: 0,
//   co2Savings: 0,
//   co2Savings20years: 0,
//   projectReference: "",
//   postcode: "",
//   irradienceZone: "",
//   irradiationLevel: 0,
//   roofPitch: 20,
//   azimuth: 0,
//   assumedEnergyInflation: 0,
//   energyUnitCost: 0,
//   twentyYearOutlook: [],
//   firstYearUse: {
//     demand: [],
//     solar: [],
//     exportAfterBattery: [],
//     selfConsumptionTotal: [],
//     demandTotal: [],
//   },
//   item1:
//     "Supply, Installation, Commissioning and Handover of Solar Photovoltaic System ( 5.5 kWdc )",
//   item2:
//     "Supply, Installation, Commissioning and Handover of Battery Storage System ( 5 kWdc )",
//   additionalItems: [],
//   address: "",
//   name: "",
// }

const rnd = (num: number) => {
  return (Math.round((num + Number.EPSILON) * 100) / 100).toFixed(2)
}
const sum = (arr: Array<number>) => {
  return arr.reduce((a, b) => {
    return a + b
  }, 0)
}

const colorScale = [
  "#57bb8a",
  "#73b87e",
  "#94bd77",
  "#b0ce6e",
  "#d4d56a",
  "#f5ce62",
  "#f3c563",
  "#e6ad61",
  "#e9a268",
  "#e5926b",
  "#e0816d",
  "#dd776e",
]

interface Quote {
  email: string
  name: string
}

const YourQuotePage: React.FC<PageProps> = props => {
  const [rating, setRating] = useState<number>(0)
  const [comments, setComments] = useState<string>("")
  const [status, setStatus] = useState<null|"loading"|"completed">(null)
  const results: Quote = props?.location?.state as Quote


  const handleSubmit = async() => {
      setStatus("loading")
      const req: RequestInit = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({comments, rating, displayName: results?.name || "Unknown User"}),
      }
      try {
        let resp = await fetch(
          "http://localhost:8080",
          req
        ) // post form values
        await resp.json()
        setStatus("completed")
        
      } catch (error) {
        setStatus(null)
        alert("Sorry, something went wrong")
      }
  }

  return (
    <div className="yourquote-page">
      <Hero imageUrl="/images/quote-banner.jpg" compact>
        <Heading level={1} underlined>
          Your Quote
        </Heading>
      </Hero>
      <div className="container container--column">
        <Col12>
          <Block>
            <h1>
              Thank you for using our Solar Quoter we hope you found it easy to
              use.
            </h1>
            <h2>
              {results?.email && `An email has been sent to ${results.email}`}
            </h2>
            <h2>
              Please check your inbox and junk folder for your personalized
              quotation.
            </h2>
            {status === null &&
            <><h3>
            Please leave a rating and comment below to let us know how our
            quote service can be improved
          </h3>
          <br />
          <label className="form-textarea__label">Rating</label>
          <StarRatings
            rating={rating}
            starRatedColor="#051c3f"
            changeRating={setRating}
            numberOfStars={5}
            name="rating"
          />
          <div>
          <br />
          <ControlledFormTextarea
            name="comments"
            label="Comments"
            className="comments"
            value={comments}
            onChange={e => {
              setComments(e.target.value)
            }}
          />
          </div>
          <br />
          <BlockCTA
            large
            action={handleSubmit}
            className=""
          >
            Submit
          </BlockCTA>
           
            </>
            } {status === "loading" && <div className="loading-container"><ProgressBar duration={2000} color="#3c96c5" /></div> }
            {status === "completed" && <><br/><div className="loading-container"><u><i><h1>Thanks for your feedback</h1></i></u></div></> }
          </Block>
        </Col12>
      </div>
    </div>
  )
}

export default YourQuotePage
