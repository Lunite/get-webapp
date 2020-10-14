import React from "react"
import Col, { ColProps } from "./Col"

const Col11: React.FC<ColProps> = (props) => <Col {
    ...{
      ...props,
      columns: 11,
    }} 
/>;

export default Col11
