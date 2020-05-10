import React, { FunctionComponent } from "react"
import { Link } from "gatsby"
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
      <Link className="navigation-item__link" to={item.path}>
        {item.title}
      </Link>
      {item.children?.length && (
        <div className="navigation-item__children">
          {item.children?.map(child => (
            <Link
              key={child.slug}
              className="navigation-item__link"
              to={child.path}
            >
              {child.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

interface NavigationProps {
  sitemap: SitemapItem[]
}

const Navigation: FunctionComponent<NavigationProps> = () => {
  return (
    <header className="navigation">
      <div className="navigation__top">
        <div className="container">
          <div className="navigation__customer-switcher customer-switcher">
            <Link className="customer-switcher__link" to="/">
              For your Home
            </Link>
            <Link className="customer-switcher__link" to="/homepage-b2b">
              For your Business
            </Link>
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
              <Link className="navigation-item__link" to="/blog">
                Blog
              </Link>
            </div>
            <div className="navigation-item navigation-item--shout">
              <Link className="navigation-item__link" to="/quote">
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navigation
