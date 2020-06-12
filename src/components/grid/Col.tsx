import React, { FunctionComponent } from "react"

interface ColProps {
  columns: number
  indent?: boolean
  squidge?: boolean
  style?: object
}

const Col: FunctionComponent<ColProps> = ({
  columns,
  indent,
  squidge,
  style,
  children,
}) => {
  return (
    <div
      className={`col-${columns} ${indent ? "u-layout--indent" : ""} ${
        squidge ? "u-layout--squidge" : ""
      }`}
      style={style}
    >
      {children}
    </div>
  )
}

export default Col
