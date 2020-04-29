import React, { FunctionComponent } from "react"
import { Col } from "./Col"

export const Col12: FunctionComponent<any> = ({ indent, children }) => {
  return (
    <Col columns={12} indent={indent}>
      {children}
    </Col>
  )
}
