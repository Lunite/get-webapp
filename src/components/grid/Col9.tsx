import React, { FunctionComponent } from "react"
import Col from "./Col"

const Col9: FunctionComponent<any> = ({ indent, style, children }) => {
  return (
    <Col columns={9} indent={indent} style={style}>
      {children}
    </Col>
  )
}

export default Col9
