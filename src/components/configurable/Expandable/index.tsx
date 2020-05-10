import React, { FunctionComponent } from "react"
import Vector from "../Vector"

interface ExpandableProps {
  readmore: JSX.Element
}

const Expandable: FunctionComponent<ExpandableProps> = ({
  readmore,
  children,
}) => {
  let collapsed = true

  const toggle = () => {
    collapsed = !collapsed
  }

  return (
    <div className="expandable">
      {children}
      {!collapsed && <>{readmore}</>}
      <a className="expandable__toggle" onClick={toggle}>
        {collapsed && (
          <>
            Expand
            <Vector src="thin-arrow-down-icon" />
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
