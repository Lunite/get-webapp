import React, { FunctionComponent, useState, useEffect } from "react"
import { globalHistory } from "@reach/router"

import "./styles.scss"

import Burger from "~/vectors/burger.inline.svg"
import Close from "~/vectors/close.inline.svg"
import { Link } from "gatsby"

interface BurgerMenuProps {
  className?: string
}

const BurgerMenu: FunctionComponent<BurgerMenuProps> = ({
  className,
  children,
}) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    return globalHistory.listen(({ action }) => {
      if (action === "PUSH") {
        setOpen(false)
      }
    })
  }, [])

  const toggleOpen = () => {
    setOpen(!open)
  }

  return (
    <div
      className={`burger-menu ${className} ${open ? "burger-menu--open" : ""}`}
    >
      <div className="burger-menu__toggle" onClick={toggleOpen}>
        {open && <Close />}
        {!open && <Burger />}
      </div>
      <div className="burger-menu__items">
        <div className="navigation-item navigation-item--has-children">
          <div className="navigation-item__link" data-title="Services">
            Services
            <span className="icon icon-fat-arrow navigation-item__arrow"></span>
          </div>
          <div className="navigation-item__children">
            <Link
              className="navigation-item__child-link"
              to="/service/asset-management/"
            >
              Asset Management
            </Link>
            <Link
              className="navigation-item__child-link"
              to="/service/industrial-commercial-solutions/"
            >
              Industrial &amp; Commercial Solutions
            </Link>
            <Link
              className="navigation-item__child-link"
              to="/service/operation-maintenance/"
            >
              Operation &amp; Maintenance
            </Link>
            <Link
              className="navigation-item__child-link"
              to="/service/technical-design/"
            >
              Technical design
            </Link>
          </div>
        </div>
        <div className="navigation-item">
          <Link
            data-title="Case Studies"
            className="navigation-item__link"
            to="/projects"
          >
            Case Studies
          </Link>
        </div>
        <div className="navigation-item navigation-item--has-children">
          <div className="navigation-item__link" data-title="Company">
            Company
            <span className="icon icon-fat-arrow navigation-item__arrow"></span>
          </div>
          <div className="navigation-item__children">
            <Link
              className="navigation-item__child-link"
              to="/products-warranties"
            >
              Products &amp; Warranties
            </Link>
            <Link className="navigation-item__child-link" to="/about-us/">
              About Us
            </Link>
            <Link
              aria-current="page"
              className="navigation-item__child-link"
              to="/faq"
            >
              Support and FAQ
            </Link>
            <Link className="navigation-item__child-link" to="/blog">
              Blog
            </Link>
            <Link className="navigation-item__child-link" to="/contact-us">
              Contact Us
            </Link>
          </div>
        </div>
        <div className="navigation-item navigation-item--has-children">
          <div className="navigation-item__link" data-title="Solar Together">
            Solar Together
            <span className="icon icon-fat-arrow navigation-item__arrow"></span>
          </div>
          <div className="navigation-item__children">
            <Link className="navigation-item__child-link" to="/solar-together">
              How does it work
            </Link>
            <Link className="navigation-item__child-link" to="/solar-together-faq">
              Solar Together FAQs
            </Link>
          </div>
        </div>
        <div className="navigation-item navigation-item--shout">
          <Link className="navigation-item__link" to="/quote">
            Get a Quote
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BurgerMenu
