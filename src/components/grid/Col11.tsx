import React, { FunctionComponent } from "react"
import { Col } from "./Col"

export const Col11: FunctionComponent<any> = ({ indent, children }) => {
  return (
    <Col columns={11} indent={indent}>
      {children}
    </Col>
  )
}
