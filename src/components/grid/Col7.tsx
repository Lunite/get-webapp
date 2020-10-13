import React from "react"
import Col, { ColProps } from "./Col"

const Col7: React.FC<ColProps> = (props) => <Col {
    ...{
      ...props,
      columns: 7,
    }} 
/>;

export default Col7