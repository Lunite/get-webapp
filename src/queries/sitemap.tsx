import { graphql } from "gatsby"

const SITEMAP_QUERY = graphql`
  query MySitemapQuery {
    allSitePage {
      nodes {
        path
        context {
          title
          slug
        }
      }
    }
  }
`

export default SITEMAP_QUERY
