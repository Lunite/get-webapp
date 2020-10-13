import React, { FunctionComponent } from "react"

export interface ColProps {
  columns?: number
  indent?: boolean
  squidge?: boolean
  style?: object
  className?: string
}

const Col: FunctionComponent<ColProps> = ({
  columns,
  indent,
  squidge,
  style,
  children,
  className,
}) => {
  return (
    <div
      className={`col-${columns} ${indent ? "u-layout--indent" : ""} ${
        squidge ? "u-layout--squidge" : ""
      } ${className || ""}`}
      style={style}
    >
      {children}
    </div>
  )
}

export default Col
