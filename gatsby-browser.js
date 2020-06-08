import React from "react"

import PageWrapper from "~/components/layout/page-wrapper"

import "./src/styles/index.scss"

export const wrapPageElement = ({ element }) => {
  const context = element?.props?.pageContext

  return <PageWrapper context={context}>{element}</PageWrapper>
}
