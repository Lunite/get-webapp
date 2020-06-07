import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Hero from "~/components/configurable/Hero"
import Heading from "../configurable/Heading"
import Block from "../configurable/Block"
import InfoStrip from "../configurable/InfoStrip"
import Collapsible from "../configurable/Collapsible"

const FAQPage = () => {
  const [questions, setQuestions] = useState([])

  const qResponse =
    useStaticQuery(graphql`
      query MyMarkdownQuery {
        allMarkdownRemark(limit: 1000) {
          edges {
            node {
              frontmatter {
                title
                answer
              }
              fileAbsolutePath
            }
          }
        }
      }
    `)?.allMarkdownRemark?.edges || []

  useEffect(() => {
    setQuestions(
      qResponse
        .filter(
          item => item.node.fileAbsolutePath.indexOf("/content/faq/") > -1
        )
        .map(q => ({
          question: q.node.frontmatter.title,
          answer: q.node.frontmatter.answer,
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
        <div className="container u-layout--indent container--column">
          {questions.map(q => (
            <Collapsible heading={q.question} content={q.answer} />
          ))}
        </div>
      </Block>
    </div>
  )
}

export default FAQPage
