import React, { FunctionComponent } from "react"
import { Col } from "./Col"

export const Col8: FunctionComponent<any> = ({ indent, children }) => {
  return (
    <Col columns={8} indent={indent}>
      {children}
    </Col>
  )
}
