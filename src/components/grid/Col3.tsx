import React, { FunctionComponent } from "react"
import Col from "./Col"

const Col3: FunctionComponent<any> = ({ indent, children }) => {
  return (
    <Col columns={3} indent={indent}>
      {children}
    </Col>
  )
}

export default Col3
