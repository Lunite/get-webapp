import React, { FunctionComponent } from "react"
import { Vector } from "../../configurable/Vector"

export const Navigation: FunctionComponent = () => {
  return (
    <header className="navigation">
      <div className="navigation__top">
        <div className="container">
          <div className="navigation__customer-switcher customer-switcher">
            <a className="customer-switcher__link">For your Home</a>
            <a className="customer-switcher__link">For your Business</a>
          </div>
          <div className="navigation__contact-details right">
            <a href="/contact">
              <Vector src="at" />
              Contact us
            </a>
            <a href="tel:02039954422">
              <Vector src="phone" />
              020 3995 4422
            </a>
          </div>
        </div>
      </div>
      <div className="navigation__main">
        <div className="container">
          <Vector src="logo" />
          <div className="navigation__items right">
            <div className="navigation-item navigation-item--has-children">
              <a className="navigation-item__link">Services</a>
              <div className="navigation-item__children">
                <a className="navigation-item__link">
                  Industrial &amp; Commercial
                </a>
                TODO
                {/** Loop through children of nav item */}
              </div>
            </div>
            TODO
            {/** Loop through nav items */}
          </div>
        </div>
      </div>
    </header>
  )
}
