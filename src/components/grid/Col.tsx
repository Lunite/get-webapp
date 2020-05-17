import React, { FunctionComponent } from "react"

interface ColProps {
  columns: number
  indent?: boolean
  style?: object
}

const Col: FunctionComponent<ColProps> = ({
  columns,
  indent,
  style,
  children,
}) => {
  return (
    <div
      className={`col-${columns} ${indent ? "u-layout--indent" : ""}`}
      style={style}
    >
      {children}
    </div>
  )
}

export default Col
