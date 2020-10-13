import React from "react"
import Col, { ColProps } from "./Col"

const Col5: React.FC<ColProps> = (props) => <Col {
    ...{
      ...props,
      columns: 5,
    }} 
/>;

export default Col5
