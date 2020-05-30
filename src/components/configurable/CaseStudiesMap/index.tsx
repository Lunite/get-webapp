import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Col6 from "~/components/grid/Col6"

import AwesomeSlider from "react-awesome-slider"

import UKMap from "~/vectors/uk-map.inline.svg"

import "./styles.scss"
import Heading from "../Heading"

const ALL_MARKDOWN_REMARK = graphql`
  {
    allMarkdownRemark(limit: 100) {
      edges {
        node {
          frontmatter {
            description
            title
            category
            image {
              name
              publicURL
            }
            show_in_case_studies
            image_case_studies {
              publicURL
            }
            info_strip {
              location
              system
              output
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

const CaseStudiesMap = ({
  customerType,
}: {
  customerType: "domestic" | "commercial"
}) => {
  const items = useStaticQuery(ALL_MARKDOWN_REMARK)?.allMarkdownRemark?.edges

  if (!items?.length) {
    return null
  }

  const carouselItems = (() => {
    return items
      .filter(
        ({ node }) =>
          node.frontmatter.category === customerType &&
          node.frontmatter.show_in_case_studies &&
          (node.frontmatter.image_case_studies?.publicURL ||
            node.frontmatter.image?.publicURL)
      )
      .map(({ node }) => {
        const pData = {
          slug: node.fields.slug,
          ...node.frontmatter,
        }

        const pImage =
          pData.image_case_studies?.publicURL || pData.image?.publicURL

        if (!pImage) {
          return null
        }

        return (
          <div className="project-item" key={pData.slug}>
            <div
              className="project-item__image"
              title={pData.title}
              style={{ backgroundImage: `url(${pImage})` }}
            />
            <Heading className="project-item__title" level={4}>
              <span
                dangerouslySetInnerHTML={{ __html: pData.quote || pData.title }}
              />
            </Heading>
            <p
              className="project-item__description"
              dangerouslySetInnerHTML={{ __html: pData.description }}
            />
            <div className="project-item__info">
              {pData.info_strip?.system && (
                <div className="cs-info-item">
                  <span className="cs-info-item__heading">System</span>
                  <span className="cs-info-item__value">
                    {pData.info_strip?.system}
                  </span>
                </div>
              )}
              {pData.info_strip?.output && (
                <div className="cs-info-item">
                  <span className="cs-info-item__heading">Output</span>
                  <span className="cs-info-item__value">
                    {pData.info_strip?.output}
                  </span>
                </div>
              )}
              {pData.info_strip?.location && (
                <div className="cs-info-item">
                  <span className="cs-info-item__heading">Location</span>
                  <span className="cs-info-item__value">
                    {pData.info_strip?.location}
                  </span>
                </div>
              )}
            </div>
            <Link className="project-item__link" to={`/project${pData.slug}`}>
              Read More
            </Link>
          </div>
        )
      })
  })()

  if (!carouselItems.length) {
    return null
  }

  return (
    <div className="case-studies-map">
      <div className="row">
        <Col6>
          <UKMap />
        </Col6>
        <Col6>
          {/* This hidden element ensures the carousel is the correct height */}
          <div
            style={{
              opacity: 0,
              pointerEvents: "none",
              display: "flex",
              overflow: "hidden",
            }}
          >
            {carouselItems}
          </div>
          <div className="case-studies-map__carousel">
            <AwesomeSlider buttons={false} fillParent={true}>
              {carouselItems}
            </AwesomeSlider>
          </div>
        </Col6>
      </div>
    </div>
  )
}

export default CaseStudiesMap
