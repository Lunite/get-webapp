import React, { FunctionComponent } from "react"

import BlockCTA from "~/components/configurable/BlockCTA"
import Vector from "~/components/configurable/Vector"
import Col3 from "~/components/grid/Col3"
import Heading from "~/components/configurable/Heading"

import { SitemapItem } from "~/hooks/useSitemap"

interface FooterProps {
  sitemap: SitemapItem[]
}

const Footer: FunctionComponent<FooterProps> = ({ sitemap }) => {
  const buildColumn = (parentSlug: string) => {
    if (!sitemap?.length) {
      return
    }

    const parentItem = sitemap.find(parent => parent.slug === parentSlug)

    if (!parentItem.title || !parentItem.children?.length) {
      // if no title or children, do not show
      return
    }

    const childNodes = []

    parentItem.children.forEach(cItem => {
      childNodes.push(
        <a key={cItem.slug} className="footer__item" href={cItem.path}>
          {cItem.title}
        </a>
      )
    })

    return (
      <Col3>
        <Heading className="footer__column-heading">{parentItem.title}</Heading>
        {childNodes}
      </Col3>
    )
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
            {buildColumn("service")}
            {buildColumn("project")}
            {buildColumn("company")}
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
