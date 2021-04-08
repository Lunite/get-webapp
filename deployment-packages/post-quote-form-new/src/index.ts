import { generateInputs } from "./generateInputs"
import { calculateCostOfSystem } from "./costOfSystem"
import { calculateUsageAndSaving } from "./usageAndSaving"


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
    const inputs = await generateInputs(formValues, 5, true)
    console.log(inputs)

    // then we should run the generate cost for system that i have started writing,
    const cost = calculateCostOfSystem(inputs.systemSize, inputs.roofType, inputs.scaffoldRequired, inputs.storageSize, inputs.quantityOfPanels, inputs.panels, inputs.finalMargin, inputs.VATLevel, true)
    // then we should work out the usage and savings
    const usageAndSaving = await calculateUsageAndSaving(cost.totalSaleIncVAT, inputs.priceOfElectricity, inputs.shadingFactor, inputs.specificYield, inputs.systemSize, inputs.electricityDemand, inputs.annualYield, inputs.storageSize, true)
    // then we should send of the email
    console.log(cost, usageAndSaving)
    res.status(200).send("")
  }
}
