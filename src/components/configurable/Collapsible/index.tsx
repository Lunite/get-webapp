import React, { useState } from "react"
import Icon from "~/components/olc-framework/Icon"

import "./styles.scss"

const Collapsible = ({ heading, content }) => {
  const [collapsed, setCollapsed] = useState(true)

  return (
    <div className={`collapsible ${collapsed ? "collapsible--collapsed" : ""}`}>
      <div
        className="collapsible__heading"
        onClick={() => {
          setCollapsed(!collapsed)
        }}
      >
        <span>{heading}</span>
        {collapsed ? <Icon alias="arrow-right" /> : <Icon alias="arrow-up" />}
      </div>
      {!collapsed && <div className="collapsible__content">{content}</div>}
    </div>
  )
}

export default Collapsible
