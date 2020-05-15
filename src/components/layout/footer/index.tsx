import React, { FunctionComponent } from "react"

import BlockCTA from "~/components/configurable/BlockCTA"
import Vector from "~/components/configurable/Vector"
import Col4 from "~/components/grid/Col4"
import Heading from "~/components/configurable/Heading"

import Logo from "~/vectors/logo.inline.svg"

import { SitemapItem } from "~/hooks/useSitemap"
import { Link } from "gatsby"

import "./styles.scss"

interface FooterProps {
  sitemap: SitemapItem[]
}

const Footer: FunctionComponent<FooterProps> = ({ sitemap }) => {
  const buildColumn = (parentSlug: string) => {
    if (!sitemap?.length) {
      return
    }

    const parentItem = sitemap.find(parent => parent.slug === parentSlug)

    if (!parentItem?.title || !parentItem?.children?.length) {
      // if no title or children, do not show
      return
    }

    return (
      <Col4>
        <Heading className="footer__column-heading">{parentItem.title}</Heading>
        {parentItem.children.map(cItem => {
          if (cItem.slug === "404") {
            return null
          }

          return (
            <Link key={cItem.slug} className="footer__item" to={cItem.path}>
              {cItem.title}
            </Link>
          )
        })}
      </Col4>
    )
  }

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container">
          <BlockCTA className="visible-xs" url="/quote">
            Get a Quote Today
          </BlockCTA>
          <div className="footer__logo">
            <Logo />
            {/* <Vector src="logo" /> */}
          </div>
          <BlockCTA className="hidden-xs" url="/quote" right>
            Get a Quote Today
          </BlockCTA>
        </div>
      </div>
      <div className="footer__middle">
        <div className="container">
          <div className="row">
            <Col4>
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
            </Col4>
            {buildColumn("service")}
            {buildColumn("project")}
            {buildColumn("company")}
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container right">
          <span className="u-font--xsmall u-font--muted">
            &copy;GET - Green Energy Together - 2020
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
