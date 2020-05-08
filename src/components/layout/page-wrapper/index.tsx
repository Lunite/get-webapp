import React, { FunctionComponent } from "react"
import Footer from "~/components/layout/footer"
import Navigation from "~/components/layout/navigation"
import SEO from "~/components/util/SEO"
import { useSitemap } from "~/hooks/useSitemap"

interface PageWrapperProps {
  context: any
}

const PageWrapper: FunctionComponent<PageWrapperProps> = ({
  context,
  children,
}) => {
  /**
   * seoData
   * This method returns the required SEO data that is then passed to the SEO component below
   */
  const seoData = (() => {
    let title, slug, description, keywords, image

    // title and slug always come from the context
    title = context.title || ""
    slug = context.slug || ""

    if (!context?.acf?.post_type) {
      // the type of post is unknown so the other bits of data aren't available
      return { title, slug }
    }

    // this line is instead of needed if else if else blah blah
    const ptAlias = context.acf.post_type.toLowerCase()

    // ptAlias is put here instead of doing context.acf.project.description as an example
    description = context.acf[ptAlias]?.description
    keywords = context.acf[ptAlias]?.keywords
    image = context.acf[ptAlias]?.image?.source_url

    if (ptAlias === "service") {
      // in this scenario, the image comes from a different place
      image = context.acf?.service?.block_1_image_1?.source_url
    }

    return {
      title,
      slug,
      description,
      keywords,
      image,
    }
  })()

  return (
    <>
      <SEO {...seoData} />
      <Navigation sitemap={useSitemap()} />
      <main>{children}</main>
      <Footer sitemap={useSitemap()} />
    </>
  )
}

export default PageWrapper
