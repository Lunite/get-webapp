import React, { FunctionComponent } from "react"
import { Col } from "./Col"

export const Col2: FunctionComponent = ({ children }) => {
  return <Col columns={2}>{children}</Col>
}
