import React, { useState } from "react"
import Icon from "~/components/olc-framework/Icon"

const Collapsible = ({ heading, content }) => {
  const [collapsed, setCollapsed] = useState(true)

  return (
    <div className="collapsible">
      <div
        className="collapsible__heading"
        onClick={() => {
          setCollapsed(!collapsed)
        }}
      >
        <span>{heading}</span>
        {collapsed ? <Icon alias="arrow-right" /> : <Icon alias="arrow-up" />}
      </div>
      {!collapsed && (
        <div
          className="collapsible__content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </div>
  )
}

export default Collapsible
