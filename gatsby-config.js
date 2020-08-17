module.exports = {
  siteMetadata: {
    title: `Green Energy Together`,
    description: ``,
    author: `@gomezruo`,
    siteUrl: `https://www.get-uk.com`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/static/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `project`,
        path: `${__dirname}/content/project`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `root`,
        path: `${__dirname}/content/root`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `products_and_warranties`,
        path: `${__dirname}/content/products_and_warranties`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/content/blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `questions`,
        path: `${__dirname}/content/questions`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `service`,
        path: `${__dirname}/content/service`,
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaultQuality: 90,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#051c3f`,
        theme_color: `#ffffff`,
        display: `minimal-ui`,
        icon: `static/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    "gatsby-plugin-sass",
    "gatsby-plugin-typescript",
    {
      resolve: "gatsby-plugin-alias-imports",
      options: {
        alias: {
          "~": "src",
        },
        extensions: ["tsx", "ts", "svg", "jpg", "png"],
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.inline\.svg$/, // See below to configure properly
        },
      },
    },
    {
      resolve: "gatsby-plugin-brotli",
      options: {
        extensions: ["css", "html", "js", "svg"],
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-W6LJZSJ",
        includeInDevelopment: false,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-153856744-1",
        head: true,
      },
    },
    "gatsby-plugin-netlify-cms",
    "gatsby-transformer-remark",
  ],
}
