import React, { FunctionComponent } from "react"
import Footer from "~/components/layout/footer"
import Navigation from "~/components/layout/navigation"
import SEO from "~/components/util/SEO"

interface PageWrapperProps {
  context: any
}

const PageWrapper: FunctionComponent<PageWrapperProps> = ({
  context,
  children,
}) => {
  return (
    <>
      <SEO {...context} />
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default PageWrapper
