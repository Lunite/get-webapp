import React, { FunctionComponent } from "react"
import Col from "./Col"

const Col4: FunctionComponent<any> = ({ indent, children, className }) => {
  return (
    <Col columns={4} indent={indent} className={className}>
      {children}
    </Col>
  )
}

export default Col4
