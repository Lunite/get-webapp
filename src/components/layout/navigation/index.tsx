import React, { FunctionComponent, Fragment } from "react"
import { Link } from "gatsby"
import Vector from "~/components/configurable/Vector"
import { SitemapItem, useSitemap } from "~/hooks/useSitemap"
import BurgerMenu from "~/components/configurable/BurgerMenu"

import Logo from "~/vectors/logo.inline.svg"
import LogoSmall from "~/vectors/logo-small.inline.svg"
import Phone from "~/vectors/phone.inline.svg"

import "./styles.scss"
import "./navigation-item.scss"
import { useCustomerType } from "~/hooks/useCustomerType"

interface NavItemProps {
  slug: string
  path?: string
}

const NavItem: FunctionComponent<NavItemProps> = ({ slug, path }) => {
  const sitemap = useSitemap()

  const item = sitemap.find(sItem => sItem.slug === slug)

  if (!item) {
    return null
  }

  item.path = path || item.path

  item.path = item.path === "/projects" ? "" : item.path

  return (
    <div
      className={`navigation-item ${
        item.children?.length ? "navigation-item--has-children" : ""
      }`}
    >
      {item.path ? (
        <Link
          className="navigation-item__link"
          to={item.path}
          data-title={item.title}
        >
          {item.title}
          {item.children?.length && (
            <Vector className="navigation-item__arrow" src="arrow-down-icon" />
          )}
        </Link>
      ) : (
        <div className="navigation-item__link" data-title={item.title}>
          {item.title}
          {item.children?.length && (
            <Vector className="navigation-item__arrow" src="arrow-down-icon" />
          )}
        </div>
      )}
      {item.children?.length && (
        <div className="navigation-item__children">
          {item.children.map(child => {
            if (child.slug === "404") {
              return null
            }

            return (
              <Link
                key={child.slug}
                className="navigation-item__child-link"
                to={child.path}
                dangerouslySetInnerHTML={{ __html: child.title }}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

interface NavigationProps {
  sitemap: SitemapItem[]
}

const Navigation: FunctionComponent<NavigationProps> = () => {
  const { type, changeCustomerType } = useCustomerType()

  return (
    <header className="navigation">
      <div className="navigation__top">
        <div className="container">
          <div className="navigation__customer-switcher customer-switcher">
            <Link
              className={`customer-switcher__link${
                type === "residential" ? " link--active" : ""
              }`}
              to="/"
              onClick={() => {
                changeCustomerType("residential")
              }}
            >
              For your Home
            </Link>
            <span className="customer-switcher__link-separator" />
            <Link
              className={`customer-switcher__link${
                type === "commercial" ? " link--active" : ""
              }`}
              to="/for-your-business"
              onClick={() => {
                changeCustomerType("commercial")
              }}
            >
              For your Business
            </Link>
          </div>
          <div className="navigation__contact-details contact-details">
            <Link className="contact-details__link" to="/contact-us">
              <Vector src="at-icon" />
              Contact us
            </Link>
            <a className="contact-details__link" href="tel:02039954422">
              <Vector src="phone" />
              020 3995 4422
            </a>
          </div>
        </div>
      </div>

      <div className="navigation__main hidden-xs">
        <div className="container">
          <Link className="logo__anchor" to="/">
            <Logo className="hidden-xs" />
          </Link>
          {/* <Vector className="navigation__logo logo" src="logo" /> */}
          <div className="navigation__items right">
            {/* <NavItem slug="service" /> */}
            <NavItem slug="project" path="/projects" />
            <NavItem slug="company" />
            <div className="navigation-item navigation-item--coming-soon">
              <div className="navigation-item__link">
                Blog
                <span>coming soon</span>
              </div>
            </div>
            <div className="navigation-item navigation-item--shout">
              <Link className="navigation-item__link" to="/quote">
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="navigation__main visible-xs">
        <div className="container">
          <BurgerMenu className="navigation__burger-menu">
            {/* <NavItem slug="service" /> */}
            <NavItem slug="project" />
            <NavItem slug="company" />
            <div className="navigation-item navigation-item--coming-soon">
              <div className="navigation-item__link">
                Blog
                <span>coming soon</span>
              </div>
            </div>
            <div className="navigation-item navigation-item--shout">
              <Link className="navigation-item__link" to="/quote">
                Get a Quote
              </Link>
            </div>
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
    </header>
  )
}

export default Navigation
