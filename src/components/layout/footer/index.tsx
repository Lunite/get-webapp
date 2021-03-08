import React, { useContext } from "react"

import BlockCTA from "~/components/configurable/BlockCTA"
import Col3 from "~/components/grid/Col3"
import Heading from "~/components/configurable/Heading"

import Logo from "~/vectors/logo.inline.svg"

import { SitemapItem } from "~/hooks/useSitemap"
import { Link } from "gatsby"

import "./styles.scss"
import Icon from "~/components/olc-framework/Icon"

import { CustomerTypeContext } from "~/providers/CustomerTypeProvider"

interface FooterProps {
  sitemap: SitemapItem[];
  isSolarTogether: any; 
}

const Footer: React.FC = () => {
   const { customerType } = useContext(CustomerTypeContext);

   const isSolarTogether = React.useMemo(() => customerType === "solartogether", [customerType]);

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
                  
                  <span style={{ position: "relative", paddingLeft: "34px" }}>
                    <Icon alias="pin" />
                    8 Peerglow Center,
                    <br />
                    Marsh Lane Ware,
                    <br />
                    Herts. SG12 9QL
                    <br />
                    VAT 292 7158 75
                  </span>
                </span>
                <span>
                  {isSolarTogether && (
                    <a
                      href="tel:02038669896"
                      style={{
                        position: "relative",
                        paddingLeft: "34px",
                        display: "block",
                      }}
                    >
                      <Icon alias="phone" />
                      020 3866 9896
                    </a>
                  )}
                  {!isSolarTogether && (
                    <div>
                      <a
                        href="tel:02039954422"
                        style={{
                          position: "relative",
                          paddingLeft: "34px",
                          display: "block",
                        }}
                      >
                        <Icon alias="phone" />
                        UK - 020 3995 4422
                      </a>                    
                      <a
                        href="tel:02038669896"
                        style={{
                          position: "relative",
                          paddingLeft: "34px",
                          display: "block",
                        }}
                      >
                        <Icon alias="phone" />
                        Devon - 020 3866 9896
                      </a>
                    </div>
                  )}
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
              <Heading className="footer__column-heading">Get in touch</Heading>

              <div className="footer__item">        
              <a href="https://www.facebook.com/greenenergytogether">Facebook</a>
              </div>
              <div className="footer__item">
              <a href="https://www.instagram.com/green.energy.together">Instagram</a>
              </div>
              <div className="footer__item">
              <a href="https://twitter.com/get_uk_solar">Twitter</a>
              </div >
              <div className="footer__item">
                <a href="https://www.linkedin.com/company/get-uk">LinkedIn</a>
              </div>
              <Link className="footer__item" to="/contact-us">
                Contact Us
              </Link>

            </Col3>
              

            <Col3>
              <Heading className="footer__column-heading">Company</Heading>
              <Link className="footer__item" to="/about-us/">
                About Us
              </Link>
              <Link className="footer__item" to="/privacy">
                Privacy Policy
              </Link>
              <Link className="footer__item" to="/products-warranties">
                Products &amp; Warranties
              </Link>
              <Link className="footer__item" to="/solar-together">
                Solar Together
              </Link>
              <Link className="footer__item" to="/covid-19">
              COVID-19 Plan
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
