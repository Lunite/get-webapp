import { generateInputs, Inputs } from "./generateInputs"
import { calculateCostOfSystem, CostOfSystem } from "./costOfSystem"
import { calculateUsageAndSaving, UsageAndSaving } from "./usageAndSaving"
import * as ex from "exceljs"
import emailQuote from "./emailQuote"

// JUST MAKE SURE TO KEEP THIS ALIGNED WITH THE UI AND WE WILL BE OKAY
export interface ReqBody {
  name: string
  email: string
  phone: string
  houseNumber: string
  street: string
  town: string
  postcode: string
  location: {
    lat: number
    lng: number
  }
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
    eHeater: boolean
    pump: boolean
    hotTub: boolean
    ownsHouse: string
    flat: string
    buildingType: string
    houseType: string
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
  isCommercial: boolean
  sales: {
    timescale: "3 Months" | "6 Months" | "12 Months" | ""
    paymentMethod: "Own Funds" | "Pay Monthly" | "Both" | ""
  }
}

export interface Result {
  inputs: Inputs
  cost: CostOfSystem
  usageAndSaving: UsageAndSaving[]
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
    const workbook: ex.Workbook = new ex.Workbook()
    await workbook.xlsx.readFile("./new-spreadsheet.xlsx")
    console.log("Calling Function With", formValues)

    const isCommercial: boolean = !!formValues.isCommercial

    const profileWorksheet = workbook.getWorksheet("Profile")

    const inputs: Inputs = generateInputs(formValues, workbook, isCommercial)

    // then we should run the generate cost for system that i have started writing,
    const cost: CostOfSystem = calculateCostOfSystem(
      inputs.systemSize,
      inputs.roofType,
      inputs.scaffoldRequired,
      inputs.storageSize,
      inputs.quantityOfPanels,
      inputs.panels,
      inputs.finalMargin,
      inputs.VATLevel,
      Object.values(inputs.additionalItems),
      isCommercial
    )

    // then we should work out the usage and savings based on the non inflated margin
    const usageAndSaving: UsageAndSaving[] = calculateUsageAndSaving(
      isCommercial ? cost.totalSale : cost.totalSaleIncVAT,
      inputs.priceOfElectricity,
      inputs.shadingFactor,
      inputs.specificYield,
      inputs.systemSize,
      inputs.electricityDemand,
      inputs.annualYield,
      inputs.storageSize,
      inputs.standingCharge,
      profileWorksheet,
      isCommercial
    )

    //Pick the best inputs

    await emailQuote(formValues, { inputs, cost, usageAndSaving })
    res.status(200).send({
      name: formValues.name,
      email: formValues.email,
      inputs,
      cost,
      usageAndSaving,
    })
  }
}
