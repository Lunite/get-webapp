import React, { FunctionComponent, useState } from "react"

import "./styles.scss"
import Icon from "~/components/olc-framework/Icon"

interface ExpandableProps {
  readmore: JSX.Element
}

const Expandable: FunctionComponent<ExpandableProps> = ({ readmore }) => {
  const [collapsed, setCollapsed] = useState(true)

  const toggle = () => {
    setCollapsed(!collapsed)
  }

  return (
    <div className="expandable">
      {!collapsed && <>{readmore}</>}
      <a className="expandable__toggle" onClick={toggle}>
        {collapsed && (
          <>
            Expand for more information
            <Icon alias="thin-arrow-right" />
          </>
        )}
        {!collapsed && (
          <>
            Collapse
            <Icon alias="thin-arrow-up" />
          </>
        )}
      </a>
    </div>
  )
}

export default Expandable
