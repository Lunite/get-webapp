const path = require(`path`)
const { slash } = require(`gatsby-core-utils`)

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

  const createPages = category => {
    return graphql(postsQuery, { category }).then(results => {
      if (!results.data.allWordpressPost.nodes.length) {
        return Promise.resolve()
      }

      const template = path.resolve(`./src/templates/${category}/index.tsx`)

      results.data.allWordpressPost.nodes.forEach(node => {
        const path = (() => {
          console.log(node)

          if (node.slug === "homepage") {
            return "/"
          }

          return `${category !== "page" ? `${category}/` : ""}${node.slug}`
        })()

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
