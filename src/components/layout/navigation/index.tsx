import React, { FunctionComponent } from "react"
import { Link } from "gatsby"
import { SitemapItem } from "~/hooks/useSitemap"
import BurgerMenu from "~/components/configurable/BurgerMenu"

import Logo from "~/vectors/logo.inline.svg"
import LogoSmall from "~/vectors/logo-small.inline.svg"
import Phone from "~/vectors/phone.inline.svg"

import "./styles.scss"
import "./navigation-item.scss"
import { useCustomerType } from "~/hooks/useCustomerType"
import Icon from "~/components/olc-framework/Icon"

interface NavItemProps {
  slug: string
  path?: string
  sitemap: any[]
}

const NavItem: FunctionComponent<NavItemProps> = ({ slug, path, sitemap }) => {
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
            <Icon className="navigation-item__arrow" alias="arrow-down" />
          )}
        </Link>
      ) : (
        <div className="navigation-item__link" data-title={item.title}>
          {item.title}
          {item.children?.length && (
            <Icon className="navigation-item__arrow" alias="arrow-down" />
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

const Navigation: FunctionComponent<NavigationProps> = ({ sitemap }) => {
  const { customerType, changeCustomerType } = useCustomerType()

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
                changeCustomerType("domestic")
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
                changeCustomerType("commercial")
              }}
            >
              For your Business
            </Link>
          </div>
          <div className="navigation__contact-details contact-details">
            <Link className="contact-details__link" to="/contact-us">
              <Icon alias="at" />
              Contact us
            </Link>
            <a className="contact-details__link" href="tel:02039954422">
              <Icon alias="phone" />
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
          <div className="navigation__items right">
            {/* <NavItem slug="service" /> */}
            <div className="navigation-item">
              <Link
                data-title="Case Studies"
                className="navigation-item__link"
                to="/projects"
              >
                Case Studies
              </Link>
            </div>
            <NavItem sitemap={sitemap} slug="company" />
            {/* <div className="navigation-item navigation-item--coming-soon">
              <div className="navigation-item__link">
                Blog
                <span>coming soon</span>
              </div>
            </div> */}
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
            <div className="navigation-item">
              <Link
                data-title="Case Studies"
                className="navigation-item__link"
                to="/projects"
              >
                Case Studies
              </Link>
            </div>
            <NavItem sitemap={sitemap} slug="company" />
            {/* <div className="navigation-item navigation-item--coming-soon">
              <div className="navigation-item__link">
                Blog
                <span>coming soon</span>
              </div>
            </div> */}
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
