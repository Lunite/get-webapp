import { useStaticQuery, graphql } from "gatsby"
import { useEffect, useState } from "react"

export interface SitemapItem {
  title?: string
  slug: string
  path?: string
  children?: SitemapItem[]
}

interface AllSitePageNode {
  path
  context: {
    title
    slug
  }
}

export const useSitemap = () => {
  const sitemapNodes =
    (useStaticQuery(graphql`
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
    `)?.allSitePage?.nodes as AllSitePageNode[]) || []

  const restructureSitemap = (sitemap: AllSitePageNode[]): SitemapItem[] => {
    let restructuredSitemap: SitemapItem[] = []

    sitemap.forEach(sItem => {
      const [, parent, post] = sItem.path.split("/")

      if (!sItem.context || !sItem.context.title) {
        // for some reason the item doesn't have a title
        return
      }

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

  const [sitemap, setSitemap] = useState([])

  useEffect(() => {
    const structuredSitemap = restructureSitemap(sitemapNodes)

    setSitemap(structuredSitemap)
  }, [])

  return sitemap
}
