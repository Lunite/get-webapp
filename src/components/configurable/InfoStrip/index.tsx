import React from "react"
import { BlockCTA } from "../BlockCTA"
import { Vector } from "../Vector"

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
}

export const InfoStrip = ({
  location,
  dcPeak,
  developer,
  inverters,
  modules,
  email,
  phoneNumber,
  whereToFindUs,
  mapUrl,
}: InfoStripProps) => {
  const getInfoItem = (alias: string, label: string, value) => {
    return (
      <div className="info-item">
        <div className="info-item__icon">
          <Vector src={`info-${alias}-icon`} />
        </div>
        <div className="info-item__label">{label}</div>
        <div className="info-item__value">{value}</div>
      </div>
    )
  }

  return (
    <div className="info-strip">
      <div className="info-strip__items">
        {location && getInfoItem("location", "Location", location)}
        {dcPeak && getInfoItem("dcPeak", "DC Peak", dcPeak)}
        {developer && getInfoItem("developer", "Developer", developer)}
        {inverters && getInfoItem("inverters", "Inverters", inverters)}
        {modules && getInfoItem("modules", "Modules", modules)}
        {email && getInfoItem("email", "Email", email)}
        {phoneNumber && getInfoItem("phoneNumber", "Phone Number", phoneNumber)}
        {whereToFindUs &&
          getInfoItem("whereToFindUs", "Where to find us", whereToFindUs)}
      </div>
      {mapUrl && <BlockCTA url={mapUrl}>Check on Map</BlockCTA>}
    </div>
  )
}
