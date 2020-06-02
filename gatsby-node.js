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

  const filterResults = (results, slug) => {
    return (
      results.filter(item => {
        return item.node.fileAbsolutePath.indexOf(`/content/${slug}/`) > -1
      }) || []
    )
  }

  const createPages = async () => {
    const result = await graphql(`
      {
        allMarkdownRemark(limit: 100) {
          edges {
            node {
              frontmatter {
                date(formatString: "DD MMM YYYY")
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
                  title
                  description
                  keywords
                }
                hero_title
                hero_subtitle
                show_quote_block
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
              fileAbsolutePath
              html
            }
          }
        }
      }
    `);

    //-- PROJECT PAGES --//
    const projectTemplate = path.resolve("./src/templates/project/index.tsx")

    const projects = filterResults(
      result.data.allMarkdownRemark.edges,
      "project"
    )

    projects.forEach(({ node }) => {
      createPage({
        path: `/project${node.fields.slug}`,
        component: slash(projectTemplate),
        context: node.frontmatter,
      })
    })
    //-- PROJECT PAGES DONE --//

    //-- BLOG ITEM PAGES --//
    const blogItemTemplate = path.resolve("./src/templates/blog/item/index.tsx")

    const blogItems = filterResults(result.data.allMarkdownRemark.edges, "blog");

    blogItems.forEach(({ node }) => {
      createPage({
        path: `/blog${node.fields.slug}`,
        component: slash(blogItemTemplate),
        context: {
          ...node.frontmatter,
          body: node.html,
        },
      })
    })
    //-- BLOG ITEM PAGES DONE --//

    //-- ROOT MARKDOWN PAGES --//

    const rootItems = filterResults(result.data.allMarkdownRemark.edges, "root");

    rootItems.forEach(({ node }) => {
      createPage({
        path: `${node.fields.slug}`,
        component: slash(blogItemTemplate),
        context: {
          ...node.frontmatter,
          body: node.html,
        },
      })
    });
    

    //-- ROOT MARKDOWN PAGES DONE --//
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
    createPages(),
    createStaticPages([
      {
        slug: "contact-us",
        seo_title: "Contact | Green Energy Together | Solar Panel Installer",
        title: "Contact Us",
        keywords: "",
        description:
          "Green Energy Together is based in Hertfordshire, England. Contact us today to discuss your individual requirements or any questions you may have for us.",
      },
      // { slug: "faq", title: "Support & FAQ", keywords: "", description: "" },
      {
        slug: "for-your-business",
        seo_title:
          "For Your Business | Green Energy Together | Solar Panel Installer",
        title: "For Your Business",
        keywords: "",
        description:
          "For more than a decade, Green Energy Together has designed, engineered, installed and maintained commercial solar power systems across the UK.",
      },
      {
        slug: "index",
        seo_title: "Home | Green Energy Together | Solar Panel Installer",
        title: "Homepage",
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
        seo_title:
          "Get A Quote | Green Energy Together | Solar Panel Installer",
        title: "Get a Quote",
        keywords: "",
        description:
          "Just simply fill out a few details to receive a free no-obligation quote and survey from us here at Green Energy Together.",
      },
      { slug: "404", title: "Page not found", keywords: "", description: "" },
      {
        slug: "products-warranties",
        seo_title:
          "Products & Warranties | Green Energy Together | Solar Panel Installer",
        title: "Products & Warranties",
        keywords: "",
        description:
          "All of the solar panels Green Energy Together supplies come with a minimum 10 year product warranty and a 25 year linear performance warranty.",
      },
    ]),
  ])
}
