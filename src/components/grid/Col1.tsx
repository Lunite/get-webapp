import React, { FunctionComponent } from "react"
import { Col } from "./Col"

export const Col1: FunctionComponent = ({ children }) => {
  return <Col columns={1}>{children}</Col>
}
