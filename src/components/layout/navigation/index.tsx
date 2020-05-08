import React, { FunctionComponent } from "react"
import Vector from "~/components/configurable/Vector"
import { SitemapItem, useSitemap } from "~/hooks/useSitemap"

import "./styles.scss"
import "./navigation-item.scss"

interface NavItemProps {
  slug: string
}

const NavItem: FunctionComponent<NavItemProps> = ({ slug }) => {
  const sitemap = useSitemap()

  const item = sitemap.find(sItem => sItem.slug === slug)

  if (!item) {
    return null
  }

  return (
    <div className="navigation-item navigation-item--has-children">
      <a className="navigation-item__link" href={item.path}>
        {item.title}
      </a>
      {item.children?.length && (
        <div className="navigation-item__children">
          {item.children?.map(child => (
            <a
              key={child.slug}
              className="navigation-item__link"
              href={child.path}
            >
              {child.title}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

interface NavigationProps {
  sitemap: SitemapItem[]
}

const Navigation: FunctionComponent<NavigationProps> = ({ sitemap }) => {
  const switchCustomerType = () => {}

  return (
    <header className="navigation">
      <div className="navigation__top">
        <div className="container">
          <div className="navigation__customer-switcher customer-switcher">
            <a
              className="customer-switcher__link link--active"
              onClick={switchCustomerType}
            >
              For your Home
            </a>
            <a className="customer-switcher__link" onClick={switchCustomerType}>
              For your Business
            </a>
          </div>
          <div className="navigation__contact-details right">
            <a href="/contact-us">
              <Vector src="at-icon" />
              Contact us
            </a>
            <a href="tel:02039954422">
              <Vector src="phone" />
              020 3995 4422
            </a>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="navigation__main">
          <Vector className="navigation__logo logo" src="logo" />
          <div className="navigation__items right">
            <NavItem slug="service" />
            <NavItem slug="project" />
            <NavItem slug="company" />
            <div className="navigation-item">
              <a className="navigation-item__link" href="/blog">
                Blog
              </a>
            </div>
            <div className="navigation-item navigation-item--shout">
              <a className="navigation-item__link" href="/quote">
                Get a Quote
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navigation
