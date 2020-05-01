import React, { FunctionComponent } from "react"
import Col from "./Col"

const Col6: FunctionComponent<any> = ({ indent, children }) => {
  return (
    <Col columns={6} indent={indent}>
      {children}
    </Col>
  )
}

export default Col6
