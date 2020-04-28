import React, { FunctionComponent } from "react"
import { Col } from "./Col"

export const Col12: FunctionComponent = ({ children }) => {
  return <Col columns={12}>{children}</Col>
}
