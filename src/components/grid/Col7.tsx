import React, { FunctionComponent } from "react"
import Col from "./Col"

const Col7: FunctionComponent<any> = ({ indent, children }) => {
  return (
    <Col columns={7} indent={indent}>
      {children}
    </Col>
  )
}

export default Col7
