import React, { useContext } from "react"
import { Link } from "gatsby"
import { SitemapItem } from "~/hooks/useSitemap"
import BurgerMenu from "~/components/configurable/BurgerMenu"

import Logo from "~/vectors/logo.inline.svg"
import LogoColor from "~/vectors/logo-color.inline.svg"
import LogoSmall from "~/vectors/logo-small.inline.svg"
import Phone from "~/vectors/phone.inline.svg"

import "./styles.scss"
import "./navigation-item.scss"
import Icon from "~/components/olc-framework/Icon"
import { CustomerTypeContext } from "~/providers/CustomerTypeProvider"

//@TODO: split the navigation bars into different components
const Navigation: React.FC = () => {
  const { customerType, setCustomerType } = useContext(CustomerTypeContext);

  console.log('Navigation:customerType', customerType);

  const isBusiness = React.useMemo(() => customerType === "commercial", [customerType]);
  const isDomestic = React.useMemo(() => customerType === "domestic", [customerType]);
  const isSolarTogether = React.useMemo(() => customerType === "solartogether", [customerType]);

  console.log('isBusiness', isBusiness);
  console.log('isDomestic', isDomestic);
  console.log('isSolarTogether', isSolarTogether);
  
  const customerStyle = React.useMemo(() => {
    const style: any = {};
    if (isBusiness) {
      style.backgroundColor =  '#3c96c5';
    } else if (isSolarTogether) {
      style.backgroundColor =  'white';
      style.color = '#051c3f';
    }
    return style;
  }, [isBusiness, isSolarTogether]);

  const businessButtonStyle = React.useMemo(() => {
    const style: any = {};
    if (isBusiness) {
      style.backgroundColor =  '#051c3f';
    }
    return style;
  }, [isBusiness]); 

  const topNavigationStyle = React.useMemo(() => {
    const style: any = {};
    if (isBusiness || isSolarTogether) {
      style.backgroundColor =  '#051c3f';
      style.color = "white";
    } 
    return style;
  }, [isBusiness, isSolarTogether]);

  const contactDetails = React.useMemo(() => {
    return (
      <div className="navigation__contact-details contact-details">
                  <Link className="contact-details__link" to="/contact-us">
                    <Icon alias="at" style={isBusiness ? {color: '#3c96c5'} : {}} />
                    Contact us
                  </Link>            
                  <a className="contact-details__link" href="tel:02038669896" style={{
                    display: isSolarTogether ? 'initial' : 'none'
                  }}>
                    <Icon alias="phone" />
                    020 3866 9896
                  </a>
                </div>
    )
  }, [isSolarTogether, isBusiness]);



  const navItems = (
    <>
    {/*Start DESKTOP menu*/}

    {/*Start Domestic menu*/}
    {isDomestic && (
    <>
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
        <Link
          data-title="Products & Warranties"
          className="navigation-item__link"
          to="/products-warranties"
        >
          Products &amp; Warranties
        </Link>
      </div> 

      <div className="navigation-item">
        <div className="navigation-item__link" data-title="Company">
          Company
          <Icon className="navigation-item__arrow" alias="fat-arrow" />
        </div>
        <div className="navigation-item__children">
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
      <div className="navigation-item navigation-item--shout" style= {businessButtonStyle}>
        <Link className="navigation-item__link" to="/quote">
          Get a Quote
        </Link>
      </div>
    </>
    )}
    {/* End Domestic menu */}

    {/*Start Commercial menu*/}
    {isBusiness && (
    <>
      <div className="navigation-item">
        <div className="navigation-item__link business__link" data-title="Services">
          Services
          <Icon className="navigation-item__arrow" alias="fat-arrow" />
        </div>
        <div className="navigation-item__children">
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
          className="navigation-item__link business__link"
          to="/projects"
        >
          Case Studies
        </Link>
      </div> 
      {/* <div className="navigation-item">
        <Link
          data-title="Products"
          className="navigation-item__link business__link"
          to="/commercial-products"
        >
          Products
        </Link>
      </div> 
      <div className="navigation-item">
        <Link
          data-title="Warranties"
          className="navigation-item__link business__link"
          to="/commercial-warranties"
        >
          Warranties
        </Link>
      </div>  */}
      <div className="navigation-item">
        <div className="navigation-item__link business__link" data-title="Company">
          Company
          <Icon className="navigation-item__arrow" alias="fat-arrow" />
        </div>
        <div className="navigation-item__children">
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
      <div className="navigation-item navigation-item--shout" style= {businessButtonStyle}>
        <Link className="navigation-item__link" to="/quote">
          Get a Quote
        </Link>
      </div>
    </>
    )}
    {/*End Commercial menu*/}

    {/*Start Solar Together menu */}
    {isSolarTogether && (
    <>    
      <div className="navigation-item">
        <Link
          data-title="How does it work?"
          className="navigation-item__link solartogether__link"
          to="/solar-together"
        >
          How does it work?
        </Link>
      </div> 
      <div className="navigation-item">
        <Link
          data-title="Solar Together FAQs"
          className="navigation-item__link solartogether__link"
          to="/solar-together-faq"
        >
          Solar Together FAQs
        </Link>
      </div> 
      <div className="navigation-item">
        <Link
          data-title="About Us"
          className="navigation-item__link solartogether__link"
          to="/about-us"
        >
          About Us
        </Link>
      </div> 
      <div className="navigation-item navigation-item--shout" style= {businessButtonStyle}>
        <Link className="navigation-item__link" to="/quote">
          Get a Quote
        </Link>
      </div>
    </>
    )}
    {/*End Solar Together menu*/}

    {/* End DESKTOP menu */}
    
    </>
  )

  return (
    <header className="navigation" >
      <div className="navigation__top">
        <div className="container" >
          
            <div className="navigation__customer-switcher customer-switcher" >
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
              <span className="customer-switcher__link-separator" style = {topNavigationStyle}/>
              <Link
                className={`customer-switcher__link${
                  customerType === "commercial" ? " link--activeblue" : ""
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
            {contactDetails}
        </div>
      </div>

      
      <>
        
        {/* Logo desktop */}
        
          <div className="navigation__main hidden-xs" style={customerStyle}>
            <div className="container">
              <Link className="logo__anchor" to="/">
                {
                  isSolarTogether ? 
                    <LogoColor className="hidden-xs" />
                  :
                    <Logo className="hidden-xs" />
                }
              </Link>
              <div className="navigation__items right">{navItems}</div>
            </div>
          </div>

        {/* End logo desktop         */}

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
      </>
      
    </header>
  )
}

export default Navigation
