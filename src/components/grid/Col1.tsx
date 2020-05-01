import React, { FunctionComponent } from "react"
import Col from "./Col"

const Col1: FunctionComponent<any> = ({ indent, children }) => {
  return (
    <Col columns={1} indent={indent}>
      {children}
    </Col>
  )
}

export default Col1
