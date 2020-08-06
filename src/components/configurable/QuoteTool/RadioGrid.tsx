import React from "react"
import Col9 from "../../grid/Col9"
import BlockCTA from "../BlockCTA"
import Col6 from "../../grid/Col6"

const RadioGrid: React.FC<{}> = () => {
  return (
    <>
      <div className="row">
        <Col6>
          <input
            required
            className="radio-input"
            type="radio"
            name="inclination"
            id="incl-flat"
          />
          <label className="radio-label" htmlFor="incl-flat">
            Flat Roof
          </label>
        </Col6>
        <Col6>
          <input
            required
            className="radio-input"
            type="radio"
            name="inclination"
            id="incl-low"
          />
          <label className="radio-label" htmlFor="incl-low">
            Low Slope
          </label>
        </Col6>
      </div>
      <div className="row">
        <Col6>
          <input
            required
            className="radio-input"
            type="radio"
            name="inclination"
            id="incl-med"
          />
          <label className="radio-label" htmlFor="incl-med">
            Medium Slope
          </label>
        </Col6>
        <Col6>
          <input
            required
            className="radio-input"
            type="radio"
            name="inclination"
            id="incl-high"
          />
          <label className="radio-label" htmlFor="incl-high">
            High Slope
          </label>
        </Col6>
      </div>
      <div className="form__actions">
        <BlockCTA large submit className="fl-r">
          Next
        </BlockCTA>
      </div>
    </>
  )
}

export default RadioGrid
