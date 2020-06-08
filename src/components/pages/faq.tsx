import React, { useState, useEffect } from "react"
import Markdown from "react-markdown"
import Hero from "~/components/configurable/Hero"
import Heading from "../configurable/Heading"
import Block from "../configurable/Block"
import InfoStrip from "../configurable/InfoStrip"
import Collapsible from "../configurable/Collapsible"
import { markdownNodesFilter } from "~/utils"

const FAQPage = ({ markdownNodes }) => {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    setQuestions(
      markdownNodesFilter(markdownNodes, "questions").map(q => ({
        question: q.frontmatter.title,
        answer: q.frontmatter.answer,
      }))
    )
  }, [])

  return (
    <div className="faq-page">
      <Hero image="/images/quote-banner.jpg" compact>
        <Heading level={1} underlined>
          Support and FAQ
        </Heading>
      </Hero>
      <InfoStrip
        theme="light"
        email="support@get-uk.com"
        phoneNumber="020 3995 4422"
      />
      <Block>
        <div className="container u-layout--squidge container--column">
          {questions.map((q, i) => (
            <Collapsible
              key={i}
              heading={q.question}
              content={<Markdown source={q.answer} />}
            />
          ))}
        </div>
      </Block>
    </div>
  )
}

export default FAQPage
