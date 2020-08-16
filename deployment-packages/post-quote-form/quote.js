// fns to calculate actualy quote values
const ex = require("exceljs")
const lookup = require("./lookupTables")

exports.calculateQuote = async formValues => {
  const inputs = getInputs(formValues)
  const result = getResultsTemplate(inputs)
  return result
}

// initial template for the quote results object
const getResultsTemplate = inputs => {
  return {
    totalCost: 0,
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
    address: `${inputs.houseNumber} ${inputs.street}, ${inputs.town}, ${inputs.postcode}`,
    assumedEnergyInflation: 0,
    energyUnitCost: 0,
    twentyYearOutlook: [],
  }
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
    panelWattage: 270,
    systemSize: 0,
    specificYield: 1500,
    annualYield: 0,
    irradienceZone: 0,
    roofPitch: formValues.roof.inclination,
    azimuth: formValues.roof.azimuth,
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
  inputs.annualYield = inputs.specificYield * inputs.systemSize
  const [irradience, shortPc] = lookup.getIrradienceZone(inputs.postcode)
  inputs.postcodeShort = shortPc
  inputs.irradienceZone = irradience
  console.log(inputs)
  return inputs
}
