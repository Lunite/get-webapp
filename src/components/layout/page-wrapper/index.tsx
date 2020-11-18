import React, { FunctionComponent, useEffect, useState } from "react"
import Footer from "~/components/layout/footer"
import Navigation from "~/components/layout/navigation"
import SEO from "~/components/util/SEO"
import Certificates from "~/components/standalone/Certificates"

import "./styles.scss"
import { useStaticQuery, graphql } from "gatsby"
import { CustomerTypeProvider } from "~/providers/CustomerTypeProvider"

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
  const [isSolarTogether, setIsSolarTogether] = useState(false)

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
  }, [allMarkdownRemark])

  useEffect(() => {
    setImageNodes(allImageSharp?.nodes)
  }, [allImageSharp])

  useEffect(() => {
    if (context) {
      setSeoData(getSeoData())

      setIsSolarTogether(context.slug === 'solar-together' || context.slug === 'solar-together-faq' )

    }
  }, [context])

  return (
    <>
      <SEO {...seoData} />
      {markdownNodes.length ? (
        <div className="page-wrapper">
          <CustomerTypeProvider>
            <Navigation isSolarTogether={isSolarTogether} />
            <main>
              {React.Children.toArray(children).map(child =>
                React.cloneElement(child, { markdownNodes, imageNodes })
              )}
              <Certificates imageNodes={imageNodes} />
            </main>
            <Footer isSolarTogether={isSolarTogether} />
          </CustomerTypeProvider>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default PageWrapper
