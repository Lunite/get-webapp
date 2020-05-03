import React from "react"

import BlockCTA from "~/components/configurable/BlockCTA"
import Vector from "~/components/configurable/Vector"
import Col3 from "~/components/grid/Col3"
import Heading from "~/components/configurable/Heading"

import { useSitemap } from "~/hooks/useSitemap"

const Footer = () => {
  const sitemap = useSitemap()

  const getColumnItems = () => {
    const columns = []

    sitemap.forEach(sItem => {
      if (sItem.title) {
        columns.push(
          <Col3 key={sItem.slug}>
            <Heading className="footer__column-heading">{sItem.title}</Heading>
            {sItem.children?.forEach(childItem => (
              <a className="footer__item" href={childItem.path}>
                {childItem.title}
              </a>
            ))}
          </Col3>
        )
      }
    })

    return columns
  }

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
            {getColumnItems()}
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container">
          <span className="u-font--xsmall u-font--muted right">
            &copy; &bull; Green Energy Together &bull; 2020
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
