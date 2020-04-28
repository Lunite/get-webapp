import React, { FunctionComponent } from "react"
import { Col } from "./Col"

export const Col7: FunctionComponent = ({ children }) => {
  return <Col columns={7}>{children}</Col>
}
