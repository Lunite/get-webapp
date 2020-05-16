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

export const useSitemap = (): SitemapItem[] => {
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

  const parentTitleMap = {
    service: "Services",
    project: "Case Studies",
    company: "Company",
  }

  const restructureSitemap = (sitemap: AllSitePageNode[]): SitemapItem[] => {
    let restructuredSitemap: SitemapItem[] = []

    sitemap.forEach(sItem => {
      let [, parent, post] = sItem.path.split("/")

      if (!parent || !sItem.context || !sItem.context.title) {
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
        // add post as a child of Company
        post = parent
        parent = "company"
      }

      // get the index (location) of the parent item in the restructured sitemap
      const parentIndex = restructuredSitemap.findIndex(
        item => item.slug === parent
      )

      if (parentIndex < 0) {
        // root page doesn't exist yet so add it

        restructuredSitemap.push({
          title: parentTitleMap[parent] || undefined,
          slug: parent, // we only know the slug of the parent
          children: [item],
        })

        return
      }

      restructuredSitemap[parentIndex].children.push(item)
    })

    const projectIndex = restructuredSitemap.findIndex(
      item => item.slug === "project"
    )

    // if (restructuredSitemap[projectIndex]?.children?.length) {
    //   restructuredSitemap[projectIndex].children.length =
    //     restructuredSitemap[projectIndex].children.length > 6
    //       ? 6
    //       : restructuredSitemap[projectIndex].children.length
    // }

    return restructuredSitemap
  }

  const [sitemap, setSitemap] = useState([])

  useEffect(() => {
    const structuredSitemap = restructureSitemap(sitemapNodes)

    setSitemap(structuredSitemap)
  }, [])

  return sitemap
}
