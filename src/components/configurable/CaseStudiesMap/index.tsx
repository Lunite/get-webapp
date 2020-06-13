import React from "react"
import Img from "gatsby-image"
import { Link } from "gatsby"
import Col6 from "~/components/grid/Col6"

import AwesomeSlider from "react-awesome-slider"
import withAutoplay from "react-awesome-slider/dist/autoplay"

import UKMap from "~/vectors/uk-map.inline.svg"

import "./styles.scss"
import Heading from "../Heading"
import { markdownNodesFilter } from "~/utils"

const AutoplaySlider = withAutoplay(AwesomeSlider)

const CaseStudiesMap = ({
  customerType,
  markdownNodes,
}: {
  customerType: "domestic" | "commercial"
  markdownNodes: any[]
}) => {
  const items = markdownNodesFilter(markdownNodes, "project")

  if (!items?.length) {
    return null
  }

  const carouselItems = (() => {
    return items
      .filter(
        ({
          frontmatter: {
            category,
            show_in_case_studies,
            image_case_studies,
            image,
          },
        }) =>
          category === customerType &&
          show_in_case_studies &&
          (image_case_studies?.childImageSharp || image?.childImageSharp)
      )
      .map(node => {
        const pData = {
          slug: node.fields.slug,
          ...node.frontmatter,
        }

        const pImage = pData.image

        if (!pImage?.childImageSharp) {
          return null
        }

        return (
          <div className="project-item" key={pData.slug}>
            <Img
              className="project-item__image"
              alt={pData.title}
              fluid={{ ...pImage.childImageSharp.fluid, aspectRatio: 1.9 }}
            />
            <Heading className="project-item__title" level={4}>
              <span
                dangerouslySetInnerHTML={{ __html: pData.quote || pData.title }}
              />
            </Heading>
            <Heading className="project-item__subtitle" level={5}>
              <>
                {customerType === "commercial" && "Comercial installation"}
                {customerType === "domestic" && "Domestic installation"}
              </>
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
            <AutoplaySlider
              play={true}
              interval={10000}
              cancelOnIteraction={true}
              buttons={false}
              fillParent={true}
            >
              {carouselItems}
            </AutoplaySlider>
          </div>
        </Col6>
      </div>
    </div>
  )
}

export default CaseStudiesMap
