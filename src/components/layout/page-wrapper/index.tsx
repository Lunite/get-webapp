import React, { FunctionComponent, useEffect, useState } from "react"
import Footer from "~/components/layout/footer"
import Navigation from "~/components/layout/navigation"
import SEO from "~/components/util/SEO"
import { useSitemap } from "~/hooks/useSitemap"
import Certificates from "~/components/standalone/Certificates"

import "./styles.scss"
import { useStaticQuery, graphql } from "gatsby"

interface PageWrapperProps {
  context: any
}

const PageWrapper: FunctionComponent<PageWrapperProps> = ({
  context,
  children,
}) => {
  const [sitemap, setSitemap] = useState([])
  const [markdownNodes, setMarkdownNodes] = useState([])
  const [imageNodes, setImageNodes] = useState([])

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

  const sm = useSitemap(allSitePage.nodes, allMarkdownRemark.nodes)

  useEffect(() => {
    setSitemap(sm)
    setMarkdownNodes(allMarkdownRemark.nodes)
    setImageNodes(allImageSharp?.nodes)
  }, [sm, allMarkdownRemark, allImageSharp])

  /**
   * seoData
   * This method returns the required SEO data that is then passed to the SEO component below
   */
  const seoData = (() => {
    let title, slug, image

    // title and slug always come from the context
    title = context.seo_title || context.title || ""
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
  })()

  return (
    <>
      <SEO {...seoData} />
      {sitemap.length && markdownNodes.length ? (
        <div className="page-wrapper">
          <Navigation sitemap={sitemap} />
          <main>
            {React.Children.toArray(children).map(child =>
              React.cloneElement(child, { markdownNodes, imageNodes })
            )}
            <Certificates imageNodes={imageNodes} />
          </main>
          <Footer sitemap={sitemap} />
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default PageWrapper
