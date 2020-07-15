import React, { FunctionComponent } from "react"

import BlockCTA from "~/components/configurable/BlockCTA"
import Col3 from "~/components/grid/Col3"
import Heading from "~/components/configurable/Heading"

import Logo from "~/vectors/logo.inline.svg"

import { SitemapItem } from "~/hooks/useSitemap"
import { Link } from "gatsby"

import "./styles.scss"
import Icon from "~/components/olc-framework/Icon"

interface FooterProps {
  sitemap: SitemapItem[]
}

const Footer: FunctionComponent<FooterProps> = () => {
  // buildColumn()

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container">
          <BlockCTA className="visible-xs" url="/quote">
            Get a Quote Today
          </BlockCTA>
          <div className="footer__logo">
            <Logo />
          </div>
          <BlockCTA className="hidden-xs" url="/quote" right>
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
                <span>
                  Green Energy Together
                  <span style={{ position: "relative", paddingLeft: "34px" }}>
                    <Icon alias="pin" />
                    8 Peerglow Center,
                    <br />
                    Marsh Lane Ware,
                    <br />
                    Hertfordshire
                    <br />
                    SG12 9QL
                    <br />
                    VAT 292 7158 75
                  </span>
                </span>
                <span>
                  <a
                    href="tel:02039954422"
                    style={{
                      position: "relative",
                      paddingLeft: "34px",
                      display: "block",
                    }}
                  >
                    <Icon alias="phone" />
                    020 3995 4422
                  </a>
                </span>
              </div>
            </Col3>
            <Col3>
              <Heading className="footer__column-heading">Services</Heading>
              <Link
                className="footer__item"
                to="/service/industrial-commercial-solutions"
              >
                Industrial &amp; Commercial
              </Link>
              <Link className="footer__item" to="/">
                Residential Services
              </Link>
              <Link className="footer__item" to="/service/technical-design">
                Technical Design
              </Link>
              <Link
                className="footer__item"
                to="/service/operation-maintenance"
              >
                Operation &amp; Maintenance
              </Link>
              <Link className="footer__item" to="/service/asset-management">
                Asset Management
              </Link>
            </Col3>
            <Col3>
              <Heading className="footer__column-heading">Case studies</Heading>
              <Link className="footer__item" to="/projects">
                All case studies
              </Link>
              <Link className="footer__item" to="/project/paddington-station">
                Paddington
              </Link>
              <Link
                className="footer__item"
                to="/project/kings-college-hospital"
              >
                King's College Hospital
              </Link>
              <Link
                className="footer__item"
                to="/project/smooth-nice-and-fast/"
              >
                Brighton
              </Link>
            </Col3>
            <Col3>
              <Heading className="footer__column-heading">Company</Heading>
              <Link className="footer__item" to="/about-us/">
                About
              </Link>
              <Link className="footer__item" to="/blog/">
                Blog
              </Link>
              <Link className="footer__item" to="/contact-us">
                Contact Us
              </Link>
              <Link className="footer__item" to="/privacy">
                Privacy Policy
              </Link>
              <Link className="footer__item" to="/faq">
                Support and FAQ
              </Link>
            </Col3>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container right">
          <span className="u-font--xsmall u-font--muted">
            &copy; GET - Green Energy Together - 2020
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
