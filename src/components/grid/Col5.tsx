import React, { FunctionComponent } from "react"
import { Col } from "./Col"

export const Col5: FunctionComponent<any> = ({ indent, children }) => {
  return (
    <Col columns={5} indent={indent}>
      {children}
    </Col>
  )
}
