import { useStaticQuery, graphql } from "gatsby"

export const useSitemap = () => {
  return useStaticQuery(graphql`
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
  `)?.allSitePage?.nodes
}
