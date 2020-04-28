import React, { FunctionComponent } from "react"

interface ColProps {
  columns: number
}

export const Col: FunctionComponent<ColProps> = ({ columns, children }) => {
  return <div className={`col-${columns}`}>{children}</div>
}
