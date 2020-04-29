import React from "react"
import { BlockCTA } from "../../configurable/BlockCTA"
import { Vector } from "../../configurable/Vector"
import { Col3 } from "../../grid"
import { Heading } from "../../configurable/Heading"

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container">
          <Vector src="logo" />
          <BlockCTA url="/quote" right>
            Get a Quote Today
          </BlockCTA>
        </div>
      </div>
      <div className="footer__middle">
        <div className="container">
          <div className="row">
            <Col3>
              <Heading className="footer__column-heading">GET UK</Heading>
              <div className="footer__item">
                Green Energy Together
                <span>
                  <Vector src="pin" />8 Peerglow Center, Marsh Lane Ware TODO
                </span>
                <span>
                  <Vector src="phone" />
                  +34 020 3995 4422
                </span>
              </div>
            </Col3>
            <Col3>
              <Heading className="footer__column-heading">Services</Heading>
              <a className="footer__item" href="">
                Industrial &amp; Commercial
              </a>
              TODO
              {/* Loop through service pages */}
            </Col3>
            <Col3>
              <Heading className="footer__column-heading">Use Cases</Heading>
              <a className="footer__item" href="">
                All Use Cases
              </a>
              TODO
              {/* Loop through projects */}
            </Col3>
            <Col3>
              <Heading className="footer__column-heading">Company</Heading>
              <a className="footer__item" href="">
                About
              </a>
              TODO
            </Col3>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container">
          <span className="u-font--xsmall u-font--muted right">
            &copy; &bull; Green Energy Together &bull; &copy;
          </span>
        </div>
      </div>
    </footer>
  )
}
