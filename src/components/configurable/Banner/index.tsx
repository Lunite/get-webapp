import React, { FunctionComponent } from "React"

import "./styles.scss"

const Banner: FunctionComponent<any> = ({ className, children }) => {
  return <div className={`banner ${className}`}>{children}</div>
}

export default Banner
