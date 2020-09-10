import React from "react"
import { Map, GoogleApiWrapper, Marker } from "google-maps-react"
import "./styles.scss"

interface InteractiveMapProps {
  google: any // injected auth object
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
    props.setLocation(location)
  }
  const mapOptions = {
    mapTypeControl: false,
    center: location,
    mapTypeId: "satellite",
    disableDefaultUI: true,
    zoomControl: true,
    gestureHandling: "greedy",
  }

  return (
    <Map
      google={props.google}
      center={props.location}
      initialCenter={props.location}
      // @ts-ignore
      zoom={19}
      onReady={(mapProps, map) => {
        map.setOptions(mapOptions)
        map.setOptions({
          draggableCursor:
            "url(https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2.png) 13 40, auto",
        })
      }}
      containerStyle={{
        position: "relative",
        height: "min(550px, 100vw)",
        width: "100%",
      }}
      onClick={onClickHandler}
    >
      <Marker
        // @ts-ignore
        name={"Your property"}
        position={props.location}
        animation={props.google.maps.Animation.DROP}
      />
    </Map>
  )
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCIxU03Aoq29qJ5-KQT9F_v763fpJf0B3c",
})(InteractiveMap)
