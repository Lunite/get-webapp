import React from "react"

import StatsDesktop from "~/vectors/stats-desktop.inline.svg"
import StatsMobile from "~/vectors/stats-mobile.inline.svg"

import BusinessStatsDesktop from "~/vectors/stats-business-desktop.inline.svg"
import BusinessStatsMobile from "~/vectors/stats-business-mobile.inline.svg"

const StatsBlock = ({ device, business = false }) => {
  return (
    <div className="stats">
      {
        (() => {
          if (!business) {
            return (
              <>
                {device === "desktop" && (
                  <div className="hidden-xs">
                    <StatsDesktop />
                  </div>
                )}
                {device === "mobile" && (
                  <div className="visible-xs">
                    <StatsMobile />
                  </div>
                )}
              </>
            )
          }

          return (
            <>
              {device === "desktop" && (
                <div className="hidden-xs">
                  <BusinessStatsDesktop />
                </div>
              )}
              {device === "mobile" && (
                <div className="visible-xs">
                  <BusinessStatsMobile />
                </div>
              )}
            </>
          )
        })() // only run once
      }
    </div>
  )
}

export default StatsBlock
