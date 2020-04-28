import React, { FunctionComponent } from "react"
import { Col } from "./Col"

export const Col11: FunctionComponent = ({ children }) => {
  return <Col columns={11}>{children}</Col>
}
