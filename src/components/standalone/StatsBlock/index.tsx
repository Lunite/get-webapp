import React from "react"

import "./styles.scss"

import StatsDesktop from "~/vectors/stats-desktop.inline.svg"
import StatsMobile from "~/vectors/stats-mobile.inline.svg"

// import BusinessStatsDesktop from "~/vectors/business-stats-desktop.inline.svg"
// import BusinessStatsMobile from "~/vectors/business-stats-mobile.inline-svg"

const StatsBlock = ({ business = false }) => {
  return (
    <div className="stats">
      {(() => {
        if (!business) {
          return (
            <>
              <div className="hidden-xs">
                <StatsDesktop />
              </div>
              <div className="visible-xs">
                <StatsMobile />
              </div>
            </>
          )
        }

        // return (
        //   <>
        //     <div className="hidden-xs">
        //       <BusinessStatsDesktop />
        //     </div>
        //     <div className="visible-xs">
        //       <BusinessStatsMobile />
        //     </div>
        //   </>
        // )
      })()}
    </div>
  )
}

export default StatsBlock
