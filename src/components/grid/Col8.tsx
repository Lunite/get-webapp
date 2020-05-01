import React, { FunctionComponent } from "react"
import Col from "./Col"

const Col8: FunctionComponent<any> = ({ indent, children }) => {
  return (
    <Col columns={8} indent={indent}>
      {children}
    </Col>
  )
}

export default Col8
