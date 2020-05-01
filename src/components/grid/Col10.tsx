import React, { FunctionComponent } from "react"
import Col from "./Col"

const Col10: FunctionComponent<any> = ({ indent, children }) => {
  return (
    <Col columns={10} indent={indent}>
      {children}
    </Col>
  )
}

export default Col10
