import React from "react"
import Hero from "~/components/configurable/Hero"
import FormInput from "~/components/olc-framework/FormInput"
import Block from "~/components/configurable/Block"
import Heading from "~/components/configurable/Heading"
import FormSelect from "~/components/olc-framework/FormSelect"
import BlockCTA from "~/components/configurable/BlockCTA"
import FormCheckbox from "../olc-framework/FormCheckbox"

const QuotePage = ({ location }) => {
  const { state = {} } = location

  return (
    <div className="quote-page">
      <Hero image="/images/quote-banner.jpg" compact>
        <Heading level={1} underlined>
          Get a Quote
        </Heading>
      </Hero>
      <Block>
        <div className="container u-layout--indent container--column">
          <form
            className="form"
            action="https://formspree.io/mbjzlwgw"
            method="POST"
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
            <FormSelect
              name="annual-electricity-usage"
              label="Annual Electricity Usage"
              options={["22KW", "32KW", "49KW"]}
            />
            <FormInput
              name="unit-rate"
              label="Unit Rate"
              placeholder="Type unit rate"
            />
            <FormSelect
              name="standing-charge"
              label="Standing Charge"
              options={["no idea", "who knows", "have no clue"]}
            />
            <Block>
              <Heading level={4}>Usage based Model</Heading>
              <p>
                Green Energy Together's range of detailed design services ensure
                that you get the best value for money on your solar project.
                Whether it's system designs, electrical engineering design,
                cost/value engineering, data monitoring systems or grid
                connection, our experts have you covered.
              </p>
            </Block>
            <p className="u-font--body-large">
              If you have a bill to hand, please input the following details
              which will help us refine your quote.
            </p>
            <FormSelect
              name="beds"
              label="Number of beds"
              options={["1", "2", "3", "4"]}
            />
            <FormCheckbox
              name="own"
              label="And if you own:"
              options={[
                "Electric Car",
                "Air Source Eating",
                "Swimming Pool",
                "Electric storage heating",
              ]}
            />
            <div className="form__actions">
              <BlockCTA fullWidth large submit>
                Request Quote
              </BlockCTA>
            </div>
          </form>
        </div>
      </Block>
    </div>
  )
}

export default QuotePage
