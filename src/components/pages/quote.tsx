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
import { window } from 'global';

import { trackCustomEvent } from "gatsby-plugin-google-analytics"

export const SPECIAL_PRICE_KEY = 'utm_campaign';
export const SPECIAL_PRICE_VALUE = 'special_price';

const googleCampaignQueryKeys = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
];

const QuotePage = ({ location }) => {
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
                <FormSelect
                  name="homeowner"
                  label="Do you own your property?*"
                  options={["yes", "no"]}
                  value={form['Homeowner']}
                  required
                  onChange={(evt) => setFormValue('Homeowner', evt.currentTarget.value)}
                />
                <FormInput
                  name="address"
                  label="Address"
                  placeholder="Type your full address"
                  onChange={(evt) => setFormValue('address', evt.currentTarget.value)}
                />
                <FormSelect
                  name="sourceindicatedbycostumer"
                  label="How did you hear about us?"
                  options={["Internet search", "Recommendation", "Don't Waste Money referral", "Social Media", "Other"]}
                  value={form['beds']}
                  onChange={(evt) => setFormValue('beds', evt.currentTarget.value)}
                />
                <FormInput
                  name="comments"
                  label="Comments"
                  placeholder="Type any comments you may have"
                  onChange={(evt) => setFormValue('comments', evt.currentTarget.value)}
                />
                <Block>
                  <Heading level={4}>Further details - Why do we need this information?</Heading>
                  <p>
                    Our usage-based model means that our designs are truly cost
                    effective and based around your consumption, lifestyle and
                    needs. This is in order to design a system that generates
                    the optimum amount of energy, minimising surplus export to
                    the grid and reducing payback time.
                  </p>
                </Block>
                <FormInput
                  name="annual-electricity-usage"
                  label="Annual Electricity Usage"
                  placeholder="Type your annual electricity usage"
                  value={form['annual-electricity-usage']}
                  onChange={(evt) => setFormValue('annual-electricity-usage', evt.currentTarget.value)}
                />
                <FormInput
                  name="unit-rate"
                  label="Unit Rate"
                  placeholder="Type unit rate"
                  value={form['unit-rate']}
                  onChange={(evt) => setFormValue('unit-rate', evt.currentTarget.value)}
                />
                <FormInput
                  name="standing-charge" 
                  label="Standing Charge"
                  placeholder="Type standing charge"
                  value={form['standing-charge']}
                  onChange={(evt) => setFormValue('standing-charge', evt.currentTarget.value)}
                />
                <FormSelect
                  name="beds"
                  label="Number of beds"
                  options={["1", "2", "3", "4", "5", "6+"]}
                  value={form['beds']}
                  onChange={(evt) => setFormValue('beds', evt.currentTarget.value)}
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
                  value={form['own']}
                  onChange={(evt) => setFormValue('own', evt.currentTarget.value)}
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

export default QuotePage
