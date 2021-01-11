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
      results.filter(({ fileAbsolutePath }) => {
        return fileAbsolutePath.indexOf(`/content/${slug}/`) > -1
      }) || []
    )
  }

  const createPages = async () => {
    const result = await graphql(`
      {
        allMarkdownRemark(limit: 1000) {
          nodes {
            frontmatter {
              block_1 {
                heading
                description
                highlight_1
                highlight_2
                image_1 {
                  childImageSharp {
                    fluid(maxWidth: 1920) {
                      aspectRatio
                      src
                      srcSet
                      sizes
                      srcWebp
                      srcSetWebp
                    }
                  }
                }
                image_2 {
                  childImageSharp {
                    fluid(maxWidth: 1920) {
                      aspectRatio
                      src
                      srcSet
                      sizes
                      srcWebp
                      srcSetWebp
                    }
                  }
                }
              }
              block_2 {
                heading
                description
                highlight_1
                highlight_2
                image_1 {
                  childImageSharp {
                    fluid(maxWidth: 1920) {
                      aspectRatio
                      src
                      srcSet
                      sizes
                      srcWebp
                      srcSetWebp
                    }
                  }
                }
                image_2 {
                  childImageSharp {
                    fluid(maxWidth: 1920) {
                      aspectRatio
                      src
                      srcSet
                      sizes
                      srcWebp
                      srcSetWebp
                    }
                  }
                }
              }
              category
              date(formatString: "DD MMM YYYY")
              description
              display_image {
                childImageSharp {
                  fluid(maxWidth: 1920) {
                    aspectRatio
                    src
                    srcSet
                    sizes
                    srcWebp
                    srcSetWebp
                  }
                }
              }
              title
              answer
              list {
                image {
                  childImageSharp {
                    fluid(maxWidth: 326) {
                      aspectRatio
                      src
                      srcSet
                      sizes
                      srcWebp
                      srcSetWebp
                    }
                  }
                }
                intro
              }
              image_hero {
                childImageSharp {
                  fluid(maxWidth: 1920) {
                    aspectRatio
                    src
                    srcSet
                    sizes
                    srcWebp
                    srcSetWebp
                  }
                }
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
    `)

    //-- PROJECT PAGES --//
    const projectsTemplate = path.resolve("./src/components/pages/projects.tsx")
    const projectTemplate = path.resolve("./src/templates/project/index.tsx")

    const projects = filterResults(
      result.data.allMarkdownRemark.nodes,
      "project"
    )

    createPage({
      path: `/projects`,
      component: slash(projectsTemplate),
      context: {
        projects,
        title: "Case Studies",
        slug: "projects",
        acf: {
          seo: {
            description: "",
            keywords: "",
            seo_title:
              "Case Studies | Green Energy Together | Solar Panel Installer",
          },
        },
      },
    })

    projects.forEach(node => {
      createPage({
        path: `/project${node.fields.slug}`,
        component: slash(projectTemplate),
        context: node.frontmatter,
      })
    })
    //-- PROJECT PAGES DONE --//

    //-- SERVICE PAGES --//
    const serviceTemplate = path.resolve("./src/templates/service/index.tsx")

    const services = filterResults(
      result.data.allMarkdownRemark.nodes,
      "service"
    )

    services.forEach(({ fields, frontmatter }) => {
      createPage({
        path: `/service${fields.slug}`,
        component: slash(serviceTemplate),
        context: frontmatter,
      })
    })
    //-- SERVICE PAGES DONE --//

    //-- BLOG ITEM PAGES --//
    const blogItemTemplate = path.resolve("./src/templates/blog/item/index.tsx")
    const blogTemplate = path.resolve("./src/templates/blog/index.tsx")

    const blogItems = filterResults(result.data.allMarkdownRemark.nodes, "blog")

    createPage({
      path: `/blog`,
      component: slash(blogTemplate),
      context: {
        blogItems,
        title: "Blog",
        slug: "blog",
        acf: {
          seo: {
            seo_title: "Blog | Green Energy Together | Solar Panel Installer",
            description: "",
            keywords: "",
          },
        },
      },
    })

    blogItems.forEach(node => {
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

    const rootItems = filterResults(result.data.allMarkdownRemark.nodes, "root")

    rootItems.forEach(node => {
      createPage({
        path: `${node.fields.slug}`,
        component: slash(blogItemTemplate),
        context: {
          ...node.frontmatter,
          body: node.html,
        },
      })
    })

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
            seo: {
              seo_title: page.seo_title,
              keywords: page.keywords,
              description: page.description,
            },
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
      {
        slug: "faq",
        title: "Support and FAQ",
        seo_title:
          "Support and FAQ | Green Energy Together | Solar Panel Installer",
        keywords: "",
        description: "",
      },
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
      {
        slug: "quote",
        seo_title:
          "Get A Quote | Green Energy Together | Solar Panel Installer",
        title: "Get a Quote",
        keywords: "",
        description:
          "Just simply fill out a few details to receive a free no-obligation quote and survey from us here at Green Energy Together.",
      },
      {
        slug: "yourquote",
        seo_title: "Your Quote | Green Energy Together | Solar Panel Installer",
        title: "Your Quote",
        keywords: "",
        description: "Your free no-obligation quote",
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
      {
        slug: "solar-together-faq",
        seo_title:
          "Solar Together FAQs| Green Energy Together | Solar Panel Installer",
        title: "Solar Together",
        keywords: "",
        description:
          "Solar Together FAQ",
      },
      {
        slug: "solar-together",
        seo_title:
          "Solar Together | Green Energy Together | Solar Panel Installer",
        title: "Solar Together",
        keywords: "",
        description:
          "Solar Together",
      },
      // {
      //   slug: "commercial-products",
      //   seo_title:
      //     "Commercial Products | Green Energy Together | Solar Panel Installer",
      //   title: "Commercial Products",
      //   keywords: "",
      //   description:
      //     "Commercial Products",
      // },
      // {
      //   slug: "commercial-warranties",
      //   seo_title:
      //     "Commercial Warranties | Green Energy Together | Solar Panel Installer",
      //   title: "Commercial Warranties",
      //   keywords: "",
      //   description:
      //     "Commercial Warranties",
      // },
    ]),
  ])
}
