import React, { useState, useEffect } from "react"
import Img from "gatsby-image"
import { Link } from "gatsby"
import Col6 from "~/components/grid/Col6"
import Map from "./map"
import Carousel from "./carousel"

import {
  CarouselProvider,
  Slider,
  Slide,
  Dot,
  DotGroup,
} from "pure-react-carousel"
import "pure-react-carousel/dist/react-carousel.es.css"

import "./styles.scss"
import Heading from "../Heading"
import { markdownNodesFilter } from "~/utils"

const CaseStudiesMap = ({
  customerType,
  markdownNodes,
  currentSlide,
}: {
  customerType: "domestic" | "commercial"
  markdownNodes: any[]
  currentSlide: number
}) => {
  const items = markdownNodesFilter(markdownNodes, "project")
  const itemsToDisplay = items.filter(
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

  // these relate to the dots in the map. This is how the dot selected for a project is linked to the dot on the map
  const mapDotsData = {
    "Ireland: South East": {
      alias: "seIreland",
      x: 147.839,
      y: 499.482,
    },
    "Ireland: South West": {
      alias: "swIreland",
      x: 59.3246,
      y: 528.119,
    },
    "Scotland: Highlands": {
      alias: "hScotland",
      x: 217.263,
      y: 180.135,
    },
    "Scotland: South East": {
      alias: "seScotland",
      x: 330.943,
      y: 299.022,
    },
    "Wales: North": {
      alias: "nWales",
      x: 287.553,
      y: 482.994,
    },
    "London: North": {
      alias: "nLondon",
      x: 412.515,
      y: 562.83,
    },
    "London: West": {
      alias: "wLondon",
      x: 389.084,
      y: 580.186,
    },
    "London: South": {
      alias: "sLondon",
      x: 415.986,
      y: 589.732,
    },
    "Midlands: North": {
      alias: "nMidlands",
      x: 348.298,
      y: 471.712,
    },
    "Midlands: South": {
      alias: "sMidlands",
      x: 377.803,
      y: 489.936,
    },
    Cornwall: {
      alias: "cornwall",
      x: 246.767,
      y: 653.08,
    },
    Devon: {
      alias: "devon",
      x: 260.651,
      y: 610.559,
    },
    "England: North East": {
      alias: "neEngland",
      x: 380.407,
      y: 388.405,
    },
    "England: East": {
      alias: "eEngland",
      x: 485.409,
      y: 518.573,
    },
    "England: South East": {
      alias: "seEngland",
      x: 478.467,
      y: 603.617,
    },
  }

  if (!items?.length) {
    return null
  }

  const [carouselItems, setCarouselItems] = useState([])

  useEffect(() => {
    setCarouselItems(
      itemsToDisplay.map(
        (
          {
            fields: { slug },
            frontmatter: {
              image,
              image_case_studies,
              title,
              quote,
              description,
              info_strip,
              map_dot,
            },
          },
          itemIndex
        ) => {
          const itemImage = image_case_studies || image

          return {
            index: itemIndex,
            mapDot: map_dot ? mapDotsData[map_dot] : false,
            node: (
              <div className="project-item" key={slug}>
                <Img
                  className="project-item__image"
                  alt={title}
                  fluid={{
                    ...itemImage.childImageSharp.fluid,
                    aspectRatio: 1.9,
                  }}
                />
                <Heading className="project-item__title" level={4}>
                  <span dangerouslySetInnerHTML={{ __html: quote || title }} />
                </Heading>
                <Heading className="project-item__subtitle" level={5}>
                  <>
                    {customerType === "commercial" && "Comercial installation"}
                    {customerType === "domestic" && "Domestic installation"}
                  </>
                </Heading>
                <p
                  className="project-item__description"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
                <div className="project-item__info">
                  {info_strip?.system && (
                    <div className="cs-info-item">
                      <span className="cs-info-item__heading">System</span>
                      <span className="cs-info-item__value">
                        {info_strip?.system}
                      </span>
                    </div>
                  )}
                  {info_strip?.output && (
                    <div className="cs-info-item">
                      <span className="cs-info-item__heading">Output</span>
                      <span className="cs-info-item__value">
                        {info_strip?.output}
                      </span>
                    </div>
                  )}
                  {info_strip?.location && (
                    <div className="cs-info-item">
                      <span className="cs-info-item__heading">Location</span>
                      <span className="cs-info-item__value">
                        {info_strip?.location}
                      </span>
                    </div>
                  )}
                </div>
                <Link className="project-item__link" to={`/project${slug}`}>
                  Read More
                </Link>
              </div>
            ),
          }
        }
      )
    )
  }, [])

  return (
    <div className="case-studies-map">
      <CarouselProvider
        isPlaying={true}
        interval={10000}
        lockOnWindowScroll={true}
        naturalSlideHeight={0}
        naturalSlideWidth={0}
        totalSlides={carouselItems.length}
      >
        <div className="row">
          <Col6>
            <Map
              dots={carouselItems.filter(({ mapDot }) => !!mapDot)}
              currentSlide={currentSlide}
            />
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
              {carouselItems.map(({ node }) => node)}
            </div>
            <div className="case-studies-map__carousel">
              <Slider>
                {carouselItems.map(({ node, index }) => (
                  <Slide index={index}>{node}</Slide>
                ))}
              </Slider>
              <DotGroup>
                {carouselItems.map(({ index }) => (
                  <Dot slide={index}>
                    <div className="carousel__dot" />
                  </Dot>
                ))}
              </DotGroup>
            </div>
          </Col6>
        </div>
      </CarouselProvider>
    </div>
  )
}

export default CaseStudiesMap
