// fns to calculate actualy quote values
const ex = require("exceljs")
const lookup = require("./lookupTables")

exports.calculateQuote = async formValues => {
  const inputs = getInputs(formValues)
  let result = getResultsTemplate(inputs)
  const [cost, vat] = getTotalCost(inputs)
  result.totalCost = cost
  result.vat = vat
  result = getEnergySavings(inputs, result)
  // console.log(result)
  return result
}

// calculates total cost of installation
// assumed: in roof panels, 5kW battery equipment, no scaffolding,
const getTotalCost = inputs => {
  let cost = 0
  let vat = 0
  const addMarginVat = basecost => {
    let adjustedCost = basecost + inputs.margin * basecost
    let lvat = adjustedCost * inputs.vat
    vat += lvat
    adjustedCost += lvat
    return adjustedCost
  }
  // cost of in roof solar panels (concrete)
  cost = addMarginVat(75.99 * inputs.panelQuantity)
  // cost of ancillary materials
  cost += addMarginVat(40 * inputs.systemSize)
  // cost of blue solar modules
  cost += addMarginVat(210 * inputs.systemSize)
  // cost of inverter
  cost += addMarginVat(92 * inputs.systemSize)
  // cost of metering equipment
  cost += addMarginVat(120.5)
  // cost of 5kW battery equipment
  cost += addMarginVat(1330)
  // labour cost
  cost += addMarginVat(160 * inputs.systemSize)
  // HS & project management
  cost += addMarginVat(50)
  // commissioning
  cost += addMarginVat(50)
  // packaging and delivery
  cost += addMarginVat(150)
  // admin fees
  cost += addMarginVat(500)
  // registrations
  cost += addMarginVat(105)
  if (inputs.discount) {
    cost += 600 // DWMSpecialPrice "discount"
  }
  return [cost.toFixed(2), vat.toFixed(2)]
}

// gets total enery savings, as well as 20 year savings + time to pay back
const getEnergySavings = (inputs, result) => {}

// initial template for the quote results object
const getResultsTemplate = inputs => {
  return {
    totalCost: 0,
    vat: 0,
    yearsPayback: 0,
    systemSize: 0,
    panelQuantity: inputs.panelQuantity,
    batterySize: inputs.storageSize,
    gridUseage: [],
    solarGeneration: [],
    solarToGrid: [],
    solarHomeUse: [],
    gridUse: [],
    solarToGridBattery: [],
    solarToHomeBattery: [],
    gridUseSolarBattery: [],
    predictedOutput: 0,
    assumedInflation: 0,
    onsiteEnergyConsumption: 0,
    co2Savings: 0,
    co2Savings20years: 0,
    projectReference: inputs.projectReference,
    postcode: inputs.postcode,
    irradienceZone: inputs.irradienceZone,
    irradiationLevel: 0,
    roofPitch: inputs.roofPitch,
    azimuth: inputs.azimuth,
    assumedEnergyInflation: 0,
    energyUnitCost: 0,
    twentyYearOutlook: [],
    item1: `Supply, Installation, Commissioning and Handover of Solar Photovoltaic System ( ${inputs.systemSize} kWdc )`,
    item2: `Supply, Installation, Commissioning and Handover of Battery Storage System ( ${inputs.storageSize} kWdc )`,
    address: `${inputs.houseNumber} ${inputs.street}, ${inputs.town}, ${inputs.postcode}`,
    name: inputs.name,
  }
}

const getSpecificYield = async (zone, pitch, azimuth) => {
  const workbook = new ex.Workbook()
  await workbook.xlsx.readFile("./spreadsheet.xlsx")
  const table = workbook.getWorksheet("MCS Irradiation Zones")
  let irradienceIdx
  let pitchIdx
  let azimuthIdx
  console.log(zone, pitch, azimuth)
  table.eachRow((row, rowNum) => {
    if (!irradienceIdx) {
      if (row.getCell(1).value == zone) {
        irradienceIdx = rowNum
      }
    } else if (!pitchIdx) {
      if (row.getCell(2).value == pitch) {
        pitchIdx = rowNum
      }
    }
  })
  const azRow = table.getRow(2)
  azRow.eachCell((cell, idx) => {
    if (!azimuthIdx) {
      if (cell.value == azimuth) {
        azimuthIdx = idx
      }
    }
  })
  return table.getCell(pitchIdx, azimuthIdx).value
}

// Gets spreadsheet inputs from formvalues (some cannot be derived, the "average" or default has been assumed)
const getInputs = formValues => {
  const getDateSerial = date => {
    let returnDateTime =
      25569.0 +
      (date.getTime() - date.getTimezoneOffset() * 60 * 1000) /
        (1000 * 60 * 60 * 24)
    return returnDateTime.toString().substr(0, 5)
  }
  const inputs = {
    projectReference: "",
    date: new Date().toLocaleDateString(),
    eac: formValues.eac,
    ppw: formValues.ppw,
    standingCharge: formValues.standingCharge,
    annualCost: 0,
    panelQuantity: 10,
    panelManufacturer: "Phonosolar",
    panelWattage: 275,
    systemSize: 0,
    specificYield: 0,
    annualYield: 0,
    irradienceZone: 0,
    roofPitch: formValues.roof.inclination, // will be 0, 15, 30, 40
    azimuth: Math.round(formValues.roof.azimuth / 5) * 5, // to nearest 5
    roofType: "In Roof",
    panels: "Blue",
    scaffold: "No",
    storageSize: 5,
    postcodeShort: "",
    title: "Mr/s.",
    name: formValues.name,
    houseNumber: formValues.houseNumber,
    street: formValues.street,
    town: formValues.town,
    postcode: formValues.postcode,
    phone: formValues.phone,
    margin: 0.33, // 33%
    vat: 0.05, // 5%
    discount: formValues.discount ? 0.1 : 0, // discount 10% campaign
  }
  inputs.projectReference = `${getDateSerial(new Date())}${inputs.postcode}`
  inputs.annualCost = inputs.eac * inputs.ppw + inputs.standingCharge * 365
  inputs.systemSize = (inputs.panelQuantity * inputs.panelWattage) / 1000
  const [irradience, shortPc] = lookup.getIrradienceZone(inputs.postcode)
  inputs.postcodeShort = shortPc
  inputs.irradienceZone = irradience
  inputs.specificYield = getSpecificYield(
    irradience,
    inputs.roofPitch,
    inputs.azimuth
  )
  inputs.annualYield = inputs.specificYield * inputs.systemSize
  console.log(inputs)
  return inputs
}
