import React from "react"

import "./styles.scss"

const StatsBlock = ({ business = false }) => {
  return (
    <div className="stats">
      {(() => {
        if (!business) {
          return <img src="/images/stats-block.png" />
        }

        return <img src="/images/stats-block-business.png" />
      })()}
    </div>
  )
}

export default StatsBlock
