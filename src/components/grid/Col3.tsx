import React, { FunctionComponent } from "react"
import { Col } from "./Col"

export const Col3: FunctionComponent = ({ children }) => {
  return <Col columns={3}>{children}</Col>
}
