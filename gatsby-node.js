const path = require(`path`)
const { slash } = require(`gatsby-core-utils`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const nodeSlug = createFilePath({ node, getNode, basePath: `` })
    createNodeField({
      node,
      name: `slug`,
      value: nodeSlug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const createProjectPages = async () => {
    const template = path.resolve("./src/templates/project/index.tsx")

    const result = await graphql(`
      {
        allMarkdownRemark(limit: 10) {
          edges {
            node {
              frontmatter {
                description
                title
                image_hero {
                  name
                  publicURL
                }
                image {
                  name
                  publicURL
                }
                seo {
                  description
                  keywords
                }
                info_strip {
                  dc_peak
                  developer
                  inverters
                  location
                  modules
                  output
                  system
                  map_url
                }
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `)

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: `/project${node.fields.slug}`,
        component: slash(template),
        context: node.frontmatter,
      })
    })
  }

  const createStaticPages = pages => {
    pages.forEach(page => {
      const template = path.resolve(`./src/components/pages/${page.slug}.tsx`)

      // if (page.slug === "products-warranties") {
      //   return graphql(productsWarrantiesQuery).then(results => {
      //     if (
      //       !results ||
      //       !results.data ||
      //       !results.data.allWordpressPost ||
      //       !results.data.allWordpressPost.nodes.length
      //     ) {
      //       Promise.resolve()
      //     }

      //     createPage({
      //       path: "/products-warranties",
      //       component: slash(template),
      //       context: {
      //         title: page.title,
      //         slug: page.slug,
      //         acf: {
      //           seo: ({ keywords, description } = page),
      //         },
      //         productsWarranties: results.data.allWordpressPost.nodes,
      //       },
      //     })
      //   })
      // }

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
    createProjectPages(),
    createStaticPages([
      {
        slug: "contact-us",
        title: "Contact | Green Energy Together | Solar Panel Installer",
        keywords: "",
        description:
          "Green Energy Together is based in Hertfordshire, England. Contact us today to discuss your individual requirements or any questions you may have for us.",
      },
      // { slug: "faq", title: "Support & FAQ", keywords: "", description: "" },
      {
        slug: "for-your-business",
        title:
          "For Your Business | Green Energy Together | Solar Panel Installer",
        keywords: "",
        description:
          "For more than a decade, Green Energy Together has designed, engineered, installed and maintained commercial solar power systems across the UK.",
      },
      {
        slug: "index",
        title: "Home | Green Energy Together | Solar Panel Installer",
        keywords: "",
        description:
          "Solar generation shouldn't be a luxury - it should be for everyone. We are one of the largest installers in the UK, and bring a fresh approach to the solar market.",
      },
      // { slug: "products", title: "Products", keywords: "", description: "" },
      // {
      //   slug: "projects",
      //   title: "Case Studies",
      //   keywords: "",
      //   description: "",
      // },
      {
        slug: "quote",
        title: "Get A Quote | Green Energy Together | Solar Panel Installer",
        keywords: "",
        description:
          "Just simply fill out a few details to receive a free no-obligation quote and survey from us here at Green Energy Together.",
      },
      { slug: "404", title: "Page not found", keywords: "", description: "" },
      {
        slug: "products-warranties",
        title:
          "Products & Warranties | Green Energy Together | Solar Panel Installer",
        keywords: "",
        description:
          "All of the solar panels Green Energy Together supplies come with a minimum 10 year product warranty and a 25 year linear performance warranty.",
      },
    ]),
  ])
}
