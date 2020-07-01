import React from "react"
import Hero from "../configurable/Hero"
import Heading from "../configurable/Heading"

const QuotePage: React.FC<{}> = () => {
  return (
    <div className="quote-page">
      <Hero imageUrl="/images/quote-banner.jpg" compact>
        <Heading level={1} underlined>
          Get a Quote
        </Heading>
      </Hero>
    </div>
  )
}

export default QuotePage
