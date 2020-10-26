import React from "react"
import Col, { ColProps } from "./Col"

const Col6: React.FC<ColProps> = (props) => <Col {
    ...{
      ...props,
      columns: 6,
    }} 
/>;

export default Col6;