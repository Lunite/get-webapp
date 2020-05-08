import React, { FunctionComponent } from "react"

const Page: FunctionComponent<any> = context => {
  const { content } = context.pageContext

  return <>{content}</>
}

export default Page
