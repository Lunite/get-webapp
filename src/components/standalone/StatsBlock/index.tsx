import React from "react"

import "./styles.scss"

import StatsDesktop from "~/vectors/stats-desktop.inline.svg"
import StatsMobile from "~/vectors/stats-mobile.inline.svg"

import BusinessStatsDesktop from "~/vectors/stats-business-desktop.inline.svg"
import BusinessStatsMobile from "~/vectors/stats-business-mobile.inline.svg"

const StatsBlock = ({ device, business = false }) => {

  const businessStats = React.useMemo(() => {
    return device === "desktop" ? <BusinessStatsDesktop /> : <BusinessStatsMobile />;
  }, [device]);

  const domesticStats = React.useMemo(() => {
    return device === "desktop" ? <StatsDesktop /> :  <StatsMobile />;
  }, [device]);

  const stats = React.useMemo(() => {
    return business ? businessStats : domesticStats;
  }, [business, businessStats, domesticStats]);

  const className = React.useMemo(() => device === "desktop" ? "hidden-xs" : "visible-xs", [device]);

  return (
    <div className="stats" className={className}>
      {stats}
    </div>
  )
}

export default StatsBlock
