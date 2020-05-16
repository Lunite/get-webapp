import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Col6 from "~/components/grid/Col6"

import AwesomeSlider from "react-awesome-slider"

import UKMap from "~/vectors/uk-map.inline.svg"

import "./styles.scss"
import Heading from "../Heading"

const CaseStudiesMap = () => {
  const projects =
    useStaticQuery(graphql`
      query getAllWordpressPosts {
        allWordpressPost(
          filter: { categories: { elemMatch: { slug: { eq: "project" } } } }
        ) {
          nodes {
            id
            acf {
              project {
                subtitle
                description
                image {
                  source_url
                  title
                }
                info_location
                info_output
                info_system
                show_in_case_studies
              }
            }
            slug
            title
          }
        }
      }
    `)?.allWordpressPost?.nodes || []

  if (!projects?.length) {
    return null
  }

  const carouselItems = (() => {
    return projects
      .filter(
        project =>
          project.acf.project.show_in_case_studies &&
          (project.acf.project.image_case_studies_component?.source_url ||
            project.acf.project.image?.source_url)
      )
      .map(project => {
        const pData = {
          title: project.title,
          slug: project.slug,
          ...project.acf.project,
        }

        const pImage =
          pData.image_case_studies_component?.source_url ||
          pData.image?.source_url

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
              {pData.info_system && (
                <div className="cs-info-item">
                  <span className="cs-info-item__heading">System</span>
                  <span className="cs-info-item__value">
                    {pData.info_system}
                  </span>
                </div>
              )}
              {pData.info_output && (
                <div className="cs-info-item">
                  <span className="cs-info-item__heading">Output</span>
                  <span className="cs-info-item__value">
                    {pData.info_output}
                  </span>
                </div>
              )}
              {pData.info_location && (
                <div className="cs-info-item">
                  <span className="cs-info-item__heading">Location</span>
                  <span className="cs-info-item__value">
                    {pData.info_location}
                  </span>
                </div>
              )}
            </div>
            <Link className="project-item__link" to={`/projects/${pData.slug}`}>
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
