import React from "react"
import { Map, GoogleApiWrapper, Marker } from "google-maps-react"
import "./styles.scss"

interface InteractiveMapProps {
  google: any
  location: {
    lat: number
    lng: number
  }
  setLocation: React.Dispatch<
    React.SetStateAction<{
      lat: number
      lng: number
    }>
  >
}

const InteractiveMap: React.FC<InteractiveMapProps> = props => {
  const onClickHandler = (mapProps, map, clickEvent) => {
    const location = {
      lat: clickEvent.latLng.lat(),
      lng: clickEvent.latLng.lng(),
    }
    console.log(location)
    props.setLocation(location)
  }
  const mapOptions = {
    mapTypeControl: false,
    center: location,
    mapTypeId: "satellite",
    disableDefaultUI: true,
  }

  // TODO Add styling to make cursor on map a PIN not a HAND

  return (
    <Map
      google={props.google}
      initialCenter={props.location}
      // @ts-ignore
      zoom={20}
      onReady={(mapProps, map) => {
        map.setOptions(mapOptions)
      }}
      containerStyle={{
        position: "relative",
        height: "550px",
        width: "100%",
      }}
      onClick={onClickHandler}
    >
      <Marker
        // @ts-ignore
        name={"Your property"}
        position={props.location}
      />
    </Map>
  )
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCIxU03Aoq29qJ5-KQT9F_v763fpJf0B3c",
})(InteractiveMap)
