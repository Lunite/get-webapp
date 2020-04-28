import React, { FunctionComponent } from "react"
import { Col } from "./Col"

export const Col5: FunctionComponent = ({ children }) => {
  return <Col columns={5}>{children}</Col>
}
