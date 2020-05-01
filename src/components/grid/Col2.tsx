import React, { FunctionComponent } from "react"
import Col from "./Col"

export const Col2: FunctionComponent<any> = ({ indent, children }) => {
  return (
    <Col columns={2} indent={indent}>
      {children}
    </Col>
  )
}
