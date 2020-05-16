import React from "react"

import "./styles.scss"

const Icon = ({ alias }) => {
  return <span className={`icon icon-${alias}`} />
}

export default Icon
