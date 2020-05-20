import React, { FunctionComponent, useEffect, useState } from "react"
import Footer from "~/components/layout/footer"
import Navigation from "~/components/layout/navigation"
import SEO from "~/components/util/SEO"
import { useSitemap } from "~/hooks/useSitemap"
import Certificates from "~/components/standalone/Certificates"
import AOS from "aos"

import "./styles.scss"

interface PageWrapperProps {
  context: any
}

const PageWrapper: FunctionComponent<PageWrapperProps> = ({
  context,
  children,
}) => {
  const [init, setInit] = useState(false)

  useEffect(() => {
    setInit(true)
  }, [])

  /**
   * seoData
   * This method returns the required SEO data that is then passed to the SEO component below
   */
  const seoData = (() => {
    let title, slug, image

    // title and slug always come from the context
    title = context.title || ""
    slug = context.slug || ""

    if (!context?.acf?.seo) {
      // there is no extra SEO information available
      return { title, slug }
    }

    const { description, keywords } = context.acf.seo

    image = context.acf.seo?.image?.source_url

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
      <div className={`page-wrapper${init ? " page-wrapper--init" : ""}`}>
        <Navigation sitemap={useSitemap()} />
        <main>
          {children}
          <Certificates />
        </main>
        <Footer sitemap={useSitemap()} />
      </div>
    </>
  )
}

export default PageWrapper
