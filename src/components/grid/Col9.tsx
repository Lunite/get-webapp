import React, { FunctionComponent } from "react"
import Col from "./Col"

const Col9: FunctionComponent<any> = ({ indent, style, children, squidge }) => {
  return (
    <Col columns={9} indent={indent} squidge={squidge} style={style}>
      {children}
    </Col>
  )
}

export default Col9
