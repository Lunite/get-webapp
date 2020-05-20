import React, { FunctionComponent, useEffect } from "react"
import AOS from "aos"

import "./styles.scss"

const Section: FunctionComponent<any> = ({ className = "", children }) => {
  useEffect(() => {
    AOS.init({
      duration: "4000",
      easing: "ease",
    })
  }, [])

  return (
    <div className={`section ${className}`} data-aos="fade-up">
      <div className="container container--column">{children}</div>
    </div>
  )
}

export default Section
