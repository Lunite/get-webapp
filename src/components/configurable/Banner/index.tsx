import React, { FunctionComponent } from "react"

const Banner: FunctionComponent<any> = ({ className, children }) => {
  return <div className={`banner ${className}`}>{children}</div>
}

export default Banner
