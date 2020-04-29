import React, { FunctionComponent } from "react"
import { Col } from "./Col"

export const Col4: FunctionComponent<any> = ({ indent, children }) => {
  return (
    <Col columns={4} indent={indent}>
      {children}
    </Col>
  )
}
