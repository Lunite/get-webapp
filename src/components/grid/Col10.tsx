import React, { FunctionComponent } from "react"
import { Col } from "./Col"

export const Col10: FunctionComponent = ({ children }) => {
  return <Col columns={10}>{children}</Col>
}
