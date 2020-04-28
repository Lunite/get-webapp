import React, { FunctionComponent } from "react"
import { Col } from "./Col"

export const Col8: FunctionComponent = ({ children }) => {
  return <Col columns={8}>{children}</Col>
}
