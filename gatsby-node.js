const path = require(`path`)
const { slash } = require(`gatsby-core-utils`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const pagesQuery = `query getAllWordpressPages {
    allWordpressPage {
      nodes {
        id
        acf {
          seo {
            keywords
            description
            image {
              source_url
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

  const projectsQuery = `query getAllWordpressPosts {
    allWordpressPost(filter: {categories: {elemMatch: {slug: {eq: "project"}}}}) {
      nodes {
        id
        acf {
          post_type
          project {
            description
            subtitle
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
            info_output
            info_system
          }
          seo {
            description
            keywords
            image {
              source_url
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

  const servicesQuery = `query getAllWordpressPosts {
    allWordpressPost(filter: {categories: {elemMatch: {slug: {eq: "service"}}}}) {
      nodes {
        id
        acf {
          post_type
          seo {
            description
            keywords
            image {
              source_url
            }
          }
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

  const productsWarrantiesQuery = `query getAllWordpressPosts {
    allWordpressPost(
      filter: {
        categories: { elemMatch: { slug: { eq: "product_warranty" } } }
      }
    ) {
      nodes {
        id
        acf {
          product_warranty {
            image {
              source_url
              title
            }
            pdf
          }
        }
        slug
        title
      }
    }
  }`

  const createPages = (query, category, queryName = "allWordpressPost") => {
    try {
      return graphql(query, { category }).then(results => {
        if (!results.data[queryName] || !results.data[queryName].nodes.length) {
          return Promise.resolve()
        }

        const template = path.resolve(`./src/templates/${category}/index.tsx`)

        results.data[queryName].nodes.forEach(node => {
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
    } catch (e) {
      console.log(e)
    }
  }

  const createStaticPages = pages => {
    pages.forEach(page => {
      const template = path.resolve(`./src/components/pages/${page.slug}.tsx`)

      if (page.slug === "products-warranties") {
        return graphql(productsWarrantiesQuery).then(results => {
          if (
            !results.data.allWordpressPost ||
            !results.data.allWordpressPost.nodes.length
          ) {
            Promise.resolve()
          }

          createPage({
            path: "/products-warranties",
            component: slash(template),
            context: {
              title: page.title,
              slug: page.slug,
              acf: {
                seo: ({ keywords, description } = page),
              },
              productsWarranties: results.data.allWordpressPost.nodes,
            },
          })
        })
      }

      createPage({
        path: `/${page.slug === "index" ? "" : page.slug}`,
        component: slash(template),
        context: {
          title: page.title,
          slug: page.slug,
          acf: {
            seo: ({ keywords, description } = page),
          },
        },
      })
    })
  }

  return Promise.all([
    // createPages(pagesQuery, "page", "allWordpressPage"),
    createPages(projectsQuery, "project"),
    // createPages(servicesQuery, "service"),
    createStaticPages([
      {
        slug: "contact-us",
        title: "Contact Us",
        keywords: "",
        description: "",
      },
      // { slug: "faq", title: "Support & FAQ", keywords: "", description: "" },
      {
        slug: "for-your-business",
        title: "For Your Business",
        keywords: "",
        description: "",
      },
      {
        slug: "index",
        title: "For Your Home",
        keywords: "test, keywords, homepage, solar",
        description: "Hey. This is a test description. Is everything okay?",
      },
      // { slug: "products", title: "Products", keywords: "", description: "" },
      // {
      //   slug: "projects",
      //   title: "Case Studies",
      //   keywords: "",
      //   description: "",
      // },
      { slug: "quote", title: "Get a Quote", keywords: "", description: "" },
      { slug: "404", title: "Page not found", keywords: "", description: "" },
      {
        slug: "products-warranties",
        title: "Products and Warranties",
        keywords: "",
        description: "",
      },
    ]),
  ])
}
