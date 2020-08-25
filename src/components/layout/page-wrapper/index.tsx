import React, { FunctionComponent, Suspense, useEffect, useState } from "react"

import { lazy } from "@loadable/component"

import "./styles.scss"
import { useStaticQuery, graphql } from "gatsby"

import SEO from "~/components/util/SEO"

interface PageWrapperProps {
  context: any
}

const PageWrapper: FunctionComponent<PageWrapperProps> = ({
  context,
  children,
}) => {
  const [markdownNodes, setMarkdownNodes] = useState([])
  const [imageNodes, setImageNodes] = useState([])
  const [seoData, setSeoData] = useState({})

  const Navigation = lazy(() => import("~/components/layout/navigation"))
  const Footer = lazy(() => import("~/components/layout/footer"))
  const Certificates = lazy(() =>
    import("~/components/standalone/Certificates")
  )

  const {
    allSitePage,
    allMarkdownRemark,
    allImageSharp,
  } = useStaticQuery(graphql`
    query MyMultiQuery {
      allImageSharp {
        nodes {
          fluid(maxWidth: 1920) {
            originalName
            aspectRatio
            src
            srcSet
            sizes
            srcWebp
            srcSetWebp
          }
        }
      }
      allSitePage {
        nodes {
          path
          context {
            title
            slug
          }
        }
      }
      allMarkdownRemark(limit: 1000) {
        nodes {
          frontmatter {
            description
            title
            answer
            quote
            category
            image {
              childImageSharp {
                fluid(maxWidth: 1920) {
                  aspectRatio
                  src
                  srcSet
                  sizes
                  srcWebp
                  srcSetWebp
                }
              }
            }
            show_in_case_studies
            map_dot
            image_case_studies {
              childImageSharp {
                fluid(maxWidth: 1920) {
                  aspectRatio
                  src
                  srcSet
                  sizes
                  srcWebp
                  srcSetWebp
                }
              }
            }
            info_strip {
              location
              system
              output
            }
            pdf {
              publicURL
            }
          }
          fields {
            slug
          }
          fileAbsolutePath
        }
      }
    }
  `)

  if (!allMarkdownRemark?.nodes?.length || !allSitePage?.nodes?.length) {
    return null
  }

  /**
   * seoData
   * This method returns the required SEO data that is then passed to the SEO component below
   */
  const getSeoData = () => {
    let title, slug, image

    // title and slug always come from the context
    title =
      context.acf?.seo?.seo_title ||
      `${
        context.title ? `${context.title} | ` : ""
      }Green Energy Together | Solar Panel Installer`
    slug = context.slug || ""

    if (!context?.acf?.seo) {
      // there is no extra SEO information available
      return { title, slug }
    }

    const { description, keywords } = context.acf.seo

    image = context.acf.seo?.image?.source_url

    return {
      title,
      slug,
      description,
      keywords,
      image,
    }
  }

  useEffect(() => {
    setMarkdownNodes(allMarkdownRemark.nodes)
    setImageNodes(allImageSharp?.nodes)

    if (context) {
      setSeoData(getSeoData())
    }
  }, [allMarkdownRemark, allImageSharp, context])

  return (
    <>
      <SEO {...seoData} />
      {markdownNodes.length ? (
        <div className="page-wrapper">
          <Suspense fallback="">
            <Navigation />
          </Suspense>
          <main>
            {React.Children.toArray(children).map(child =>
              React.cloneElement(child, { markdownNodes, imageNodes })
            )}
            <Suspense fallback="">
              <Certificates imageNodes={imageNodes} />
            </Suspense>
          </main>
          <Suspense fallback="">
            <Footer />
          </Suspense>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default PageWrapper
