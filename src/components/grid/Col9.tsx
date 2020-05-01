import React, { FunctionComponent } from "react"
import Col from "./Col"

const Col9: FunctionComponent<any> = ({ indent, children }) => {
  return (
    <Col columns={9} indent={indent}>
      {children}
    </Col>
  )
}

export default Col9
