import React from "react"

import "./styles.scss"

const Icon = ({ alias, className = "", style = {} }) => {
  return <span className={`icon icon-${alias} ${className}`} style={style} />
}

export default Icon
