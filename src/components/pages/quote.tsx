import React from "react"
import Hero from "~/components/configurable/Hero"
import FormInput from "~/components/olc-framework/FormInput"
import Block from "~/components/configurable/Block"
import Heading from "~/components/configurable/Heading"
import FormSelect from "~/components/olc-framework/FormSelect"
import BlockCTA from "~/components/configurable/BlockCTA"
import FormCheckbox from "../olc-framework/FormCheckbox"
import Col6 from "~/components/grid/Col6"
import Image from "../configurable/Image"

import { trackCustomEvent } from "gatsby-plugin-google-analytics"

const SPECIAL_PRICE_KEY = 'utm_campaign';
const SPECIAL_PRICE_VALUE = 'special_price';

const STORAGE_KEY = 'IS_SPECIAL';

const QuotePage = ({ location }) => {
  const { state = {} } = location;

  let specialValue = location.search.includes(`${SPECIAL_PRICE_KEY}=${SPECIAL_PRICE_VALUE}`) ? 'Yes' : 'No';
  const storedSpecialValue = localStorage.getItem(STORAGE_KEY);
  if (!storedSpecialValue) {
    localStorage.setItem(STORAGE_KEY, specialValue);
  } else {
    specialValue = storedSpecialValue;
  }
  

  return (
    <div className="quote-page">
      <Hero imageUrl="/images/quote-banner.jpg" compact>
        <Heading level={1} underlined>
          Get a Quote
        </Heading>
      </Hero>
      <Block>
        <div className="container u-layout--indent container--column">
          <p className="u-font--body-large">
            If you have a bill to hand, please input the following details which
            will help us refine your quote.
          </p>
          <div className="row">
            <Col6>
              <form
                className="form"
                action="https://formspree.io/mbjzlwgw"
                method="POST"
                name="quote-page"
                onSubmit={() => {
                  window.dataLayer = window.dataLayer || [];

                  localStorage.removeItem(STORAGE_KEY);

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
                  label="Full name"
                  placeholder="Type your full name"
                  value={state?.name}
                  required
                />
                <FormInput
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="Type your email"
                  value={state?.email}
                  required
                />
                <FormInput
                  name="phone-number"
                  label="Phone number"
                  type="tel"
                  placeholder="Type your phone number"
                  value={state?.phone}
                  required
                />
                <FormInput
                  name="address"
                  label="Address"
                  placeholder="Type your full address"
                />
                <FormInput
                  name="annual-electricity-usage"
                  label="Annual Electricity Usage"
                  placeholder="Type your annual electricity usage"
                />
                <FormInput
                  name="unit-rate"
                  label="Unit Rate"
                  placeholder="Type unit rate"
                />
                <FormInput
                  name="standing-charge" 
                  label="Standing Charge"
                  placeholder="Type standing charge"
                />
                <Block>
                  <Heading level={4}>Why we need this information</Heading>
                  <p>
                    Our usage-based model means that our designs are truly cost
                    effective and based around your consumption, lifestyle and
                    needs. This is in order to design a system that generates
                    the optimum amount of energy, minimising surplus export to
                    the grid and reducing payback time.
                  </p>
                </Block>
                <FormSelect
                  name="beds"
                  label="Number of beds"
                  options={["1", "2", "3", "4", "5", "6+"]}
                />
                <FormCheckbox
                  name="own"
                  label="And if you own:"
                  options={[
                    "Electric Car",
                    "Air Source Heating",
                    "Swimming Pool",
                    "Electric Storage Heating",
                  ]}
                />
                 <FormInput
                  name="DWMPrice"
                  label="DWMPrice"
                  placeholder="We should not see this"
                  style={{maxHeight:0, opacity: 0}}
                  value={specialValue}
                />
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

export default QuotePage
