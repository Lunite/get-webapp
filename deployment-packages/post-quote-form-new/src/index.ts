import { calculateMaxPanelNumber, generateInputs, Inputs } from "./generateInputs"
import { calculateCostOfSystem, CostOfSystem } from "./costOfSystem"
import { calculateUsageAndSaving, UsageAndSaving } from "./usageAndSaving"

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
    eHeater: boolean
    pump: boolean
    hotTub: boolean
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
  isCommercial: boolean
  sales: {
    timescale: "3 Months" | "6 Months" | "12 Months" | ""
    paymentMethod: "Own Funds" | "Pay Monthly" | "Both" | ""
  }
}


interface Result {
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
    console.log("Calling Function With", formValues)
    // Here we should generate all the values by doing any look ups we need, e.g. estimated annual consumption.

    const isCommercial: boolean = !!formValues.isCommercial;
    const maxPanels = calculateMaxPanelNumber(formValues.roof.area)
    const batterySizes = isCommercial ? [2.5, 5, 7.5, 15, 20] : [2.5, 5, 7.5, 10]

    const results: Result[] = []
    for (let panelCount = 6; panelCount <= maxPanels; panelCount++) {
      for (let index = 0; index < batterySizes.length; index++) {
        const batterySize = batterySizes[index];
        const inputs: Inputs = await generateInputs(
          formValues,
          batterySize,
          panelCount,
          isCommercial
        )

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
          isCommercial
        )
        // then we should work out the usage and savings
        const usageAndSaving: UsageAndSaving[] = await calculateUsageAndSaving(
          isCommercial? cost.totalSale : cost.totalSaleIncVAT,
          inputs.priceOfElectricity, 
          inputs.shadingFactor,
          inputs.specificYield,
          inputs.systemSize,
          inputs.electricityDemand,
          inputs.annualYield,
          inputs.storageSize,
          isCommercial
        )

        results.push({inputs, cost, usageAndSaving})
      }
      
    }

    //Pick the best inputs
    let best20YearROIIndex: number = 0

    results.forEach((result, index: number) => {
      if(result.usageAndSaving[19].profits > results[best20YearROIIndex].usageAndSaving[19].profits){
        best20YearROIIndex = index
      }
    })

    res.status(200).send(results[best20YearROIIndex])
  }
}
