import React from "react"

import "./styles.scss"

const Icon = ({ alias, className = "" }) => {
  return <span className={`icon icon-${alias} ${className}`} />
}

export default Icon
