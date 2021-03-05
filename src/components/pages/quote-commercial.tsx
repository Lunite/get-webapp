import React, { useContext } from "react"
import Hero from "~/components/configurable/Hero"
import FormInput from "~/components/olc-framework/FormInput"
import Block from "~/components/configurable/Block"
import Heading from "~/components/configurable/Heading"
import FormSelect from "~/components/olc-framework/FormSelect"
import BlockCTA from "~/components/configurable/BlockCTA"
import FormCheckbox from "../olc-framework/FormCheckbox"
import Col6 from "~/components/grid/Col6"
import Image from "../configurable/Image"
import { window } from 'global';

import { trackCustomEvent } from "gatsby-plugin-google-analytics"
import { CustomerTypeContext } from "~/providers/CustomerTypeProvider"

export const SPECIAL_PRICE_KEY = 'utm_campaign';
export const SPECIAL_PRICE_VALUE = 'special_price';

const googleCampaignQueryKeys = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
];




const QuotePageCommercial = ({ location }) => {

    //this makes it so the customer type is set always as what it needs to be on that page

    const { customerType, setCustomerType } = useContext(CustomerTypeContext);

    const isBusiness = React.useMemo(() => customerType === "commercial", [customerType]);
    const isDomestic = React.useMemo(() => customerType === "domestic", [customerType]);
    const isSolarTogether = React.useMemo(() => customerType === "solartogether", [customerType]);
    
      React.useEffect(() => {
        setCustomerType('commercial');
      }, []);
  
  //END this makes it so the customer type is set always as what it needs to be on that page

  const { state = {} } = location;

  const urlParams = new URLSearchParams(location.search); 

  let specialValue = urlParams.get(SPECIAL_PRICE_KEY) === SPECIAL_PRICE_VALUE ? 'Yes' : 'No';

  const isSpecial = state?.isSpecialPrice == 'Yes' ? 'Yes' : specialValue;

  console.log('isSpecial', isSpecial)

  const [form, setForm] = React.useState<Record<string, string>>({
    'full-name': state?.name,
    'email': state?.email,
    'phone-number': state?.phone,
    'isSpecialPrice': isSpecial,
  });

  const setFormValue = (key, value) => {
    setForm({
      ...form,
      [key]: value
    });
  }

  return (
    <div className="quote-page">
      <Hero imageUrl="/images/quote-banner.jpg" compact>
        <Heading level={1} underlined>
          Business Quote
        </Heading>
      </Hero>
      <Block>
        <div className="container u-layout--indent container--column">
          <p className="u-font--body-large">
          Is solar right for you? How much could you save? We’re here to help you get answers to all your questions about solar. <br/>No pressure, no sales pitch – just honest advice.

Your free quote will include: a roof assessment, customized system design, system yield, Net Present Value (NPV) analysis and a calculation of your return on investment.

Simply fill out the form and we’ll get started!
          </p>
          <div className="row">
            <Col6>
              <form
                className="form"
                action="https://formspree.io/mbjzlwgw"
                method="POST"
                name="quote-page"
                onSubmit={(e) => {
                  window.dataLayer = window.dataLayer || [];                

                  window.localStorage.clear();
                  
                  const eventData = {
                   category: "Form",
                    action: "Submit",
                    label: "LongQuote",
                    // value: 0 // optional
                  }

                  trackCustomEvent(eventData)
                }}
                // data-netlify="true" -- to use netlify forms
              >
                <FormInput
                  name="full-name"
                  label="Full name*"
                  placeholder="Type your full name"
                  value={form['full-name']}
                  required
                  onChange={(evt) => setFormValue('full-name', evt.currentTarget.value)}
                />
                <FormInput
                  name="email"
                  label="Email*"
                  type="email"
                  placeholder="Type your email"
                  value={form['email']}
                  required
                  onChange={(evt) => setFormValue('email', evt.currentTarget.value)}
                />
                <FormInput
                  name="phone-number"
                  label="Phone number*"
                  type="tel"
                  placeholder="Type your phone number"
                  value={form['phone-number']}
                  required
                  onChange={(evt) => setFormValue('phone-number', evt.currentTarget.value)}
                />
                <FormInput
                  name="company"
                  label="Company*"
                  placeholder="Type the name of your company or organisation"
                  value={form['company']}
                  onChange={(evt) => setFormValue('company', evt.currentTarget.value)}
                />
                <FormInput
                  name="address"
                  label="Address"
                  placeholder="Type your full address"
                  onChange={(evt) => setFormValue('address', evt.currentTarget.value)}
                />
                <FormInput 
                  name="isSpecialPrice"
                  label="isSpecialPrice"
                  placeholder="We should not see this"
                  style={{maxHeight:0, opacity: 0, display: "none"}}
                  value={isSpecial}
                />
                <FormInput 
                  name="Hert"
                  label="Hert"
                  placeholder="We should not see this, extra discout from he"
                  style={{maxHeight:0, opacity: 0, display: "none"}}
                  value={state?.isHert || 'no'}
                />
                <FormInput
                  name="AlreadySubmittedShortQuote"
                  label="AlreadySubmittedShortQuote"
                  placeholder="We should not see this, indicates the person filled the short quote lready"
                  style={{maxHeight:0, opacity: 0, display: "none"}}
                  value={state?.isShortQuote || 'no'}
                />
                {
                  googleCampaignQueryKeys.map(key => (
                    <FormInput
                        key={key}
                        name={key}
                        label={key}
                        placeholder="We should not see this, indicates the person filled the short quote lready"
                        style={{maxHeight:0, opacity: 0, display: "none"}}
                        value={urlParams.get(key) || 'null'}
                    />
                  ))
                }

                <div className="form__actions">
                  <BlockCTA fullWidth large submit>
                    Request Quote 
                  </BlockCTA>
                </div>
              </form>
            </Col6>
            <Col6> 
              <Image src="/images/quote-24.jpg" title="Fast Response" />
            </Col6>
          </div>
        </div>
      </Block>
    </div>
  )
}

export default QuotePageCommercial
