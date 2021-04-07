export const calculateCostOfSystem = (
  solarKw: number,
  roofType: any,
  scaffoldRequired: boolean,
  batterySize: any,
  panelQuantity: any,
  panelType: any,
  margin: number,
  vatRate: number,
  isCommercial: boolean
) => {
  let runningTotal = 0
  // cost of the roof type
  runningTotal = +calculateRoofCost(solarKw, roofType, panelQuantity)
  // cost of ancillary materials
  runningTotal = +calculateAncillaryMaterialsCost(solarKw, isCommercial)
  // cost of solar module color
  runningTotal = +calculateSolarModuleColorCost(panelType, solarKw)
  // cost of inverter
  runningTotal = +calculateInverterCost(solarKw, isCommercial)
  // cost of metering equipment
  runningTotal = +120
  // cost of battery equipment
  runningTotal = +calculateBatteryCost(batterySize)
  // labor cost
  runningTotal = +calculateLabourCost(solarKw, isCommercial)
  // scaffold cost
  runningTotal = + scaffoldRequired ? calculateScaffolding(isCommercial, solarKw) : 0
  // H&S and proj management cost
  runningTotal = +isCommercial ? 50 : 0
  // Commissioning
  runningTotal = +isCommercial ? 50 : 0
  // Packaging and Delivery
  runningTotal = +150
  // Administration / Lead Fees
  runningTotal = +isCommercial ? 250 : 137.93
  // Registrations
  runningTotal = +isCommercial ? 205 : 169

  // Calculate Margin
  const marginCost = runningTotal * margin

  // Calculate Total Sale
  const totalSale = runningTotal + marginCost

  // Calculate Pence / W
  const pencePerWatt = totalSale / (solarKw * 1000)

  // Calculate VAT
  const vat = totalSale * vatRate
  // Calculate Total Sale Inc VAT

  const totalSaleIncVAT = totalSale + vat

  //Return nice looking object that we can pick values out of in the rest of the code.
  return {
    totalSale,
    totalSaleIncVAT,
    vat,
    pencePerWatt,
    marginCost,
  }
}

const calculateRoofCost = (solarKW: number, roofType: string | number, panelQuantity: number): number => {
  const roofTypeCostPerKW = {
    concreteRoof: 75.59 * solarKW,
    slateRoof: 90.59 * solarKW,
    rosemary: 90.59 * solarKW,
    flatRoof: 125.0 * solarKW,
    trapezoidal: 25 * solarKW,
    groundMounted: 130 * solarKW,
    inRoof: 60 * panelQuantity, // This needs checking as its what the spreadsheet does
    dekra: 80.59 * solarKW,
  }
  return roofTypeCostPerKW[roofType]
}

const calculateAncillaryMaterialsCost = (solarKW: number, isCommercial: boolean): number => {
  const costPerKW = isCommercial ? 30 : 40
  return solarKW * costPerKW
}

const calculateSolarModuleColorCost = (color: string | number, solarKW: number): number => {
  const moduleColorPerKW = {
    black: 210 * solarKW,
    blue: 240 * solarKW,
  }
  return moduleColorPerKW[color]
}

const calculateInverterCost = (solarKW: number, isCommercial: boolean): number => {
  const costPerKW = isCommercial ? 45 : 92
  return solarKW * costPerKW
}

const calculateBatteryCost = (size: string | number): number => {
  const batteryCostBySize = {
    "3KW": 850,
    "5KW": 1330,
    "7.5KW": 1850,
    "10kw": 2330,
    "15KW": 3220,
    "20KW": 4130,
  }
  return batteryCostBySize[size]
}

const calculateLabourCost = (solarKW: number, isCommercial: boolean): number => {
  const costPerKW = isCommercial ? 90 : 160
  return solarKW * costPerKW
}

const calculateScaffolding = (isCommercial: boolean, solarKw: number) => {
  return isCommercial ? 40 * solarKw : 500
}
