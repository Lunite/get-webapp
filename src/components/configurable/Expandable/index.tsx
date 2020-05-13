import React, { FunctionComponent, useState } from "react"
import Vector from "../Vector"

import "./styles.scss"

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
            <Vector src="thin-arrow-right-icon" />
          </>
        )}
        {!collapsed && (
          <>
            Collapse
            <Vector src="thin-arrow-up-icon" />
          </>
        )}
      </a>
    </div>
  )
}

export default Expandable
