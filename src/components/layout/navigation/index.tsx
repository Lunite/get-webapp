import React, { FunctionComponent, useContext } from "react"
import { Link } from "gatsby"
import { SitemapItem } from "~/hooks/useSitemap"
import BurgerMenu from "~/components/configurable/BurgerMenu"

import Logo from "~/vectors/logo.inline.svg"
import LogoSmall from "~/vectors/logo-small.inline.svg"
import Phone from "~/vectors/phone.inline.svg"

import "./styles.scss"
import "./navigation-item.scss"
import Icon from "~/components/olc-framework/Icon"
import { CustomerTypeContext } from "~/providers/CustomerTypeProvider"

const Navigation: FunctionComponent<any> = ({isSolarTogether}) => {
  const { customerType, setCustomerType } = useContext(CustomerTypeContext)
  console.log(isSolarTogether)
  
  const navItems = (
    <>
      <div className="navigation-item">
        <div className="navigation-item__link" data-title="Services">
          Services
          <Icon className="navigation-item__arrow" alias="fat-arrow" />
        </div>
        <div className="navigation-item__children">
          <Link className="navigation-item__child-link" to="/">
            Residential Services
          </Link>
          <Link
            className="navigation-item__child-link"
            to="/service/industrial-commercial-solutions/"
          >
            Industrial &amp; Commercial Solutions
          </Link>
          <Link
            className="navigation-item__child-link"
            to="/service/technical-design/"
          >
            Technical design
          </Link>
          <Link
            className="navigation-item__child-link"
            to="/service/operation-maintenance/"
          >
            Operation &amp; Maintenance
          </Link>
          <Link
            className="navigation-item__child-link"
            to="/service/asset-management/"
          >
            Asset Management
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
      <div className="navigation-item">
        <div className="navigation-item__link" data-title="Company">
          Company
          <Icon className="navigation-item__arrow" alias="fat-arrow" />
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
          <Link className="navigation-item__child-link" to="/faq">
            Support and FAQs
          </Link>
          <Link className="navigation-item__child-link" to="/blog">
            Blog
          </Link>
        </div>
      </div>
      <div className="navigation-item">
        <div className="navigation-item__link" data-title="Solar Together">
        Solar Together
          <Icon className="navigation-item__arrow" alias="fat-arrow" />
        </div>
        <div className="navigation-item__children">
          <Link
            className="navigation-item__child-link"
            to="/solar-together"
          >
            How does it work?
          </Link>
          <Link  
            className="navigation-item__child-link" 
            to="/solar-together-faq">
            Solar Together FAQs
          </Link>
        </div>
      </div>
      <div className="navigation-item navigation-item--shout">
        <Link className="navigation-item__link" to="/quote">
          Get a Quote
        </Link>
      </div>
    </>
  )

  return (
    <header className="navigation">
      <div className="navigation__top">
        <div className="container">
          <div className="navigation__customer-switcher customer-switcher">
            <Link
              className={`customer-switcher__link${
                customerType === "domestic" ? " link--active" : ""
              }`}
              to="/"
              onClick={() => {
                setCustomerType("domestic")
              }}
            >
              For your Home
            </Link>
            <span className="customer-switcher__link-separator" />
            <Link
              className={`customer-switcher__link${
                customerType === "commercial" ? " link--active" : ""
              }`}
              to="/for-your-business"
              onClick={() => {
                setCustomerType("commercial")
              }}
            >
              For your Business
            </Link>
            <span className="customer-switcher__link-separator" />            
            <Link
              className={`customer-switcher__link${
                customerType === "solartogether" ? " link--active" : ""
              }`}
              to="/solar-together"
              onClick={() => {
                setCustomerType("solartogether")
              }}
            >
              Solar Together
            </Link>
          </div>
          <div className="navigation__contact-details contact-details">
            {/* <Link className="contact-details__link" to="/contact-us">
              <Icon alias="at" />
              Contact us
            </Link> */}
            {isSolarTogether && (
              <div>
                <Link className="contact-details__link" to="/contact-us">
                  <Icon alias="at" />
                  Contact us
                </Link>            
                <a className="contact-details__link" href="tel:02038669896">
                  <Icon alias="phone" />
                  020 3866 9896
                </a>
              </div>
            )}
            {!isSolarTogether && (
              <div>
            <Link className="contact-details__link" to="/contact-us">
              <Icon alias="at" />
              Contact us
            </Link> 


              </div>
            )}  
          </div>
        </div>
      </div>

      {!isSolarTogether && (
        <>
      <div className="navigation__main hidden-xs">
        <div className="container">
          <Link className="logo__anchor" to="/">
            <Logo className="hidden-xs" />
          </Link>
          <div className="navigation__items right">{navItems}</div>
        </div>
      </div>

      <div className="navigation__main visible-xs">
        <div className="container">
          <BurgerMenu className="navigation__burger-menu">
            {navItems}
          </BurgerMenu>
          <Link className="logo__anchor" to="/">
            <LogoSmall />
          </Link>
          <div className="navigation__mobile-contact">
            <a href="tel:02039954422">
              <Phone />
            </a>
          </div>
        </div>
      </div>
      </>)}
    </header>
  )
}

export default Navigation
