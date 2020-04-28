import React, { FunctionComponent } from "react"
import { Col } from "./Col"

export const Col6: FunctionComponent = ({ children }) => {
  return <Col columns={6}>{children}</Col>
}
