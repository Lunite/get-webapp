import React from "react"

const Icon = ({ alias, className = "", style = {} }) => {
  return <span className={`icon icon-${alias} ${className}`} style={style} />
}

export default Icon
