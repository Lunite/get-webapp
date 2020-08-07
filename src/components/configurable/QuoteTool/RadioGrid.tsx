import React from "react"
import BlockCTA from "../BlockCTA"
import Col6 from "../../grid/Col6"
import Animate from "~/components/olc-framework/Animate"

const RadioGrid: React.FC<{
  selectedValue: number
  setSelected: (number) => void
}> = props => {
  const handleOptionChange = (e: number) => {
    props.setSelected(e)
  }

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
              value="0"
              checked={props.selectedValue === 0}
              onChange={() => {
                handleOptionChange(0)
              }}
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
              value="18"
              onChange={() => {
                handleOptionChange(18)
              }}
              checked={props.selectedValue === 18}
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
              value="35"
              onChange={() => {
                handleOptionChange(35)
              }}
              checked={props.selectedValue === 35}
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
              value="45"
              checked={props.selectedValue === 45}
              onChange={() => {
                handleOptionChange(45)
              }}
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
