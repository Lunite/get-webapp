import Geocode from "react-geocode"

Geocode.setApiKey("AIzaSyBvygyMuD_sGIRFRKoHxAr5lwPdVomn_dc")
Geocode.setLanguage("en")
Geocode.setRegion("uk")

export const fromLatLong = (lat: number, lng: number) => {
  const [slat, slng] = [lat.toString(), lng.toString()]
  return Geocode.fromLatLng(slat, slng)
    .then(res => res.results[0].address_components)
    .catch(err => {
      console.debug(err)
    })
}

export const fromAddress = address => {
  return Geocode.fromAddress(address)
    .then(res => {
      const { lat, lng } = res.results[0].geometry.location
      return { lat, lng }
    })
    .catch(err => {
      console.debug(err)
    })
}
