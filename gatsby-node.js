/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`)
const { slash } = require(`gatsby-core-utils`)

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
// Will create pages for WordPress pages (route : /{slug})
// Will create pages for WordPress posts (route : /post/{slug})
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // The “graphql” function allows us to run arbitrary
  // queries against the local Gatsby GraphQL schema. Think of
  // it like the site has a built-in database constructed
  // from the fetched data that you can run queries against.

  const getPostsFromCategory = category => {
    const postsQuery = `query getAllWordpressPosts($category: String) {
      allWordpressPost(filter: {categories: {elemMatch: {slug: {eq: $category}}}}) {
        nodes {
          id
          content
          path
          slug
          title
          acf {
            description
            related_products
            image {
              source_url
              caption
              alt_text
            }
            information {
              dc_peak
              developer
              inverters
              location
              map_url
              modules
            }
          }
        }
      }
    }`

    return graphql(postsQuery, { category }).then(results => {
      if (!results.data.allWordpressPost.nodes.length) {
        return Promise.resolve()
      }

      const template = path.resolve(`./src/templates/${category}/index.tsx`)

      results.data.allWordpressPost.nodes.forEach(node => {
        createPage({
          path: `${category}/${node.slug}`,
          component: slash(template),
          context: {
            content: node.context,
            title: node.title,
            slug: node.slug,
            acf: node.acf,
          },
        })
      })
    })
  }

  return Promise.all([
    getPostsFromCategory("project"),
    getPostsFromCategory("service"),
  ])
}
