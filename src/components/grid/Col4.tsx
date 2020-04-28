import React, { FunctionComponent } from "react"
import { Col } from "./Col"

export const Col4: FunctionComponent = ({ children }) => {
  return <Col columns={4}>{children}</Col>
}
