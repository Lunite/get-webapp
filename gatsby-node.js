/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`)
const { slash } = require(`gatsby-core-utils`)

const sitemap = []

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

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

  const addToSitemap = (path, node) => {
    const pathParts = path.split("/")

    if (pathParts.length === 1) {
      // root post (page)
      sitemap[node.slug] = {
        title: node.title,
        slug: node.slug,
        children: [],
      }

      return
    }

    if (pathParts.length === 2) {
      // post is within a category

      if (!sitemap[pathParts[1]]) {
        // add category as it isn't in sitemap
        sitemap[pathParts[1]] = {
          children: [
            {
              title: node.title,
              slug: node.slug,
            },
          ],
        }

        return
      }

      sitemap[pathParts[1]].children.push({
        title: node.title,
        slug: node.slug,
      })
    }
  }

  const createPages = category => {
    return graphql(postsQuery, { category }).then(results => {
      if (!results.data.allWordpressPost.nodes.length) {
        return Promise.resolve()
      }

      const template = path.resolve(`./src/templates/${category}/index.tsx`)

      results.data.allWordpressPost.nodes.forEach(node => {
        const path = `${category !== "page" ? `${category}/` : ""}${node.slug}`

        addToSitemap(path, node)

        createPage({
          path,
          component: slash(template),
          context: {
            content: node.content,
            title: node.title,
            slug: node.slug,
            acf: node.acf,
          },
        })
      })
    })
  }

  return Promise.all([
    createPages("page"),
    createPages("project"),
    createPages("service"),
  ])
}
