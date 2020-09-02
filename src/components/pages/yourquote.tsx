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
  projectReference: "",
  postcode: "",
  irradienceZone: "",
  irradiationLevel: 0,
  roofPitch: 20,
  azimuth: 0,
  assumedEnergyInflation: 0,
  energyUnitCost: 0,
  twentyYearOutlook: [],
  firstYearUse: {
    demand: [],
    solar: [],
    exportAfterBattery: [],
    selfConsumptionTotal: [],
    demandTotal: [],
  },
  item1:
    "Supply, Installation, Commissioning and Handover of Solar Photovoltaic System ( 5.5 kWdc )",
  item2:
    "Supply, Installation, Commissioning and Handover of Battery Storage System ( 5 kWdc )",
  additionalItems: [],
  address: "",
  name: "",
}

const rnd = (num: number) => {
  return (Math.round((num + Number.EPSILON) * 100) / 100).toFixed(2)
}
const sum = (arr: Array<number>) => {
  return arr.reduce((a, b) => {
    return a + b
  }, 0)
}

const YourQuotePage: React.FC<PageProps> = props => {
  results = props.location.state || results
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
                <h3>{rnd(results.totalCost)}</h3>
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
                    <h3>{rnd(results.totalCost * 0.6)}</h3>
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
                    <h3>{rnd(results.totalCost * 0.4)}</h3>
                  </span>
                </div>
                <div>
                  <span className="yq-left">
                    <h3>Estimated Years to Payback</h3>
                  </span>
                  <span className="yq-right">
                    <h3 />
                    <h3>{results.yearsToPayback} years</h3>
                  </span>
                </div>
                <div>
                  <span className="yq-left">
                    <h3>System Size</h3>
                  </span>
                  <span className="yq-right">
                    <h3 />
                    <h3>{results.systemSize} kWdc</h3>
                  </span>
                </div>
                <div>
                  <span className="yq-left">
                    <h3>Quantity of Panels</h3>
                  </span>
                  <span className="yq-right">
                    <h3 />
                    <h3>{results.panelQuantity} panels</h3>
                  </span>
                </div>
                <div>
                  <span className="yq-left">
                    <h3>Battery Storage Size</h3>
                  </span>
                  <span className="yq-right">
                    <h3 />
                    <h3>{results.batterySize} kWdc</h3>
                  </span>
                </div>
              </div>
              <div className="yq-subheading hide-mob">
                <h2>Breakdown of Performance</h2>
              </div>
              <table className="hide-mob">
                <tr className="tr-lg">
                  <th>Description</th>
                  <th>Jan</th>
                  <th>Feb</th>
                  <th>Mar</th>
                  <th>Apr</th>
                  <th>May</th>
                  <th>Jun</th>
                  <th>Jul</th>
                  <th>Aug</th>
                  <th>Sep</th>
                  <th>Oct</th>
                  <th>Nov</th>
                  <th>Dec</th>
                  <th>Total</th>
                </tr>
                <tr>
                  <td className="text-left">Grid Usage</td>
                  {results.firstYearUse.demand.map((n: number) => {
                    return <td>{rnd(n)}</td>
                  })}
                  <td>{rnd(sum(results.firstYearUse.demand))}</td>
                </tr>
                <tr>
                  <td className="text-left">Solar Generation</td>
                  {results.firstYearUse.solar.map((n: number) => {
                    return <td>{rnd(n)}</td>
                  })}
                  <td>{rnd(sum(results.firstYearUse.solar))}</td>
                </tr>
                <tr>
                  <td className="text-left">Solar Exported to Grid</td>
                  {results.firstYearUse.exportAfterBattery.map((n: number) => {
                    return <td>{rnd(n)}</td>
                  })}
                  <td>{rnd(sum(results.firstYearUse.exportAfterBattery))}</td>
                </tr>
                <tr>
                  <td className="text-left">Solar Used at Home</td>
                  {results.firstYearUse.selfConsumptionTotal.map(
                    (n: number) => {
                      return <td>{rnd(n)}</td>
                    }
                  )}
                  <td>{rnd(sum(results.firstYearUse.selfConsumptionTotal))}</td>
                </tr>
                <tr>
                  <td className="text-left">Grid Usage with Solar</td>
                  {results.firstYearUse.demandTotal.map((n: number) => {
                    return <td>{rnd(n)}</td>
                  })}
                  <td>{rnd(sum(results.firstYearUse.demandTotal))}</td>
                </tr>
              </table>
              <div className="yq-subheading">
                <h2>Your Predicted System Performance</h2>
              </div>
              <div className="scale-mob">
                <table>
                  <tr className="tr-lg">
                    <th colSpan={3}>
                      The Assumptions we have made are based on...
                    </th>
                    <th>Environmental Impact...</th>
                    <th colSpan={4}> Address and Climate Data</th>
                  </tr>
                  <tr>
                    <th>Predicted System Output</th>
                    <th>Assumed Annual Inflation</th>
                    <th>Assumed On-Site Energy Consumption</th>
                    <th>
                      CO<sub>2</sub> Savings
                    </th>
                    <th>Project Reference</th>
                    <th>Postcode</th>
                    <th>Irradience Zone</th>
                    <th>Roof Pitch</th>
                  </tr>
                  <tr>
                    <td>{rnd(results.annualYield)} kWh/annum</td>
                    <td>3%</td>
                    <td>
                      {rnd(
                        100 *
                          (sum(results.firstYearUse.selfConsumptionTotal) /
                            sum(results.firstYearUse.solar))
                      )}
                      %
                    </td>
                    <td>0.517kg saved per PV kWh</td>
                    <td>{results.projectReference}</td>
                    <td>{results.postcode}</td>
                    <td>{results.irradienceZone}</td>
                    <td>{results.roofPitch}</td>
                  </tr>
                  <tr>
                    <th>Our Proposal Installation Cost</th>
                    <th>Assumed Energy Unit Cost</th>
                    <th>Assumed Annual Energy Inflation</th>
                    <th>CO² Savings Over 20 Years</th>
                    <th colSpan={2}>Address</th>
                    <th>Irradiation Level</th>
                    <th>Degree's From South</th>
                  </tr>
                  <tr>
                    <td>£{rnd(results.totalCost)}</td>
                    <td>£{results.energyUnitCost}</td>
                    <td>4%</td>
                    <td>{rnd(results.co2Savings)} tonnes</td>
                    <td colSpan={2}>{results.address}</td>
                    <td>{results.irradiationLevel}</td>
                    <td>{results.azimuth}&#176;</td>
                  </tr>
                </table>
              </div>
              <div className="yq-subheading hide-mob">
                <h2>Your Predicted System Performance - 20 Year Outlook</h2>
              </div>
              <table className="hide-mob">
                <tr className="tr-lg">
                  <th>Year</th>
                  <th>Estimated Yearly Energy</th>
                  <th>Predicted Unit Cost</th>
                  <th>Predicted Bill Without Solar</th>
                  <th>Estimated Solar Generation</th>
                  <th>Solar Collector Efficiency</th>
                  <th>Solar Energy Used on Site</th>
                  <th>Saving from Solar Energy</th>
                  <th>Predicted Bill With Solar</th>
                  <th>Return on Investment</th>
                  <th>Total Savings</th>
                </tr>
                {results.twentyYearOutlook.map((year, i) => {
                  return (
                    <tr key={`static-tr-${i}`}>
                      <td>{i + 1}</td>
                      <td>{year.demand}kWh</td>
                      <td>{rnd(year.unitCost)}</td>
                      <td>£{rnd(year.billBefore)}</td>
                      <td>{rnd(year.solarGeneration)}kWh</td>
                      <td>{rnd(year.collectorEfficiency * 100)}%</td>
                      <td>{rnd(year.electricityUseFromSolar)}kWh</td>
                      <td>£{rnd(year.savingsFromSolar)}</td>
                      <td>£{rnd(year.billAfter)}</td>
                      <td
                        style={{
                          backgroundColor:
                            year.roi <= 0
                              ? "rgba(255,0,0,0.5)"
                              : "rgba(0,255,0,0.5)",
                        }}
                      >
                        £{rnd(year.roi)}
                      </td>
                      <td>£{rnd(year.totalSaving)}</td>
                    </tr>
                  )
                })}
              </table>
              <div className="yq-subheading">
                <h2>Order Summary</h2>
              </div>
              <table>
                <tr>
                  <th>Quote Reference</th>
                  <td>{results.projectReference}</td>
                </tr>
                <tr className="tr-lg">
                  <th>Item</th>
                  <th>Description</th>
                </tr>
                <tr>
                  <td>1</td>
                  <td>
                    Supply, Installation, Commissioning and Handover of Solar
                    Photovoltaic System ( {results.systemSize} kWdc )
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>
                    Supply, Installation, Commissioning and Handover of Battery
                    Storage System ( {results.batterySize} kWdc )
                  </td>
                </tr>
                <tr className="tr-lg">
                  <th>Item</th>
                  <th>Additional Items</th>
                </tr>
                {results.additionalItems.map((item, i) => {
                  return (
                    <tr>
                      <td>{i + 3}</td>
                      <td>{Object.keys(item)[0]}</td>
                    </tr>
                  )
                })}
                <tr>
                  <td>VAT @ {results.vatRate * 100}%</td>
                  <td>£{rnd(results.vat)}</td>
                </tr>
                <tr className="tr-lg">
                  <th
                    colSpan={2}
                    style={{ textAlign: "center", padding: "10px" }}
                  >
                    Total Price
                  </th>
                </tr>
                <tr>
                  <td
                    colSpan={2}
                    style={{ padding: "15px", fontSize: "1.3em" }}
                  >
                    <em>
                      <span style={{ float: "left" }}>£</span>
                      <span style={{ float: "right" }}>
                        {rnd(results.totalCost)}
                      </span>
                    </em>
                  </td>
                </tr>
                <tr>
                  <th>Address:</th>
                  <td>{results.address}</td>
                </tr>
                <tr>
                  <th>Name:</th>
                  <td>Mr/s. {results.name}</td>
                </tr>
              </table>
            </div>
          </Block>
        </Col12>
      </div>
    </div>
  )
}

export default YourQuotePage
