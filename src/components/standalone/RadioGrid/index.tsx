import React from "react"
import Col4 from "../../grid/Col4"
import "./styles.scss"
import info from "~/vectors/info.svg"

const RadioGrid: React.FC<{
  selectedValue: number
  setSelected: (number) => void
}> = props => {
  const handleOptionChange = (e: number) => {
    props.setSelected(e)
  }

  return (
    <>
      <div className="row lower-margin">
        <Col4>
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
          <div className="input-label-text">(0&#176;)</div>
        </Col4>
        <Col4 className="hide-mob" />
        <Col4>
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
          <div className="input-label-text">(1&#176; to 15&#176;)</div>
        </Col4>
      </div>
      <div className="row lower-margin">
        <Col4 className="hide-mob" />
        <Col4>
          <input
            required
            className="hidden radio-label"
            type="radio"
            name="inclination"
            id="incl-avrg"
            value="35"
            onChange={() => {
              handleOptionChange(35)
            }}
            checked={props.selectedValue === 35}
          />
          <label className="button-label" htmlFor="incl-avrg">
            <img className="label-image" src="/images/med-slope.png" />
            <div className="arrowmap-tip">
              <img src={info} alt="Hint:" />
              <p className="help-text">Most British homes have this slope</p>
            </div>
          </label>
          <div className="input-label-text">(30&#176; to 40&#176;)</div>
        </Col4>
        <Col4 />
      </div>
      <div className="row lower-margin">
        <Col4>
          <input
            required
            className="hidden radio-label"
            type="radio"
            name="inclination"
            id="incl-med"
            value="20"
            onChange={() => {
              handleOptionChange(20)
            }}
            checked={props.selectedValue === 20}
          />
          <label className="button-label" htmlFor="incl-med">
            <img className="label-image" src="/images/med-slope.png" />
          </label>
          <div className="input-label-text">(15&#176; to 20&#176;)</div>
        </Col4>
        <Col4 className="hide-mob" />
        <Col4>
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
          <div className="input-label-text">(40&#176;+)</div>
        </Col4>
      </div>
    </>
  )
}

export default RadioGrid
