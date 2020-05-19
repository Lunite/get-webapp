const path = require(`path`)
const { slash } = require(`gatsby-core-utils`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const createProjectPages = async () => {
    const template = path.resolve('./src/templates/project/index.tsx')

    const result = await graphql(`
      {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          limit: 1000
        ) {
          edges {
            node {
              frontmatter {
                title
                description
                path
              }
            }
          }
        }
      }
    `)

    result.data.allMarkdownRemark.edges.forEach(({node}) => {
      consol.log(node)
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
