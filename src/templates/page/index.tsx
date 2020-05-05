import React, { FunctionComponent } from "react"
import PageWrapper from "~/components/layout/page-wrapper"

const Page: FunctionComponent<any> = context => {
  const { title, content, acf, slug } = context.pageContext

  return <>{content}</>
}

export default Page
