import React from "react"
import Col6 from "../../grid/Col6"
import "./styles.scss"
import flat from "~/images/flat-roof.png"

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
            <img className="label-image" src="/images/flat.png" />
          </label>
          <div className="input-label-text">
            Flat Roof (0&#176; to 10&#176;)
          </div>
        </Col6>
        <Col6>
          <input
            required
            className="hidden radio-label"
            type="radio"
            name="inclination"
            id="incl-low"
            value="15"
            onChange={() => {
              handleOptionChange(15)
            }}
            checked={props.selectedValue === 15}
          />
          <label className="button-label" htmlFor="incl-low">
            <img className="label-image" src="/images/low-slope.png" />
          </label>
          <div className="input-label-text">
            Low Slope (10&#176; to 25&#176;)
          </div>
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
            value="30"
            onChange={() => {
              handleOptionChange(30)
            }}
            checked={props.selectedValue === 30}
          />
          <label className="button-label" htmlFor="incl-med">
            <img className="label-image" src="/images/med-slope.png" />
          </label>
          <div className="input-label-text">
            Medium Slope (25&#176; to 35&#176;)
          </div>
        </Col6>
        <Col6>
          <input
            required
            className="hidden radio-label"
            type="radio"
            name="inclination"
            id="incl-high"
            value="40"
            checked={props.selectedValue === 40}
            onChange={() => {
              handleOptionChange(40)
            }}
          />
          <label className="button-label" htmlFor="incl-high">
            <img className="label-image" src="/images/high-slope.png" />
          </label>
          <div className="input-label-text">
            High Slope (more than 35&#176;)
          </div>
        </Col6>
      </div>
    </>
  )
}

export default RadioGrid
