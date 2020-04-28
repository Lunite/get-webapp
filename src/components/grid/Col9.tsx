import React, { FunctionComponent } from "react"
import { Col } from "./Col"

export const Col9: FunctionComponent = ({ children }) => {
  return <Col columns={9}>{children}</Col>
}
