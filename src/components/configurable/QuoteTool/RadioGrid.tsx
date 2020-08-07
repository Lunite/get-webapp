import React from "react"
import BlockCTA from "../BlockCTA"
import Col6 from "../../grid/Col6"
import Animate from "~/components/olc-framework/Animate"

const RadioGrid: React.FC<{}> = () => {
  return (
    <>
      <Animate
        properties={["opacity", "transform"]}
        startValues={["0", "translateY(40px) rotate(0.5deg)"]}
        endValues={["1", "translateY(0) rotate(0deg)"]}
      >
        <div className="row">
          <Col6>
            <input
              required
              className="hidden radio-label"
              type="radio"
              name="inclination"
              id="incl-flat"
            />
            <label className="button-label" htmlFor="incl-flat">
              Flat Roof
            </label>
          </Col6>
          <Col6>
            <input
              required
              className="hidden radio-label"
              type="radio"
              name="inclination"
              id="incl-low"
            />
            <label className="button-label" htmlFor="incl-low">
              Low Slope
            </label>
          </Col6>
        </div>
      </Animate>
      <Animate
        properties={["opacity", "transform"]}
        startValues={["0", "translateY(40px) rotate(0.5deg)"]}
        endValues={["1", "translateY(0) rotate(0deg)"]}
      >
        <div className="row">
          <Col6>
            <input
              required
              className="hidden radio-label"
              type="radio"
              name="inclination"
              id="incl-med"
            />
            <label className="button-label" htmlFor="incl-med">
              Medium Slope
            </label>
          </Col6>
          <Col6>
            <input
              required
              className="hidden radio-label"
              type="radio"
              name="inclination"
              id="incl-high"
            />
            <label className="button-label" htmlFor="incl-high">
              High Slope
            </label>
          </Col6>
        </div>
      </Animate>
      <div className="form__actions">
        <BlockCTA large submit className="fl-r">
          Next
        </BlockCTA>
      </div>
    </>
  )
}

export default RadioGrid
