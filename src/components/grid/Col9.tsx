import React, { FunctionComponent } from "react"
import { Col } from "./Col"

export const Col9: FunctionComponent<any> = ({ indent, children }) => {
  return (
    <Col columns={9} indent={indent}>
      {children}
    </Col>
  )
}
