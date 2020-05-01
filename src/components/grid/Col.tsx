import React, { FunctionComponent } from "react"

interface ColProps {
  columns: number
  indent?: boolean
}

const Col: FunctionComponent<ColProps> = ({ columns, indent, children }) => {
  return (
    <div className={`col-${columns} ${indent ? "u-layout--indent" : ""}`}>
      {children}
    </div>
  )
}

export default Col
