import React from "react"
import BlockCTA from "~/components/configurable/BlockCTA"

import "./styles.scss"
import Icon from "~/components/olc-framework/Icon"

interface InfoStripProps {
  location?: string
  dcPeak?: string
  developer?: string
  inverters?: string
  modules?: string
  email?: string
  phoneNumber?: string
  whereToFindUs?: string
  mapUrl?: string
  theme?: "light" | "green"
}

const InfoStrip = ({
  location,
  dcPeak,
  developer,
  inverters,
  modules,
  email,
  phoneNumber,
  whereToFindUs,
  mapUrl,
  theme = "green",
}: InfoStripProps) => {
  const iconMap = {
    location: "pin",
    dcPeak: "battery-charging",
    phoneNumber: "phone",
  }

  const getInfoItem = (alias: string, label: string, value) => {
    return (
      <div className="info-item">
        <div className="info-item__icon">
          <Icon alias={`${iconMap[alias] || alias}`} />
        </div>
        <div className="info-item__label">{label}</div>
        <div className="info-item__value">{value}</div>
      </div>
    )
  }

  return (
    <div className={`info-strip info-strip--${theme}`}>
      <div className="container">
        <div className="info-strip__items">
          {location && getInfoItem("location", "Location", location)}
          {dcPeak && getInfoItem("dcPeak", "DC Peak", dcPeak)}
          {developer && getInfoItem("developer", "Developer", developer)}
          {inverters && getInfoItem("inverters", "Inverters", inverters)}
          {modules && getInfoItem("modules", "Modules", modules)}
          {email && (
            <a className="info-item" href={`mailto:${email}`}>
              {getInfoItem("email", "Email", email)}
            </a>
          )}
          {phoneNumber && (
            <a className="info-item" href={`tel: ${phoneNumber}`}>
              {getInfoItem("phoneNumber", "Phone Number", phoneNumber)}
            </a>
          )}
          {whereToFindUs &&
            getInfoItem("whereToFindUs", "Where to find us", whereToFindUs)}
        </div>
        {mapUrl && (
          <div className="info-strip__map-button">
            <BlockCTA url={mapUrl} secondary external>
              Check on Map
              <Icon alias="location" />
            </BlockCTA>
          </div>
        )}
      </div>
    </div>
  )
}

export default InfoStrip
