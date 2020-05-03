import { useStaticQuery, graphql } from "gatsby"

export interface SitemapItem {
  title?: string
  slug: string
  path?: string
  children?: SitemapItem[]
}

export const useSitemap = () => {
  interface AllSitePageNode {
    path
    context: {
      title
      slug
    }
  }

  const sitemap = useStaticQuery(graphql`
    query MySitemapQuery {
      allSitePage {
        nodes {
          path
          context {
            title
            slug
          }
        }
      }
    }
  `)?.allSitePage?.nodes as AllSitePageNode[]

  if (!sitemap) {
    return []
  }

  let restructuredSitemap: SitemapItem[] = []

  sitemap.forEach(sItem => {
    const [, parent, post] = sItem.path.split("/")

    const item: SitemapItem = {
      title: sItem.context.title,
      slug: sItem.context.slug,
      path: sItem.path,
      children: [], // it may have children
    }

    if (!post) {
      // post is a page so add it as a root page
      restructuredSitemap.push(item)

      return
    }

    if (parent && post) {
      // get the index (location) of the parent item in the restructured sitemap
      const parentIndex = sitemap.findIndex(
        item => item.context.slug === parent
      )

      if (parentIndex < 0) {
        // root page doesn't exist yet so add it

        restructuredSitemap.push({
          slug: parent, // we only know the slug of the parent
          children: [item],
        })

        return
      }

      restructuredSitemap[parentIndex].children.push(item)
    }
  })

  return restructuredSitemap
}
