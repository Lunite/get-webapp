import React, { FunctionComponent } from "react"
import { Footer } from "../footer"
import { Navigation } from "../navigation"
import { SEO } from "../../util/SEO"

interface PageWrapperProps {
  context: any
}

export const PageWrapper: FunctionComponent<PageWrapperProps> = ({
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
