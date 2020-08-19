import React from "react"
import { PageProps } from "gatsby"
import "./yourquote.scss"
import Heading from "../configurable/Heading"
import Hero from "../configurable/Hero"
import Col12 from "../grid/Col12"
import Block from "../configurable/Block"

let results: any = {
  // for testing purposes - replace with props.window.state
  totalCost: 8240.25,
  vat: 392.39,
  yearsPayback: 0,
  systemSize: 5.5,
  panelQuantity: 20,
  batterySize: 5,
  gridUseage: [],
  solarGeneration: [],
  solarToGrid: [],
  solarHomeUse: [],
  gridUse: [],
  solarToGridBattery: [],
  solarToHomeBattery: [],
  gridUseSolarBattery: [],
  predictedOutput: 0,
  assumedInflation: 0,
  onsiteEnergyConsumption: 0,
  co2Savings: 0,
  co2Savings20years: 0,
  projectReference: "44061SY20 5EE",
  postcode: "SY20 5EE",
  irradienceZone: "13",
  irradiationLevel: 0,
  roofPitch: 20,
  azimuth: 0,
  assumedEnergyInflation: 0,
  energyUnitCost: 0,
  twentyYearOutlook: [],
  item1:
    "Supply, Installation, Commissioning and Handover of Solar Photovoltaic System ( 5.5 kWdc )",
  item2:
    "Supply, Installation, Commissioning and Handover of Battery Storage System ( 5 kWdc )",
  additionalItems: [
    { "Grid Application": 160 },
    { "Sofar Solar 5000 HYD Hybrid Inverter": 258.4 },
  ],
  address: "34 Manor Way, Mitcham, SY20 5EE",
  name: "Kilian Seifert",
}

const YourQuotePage: React.FC<PageProps> = props => {
  results = props.location.state
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
            <div className="yourquote-container">
              <div className="yq-header">
                <h1>Your Quotation (Inclusive of VAT)</h1>
              </div>
              <div className="yq-total">
                <h3>£</h3>
                <h3>{results?.totalCost}</h3>
              </div>
              <div className="yq-subheading">
                <h2>Payment Terms</h2>
              </div>
              <div className="yq-paymentterms-table">
                <div>
                  <span className="yq-left">
                    <h3>Payment 1 @ 60% 14 Days prior to Installation Date</h3>
                  </span>
                  <span className="yq-right">
                    <h3>£</h3>
                    <h3>{(results?.totalCost * 0.6).toFixed(2)}</h3>
                  </span>
                </div>
                <div>
                  <span className="yq-left">
                    <h3>
                      Payment 2 @ 40% 7 days post Completion of Installation
                    </h3>
                  </span>
                  <span className="yq-right">
                    <h3>£</h3>
                    <h3>{(results?.totalCost * 0.4).toFixed(2)}</h3>
                  </span>
                </div>
                <div>
                  <span className="yq-left">
                    <h3>Estimated Years to Payback</h3>
                  </span>
                  <span className="yq-right">
                    <h3 />
                    <h3>{"some form result"}</h3>
                  </span>
                </div>
                <div>
                  <span className="yq-left">
                    <h3>System Size</h3>
                  </span>
                  <span className="yq-right">
                    <h3 />
                    <h3>{results?.systemSize} kWdc</h3>
                  </span>
                </div>
                <div>
                  <span className="yq-left">
                    <h3>Quantity of Panels</h3>
                  </span>
                  <span className="yq-right">
                    <h3 />
                    <h3>{results?.panelQuantity} panels</h3>
                  </span>
                </div>
                <div>
                  <span className="yq-left">
                    <h3>Battery Storage Size</h3>
                  </span>
                  <span className="yq-right">
                    <h3 />
                    <h3>{results?.batterySize} kWdc</h3>
                  </span>
                </div>
              </div>
              <div className="yq-subheading">
                <h2>Breakdown of Performance</h2>
              </div>
            </div>
          </Block>
        </Col12>
      </div>
    </div>
  )
}

export default YourQuotePage
