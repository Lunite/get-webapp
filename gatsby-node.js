const path = require(`path`)
const { slash } = require(`gatsby-core-utils`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const pagesQuery = `query getAllWordpressPosts {
    allWordpressPost(filter: {categories: {elemMatch: {slug: {eq: "page"}}}}) {
      nodes {
        id
        acf {
          page {
            description
            in_sitemap
          }
        }
        title
        path
        slug
        content
      }
    }
  }`

  const projectsQuery = `query getAllWordpressPosts {
    allWordpressPost(filter: {categories: {elemMatch: {slug: {eq: "project"}}}}) {
      nodes {
        id
        acf {
          project {
            description
            hero_image {
              source_url
            }
            image {
              alt_text
              caption
              source_url
              title
            }
            info_location
            info_dc_peak
            info_developer
            info_inverters
            info_modules
            info_map_url
          }
        }
        title
        path
        slug
        content
      }
    }
  }`

  const servicesQuery = `query getAllWordpressPosts {
    allWordpressPost(filter: {categories: {elemMatch: {slug: {eq: "service"}}}}) {
      nodes {
        id
        acf {
          service {
            hero_image {
              source_url
              title
            }
            block_1_description
            block_1_heading
            block_1_highlight_1
            block_1_highlight_2
            block_1_image_1 {
              alt_text
              caption
              source_url
              title
            }
            block_1_image_2 {
              alt_text
              caption
              source_url
              title
            }
            block_2_description
            block_2_heading
            block_2_highlight_1
            block_2_highlight_2
            block_2_image_1 {
              alt_text
              caption
              source_url
              title
            }
            block_2_image_2 {
              alt_text
              caption
              source_url
              title
            }
            description
            display_image {
              alt_text
              caption
              source_url
              title
            }
          }
        }
        title
        path
        slug
        content
      }
    }
  }`

  const createPages = (query, category) => {
    return graphql(query, { category }).then(results => {
      if (!results.data.allWordpressPost.nodes.length) {
        return Promise.resolve()
      }
      const template = path.resolve(`./src/templates/${category}/index.tsx`)
      results.data.allWordpressPost.nodes.forEach(node => {
        const path = (() => {
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
    createPages(pagesQuery, "page"),
    createPages(projectsQuery, "project"),
    createPages(servicesQuery, "service"),
  ])
}
