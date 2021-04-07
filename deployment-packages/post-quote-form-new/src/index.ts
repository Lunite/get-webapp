import { generateInputs } from "./generateInputs"

// JUST MAKE SURE TO KEEP THIS ALIGNED WITH THE UI AND WE WILL BE OKAY
export interface ReqBody {
  name: string
  email: string
  phone: string
  houseNumber: string
  street: string
  town: string
  postcode: string
  companyName: string
  roof: {
    azimuth: number
    inclination: number
    area: number
    roofMaterial: string
  }
  property: {
    bedrooms: number
    eCar: boolean
    pool: boolean
    heater: boolean
    storageHeater: boolean
    ownsHouse: string
    flat: string
    buildingType: string
  }
  commercialUsage: {
    numberOfEmployees: string
    numberOfCarParkingSpaces: string
    numberOfOffices: string
    additionalItems: {
      batteryStorage: boolean
      evChargers: boolean
      solarHeat: boolean
    }
    furtherDiscussionRequired: boolean
  }
  eac?: number
  ppw?: number
  standingCharge: number
  discount: number
  worksFromHome: string
  sales: {
    timescale: "3 Months" | "6 Months" | "12 Months" | ""
    paymentMethod: "Own Funds" | "Pay Monthly" | "Both" | ""
  }
}

exports.handler = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*")

  if (req.method === "OPTIONS") {
    console.log("Doing Preflight Checks")
    res.set("Access-Control-Allow-Methods", "POST")
    res.set("Access-Control-Allow-Headers", "Content-Type")
    res.set("Access-Control-Max-Age", "3600")
    res.status(204).send("")
  } else {
    const formValues: ReqBody = await req.body
    console.log("Calling Function With", formValues)
    // Here we should generate all the values by doing any look ups we need, e.g. estimated annual consumption.
    const inputs = await generateInputs(formValues, 3)
    console.log(inputs)

    // then we should tun the generate cost for system that i have started writing,

    // then we should work out the usage and savings

    // then we should send of the email
  }
}
