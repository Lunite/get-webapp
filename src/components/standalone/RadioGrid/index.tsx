import React from "react"
import Col6 from "../../grid/Col6"
import "./styles.scss"

const RadioGrid: React.FC<{
  selectedValue: number
  setSelected: (number) => void
}> = props => {
  const handleOptionChange = (e: number) => {
    props.setSelected(e)
  }

  return (
    <>
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
              handleOptionChange(15)
            }}
            checked={props.selectedValue === 15}
          />
          <label className="button-label" htmlFor="incl-low">
            Low Slope
          </label>
        </Col6>
      </div>
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
              handleOptionChange(30)
            }}
            checked={props.selectedValue === 30}
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
            checked={props.selectedValue === 40}
            onChange={() => {
              handleOptionChange(40)
            }}
          />
          <label className="button-label" htmlFor="incl-high">
            High Slope
          </label>
        </Col6>
      </div>
    </>
  )
}

export default RadioGrid
