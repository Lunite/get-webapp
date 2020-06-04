import React from "react"
import Hero from "~/components/configurable/Hero"
import Heading from "../configurable/Heading"
import Block from "../configurable/Block"
import Section from "~/components/configurable/Section"
import Col9 from "~/components/grid/Col9"
import { useCustomerType } from "~/hooks/useCustomerType"
import Grid from "../configurable/Grid"

import "./projects.scss"
import { Link } from "gatsby"

const ProjectsPage = ({ pageContext }) => {
  const { customerType } = useCustomerType()

  const commercialProjects = pageContext.projects.filter(
    p => p.node.frontmatter.category === "commercial"
  )
  const domesticProjects = pageContext.projects.filter(
    p => p.node.frontmatter.category === "domestic"
  )

  const commercialSection = (() => (
    <>
      <div className="container u-layout--indent">
        <Heading level={3}>Business Installations</Heading>
        <div className="row">
          <Col9>
            <p>
              We are proud of every installation we have been able to work on.
              If you are interested in seeing real-life examples, please have a
              look at some of our favourite projects.
            </p>
          </Col9>
        </div>
      </div>
      <div className="container">
        <Grid className="projects" autoHeight>
          {commercialProjects.map(item => {
            const project = item.node.frontmatter

            return (
              <li
                key={item.node.fields.slug}
                style={{
                  backgroundImage: `url('${project.image?.publicURL}')`,
                }}
              >
                <p className="project__title">{project.title}</p>
                <p className="project__location"></p>
              </li>
            )
          })}
        </Grid>
      </div>
    </>
  ))()

  const domesticSection = (() => (
    <>
      <div className="container u-layout--indent">
        <Heading level={3}>Domestic Installations</Heading>
        <div className="row">
          <Col9>
            <p>
              For over a decade we've installed thousands of solar panels making
              us one of the UK’s largest energy companies. Our number one
              priority is making certain that our customers are pleased with
              their solar power system. The success we’ve had in satisfying the
              needs of those customers is evident in the feedback we’ve
              received. Read on to see why Green Energy Together is the right
              choice for your project.
            </p>
          </Col9>
        </div>
      </div>

      <div className="container">
        <Grid className="projects" autoHeight>
          {domesticProjects.map(item => {
            const project = item.node.frontmatter

            return (
              <li
                key={item.node.fields.slug}
                style={{
                  backgroundImage: `url('${project.image?.publicURL}')`,
                }}
              >
                <Link
                  style={{ display: "block" }}
                  to={`/project${item.node.fields.slug}`}
                >
                  <p className="project__title">{project.title}</p>
                  <p className="project__location"></p>
                </Link>
              </li>
            )
          })}
        </Grid>
      </div>
    </>
  ))()

  return (
    <div className="projects">
      <Hero image="/images/products-warranties-banner.jpg" compact>
        <Heading level={1} underlined>
          Our Case Studies
        </Heading>
      </Hero>
      <Block>
        {customerType === "commercial" ? (
          <>
            {domesticSection}
            {commercialSection}
          </>
        ) : (
          <>
            {commercialSection}
            {domesticSection}
          </>
        )}
      </Block>
    </div>
  )
}

export default ProjectsPage
