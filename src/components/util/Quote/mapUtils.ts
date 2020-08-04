import Geocode from "react-geocode"

Geocode.setApiKey("AIzaSyCIxU03Aoq29qJ5-KQT9F_v763fpJf0B3c")
Geocode.setLanguage("en")
Geocode.setRegion("uk")

export const fromLatLong = (lat: number, lng: number) => {
  const [slat, slng] = [lat.toString(), lng.toString()]
  return Geocode.fromLatLng(slat, slng).then(
    res => res.results[0].address_components
  )
}

export const fromAddress = address => {
  return Geocode.fromAddress(address).then(res => {
    const { lat, lng } = res.results[0].geometry.location
    return { lat, lng }
  })
}
