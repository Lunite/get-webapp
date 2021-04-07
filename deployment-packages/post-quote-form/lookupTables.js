
module.exports.getSpecificYield = (zone, pitch, azimuth, workbook) => {
  // gets specific yield from spreadsheet
  const table = workbook.getWorksheet("MCS Irradiation Zones")
  let irradienceIdx
  let pitchIdx
  let azimuthIdx
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

// initial template for the quote results object
module.exports.getResultsTemplate = inputs => {
  return {
    totalCost: 0,
    vat: 0,
    vatRate: inputs.vat,
    yearsPayback: 0,
    annualYield: inputs.specificYield * inputs.systemSize,
    systemSize: inputs.systemSize,
    panelQuantity: inputs.panelQuantity,
    batterySize: inputs.storageSize,
    co2Savings: 0,
    projectReference: inputs.projectReference,
    postcode: inputs.postcode,
    irradienceZone: inputs.irradienceZone,
    irradiationLevel: inputs.specificYield,
    roofPitch: inputs.roofPitch,
    azimuth: inputs.azimuth,
    assumedEnergyInflation: 0,
    energyUnitCost: inputs.ppw,
    twentyYearOutlook: [],
    yearsToPayback: 0,
    item1: `Supply, Installation, Commissioning and Handover of Solar Photovoltaic System ( ${inputs.systemSize} kWdc )`,
    item2: `Supply, Installation, Commissioning and Handover of Battery Storage System ( ${inputs.storageSize} kWdc )`,
    additionalItems: inputs.additionalItems,
    address: `${inputs.houseNumber} ${inputs.street}, ${inputs.town}, ${inputs.postcode}`,
    name: inputs.name,
    email: inputs.email,
  }
}

// Gets spreadsheet inputs from formvalues (some cannot be derived, the "average" or default has been assumed)
module.exports.getInputs = (
  formValues,
  workbook,
  panelQuantity,
  storageSize
) => {
  const getDateSerial = date => {
    let returnDateTime =
      25569.0 +
      (date.getTime() - date.getTimezoneOffset() * 60 * 1000) /
        (1000 * 60 * 60 * 24)
    return returnDateTime.toString().substr(0, 5)
  }
  const getEAC = () => {
    let eac = formValues.eac
    if (eac === -1) {
      const bedToEac = [0, 0, 2500, 3500, 4650, 5000, 5250] // standard eac values for beds
      eac = bedToEac[formValues.property.bedrooms]
      eac = formValues.property.eCar ? eac + 2500 : eac
      eac = formValues.property.heater ? eac + 3000 : eac
      eac = formValues.property.pool ? eac + 3500 : eac
    }
    return eac
  }

  // calculates the max amount of panels that can be fit on a roof (1 panel = 1.5sq meters)
  const calculatePanelNumber = roofArea =>
    Math.min(Math.ceil(roofArea / 1.5) - 1, 20)

  const inputs = {
    projectReference: "",
    date: new Date().toLocaleDateString(),
    eac: getEAC(),
    ppw: formValues.ppw / 100,
    standingCharge: formValues.standingCharge / 100,
    annualCost: 0,
    panelQuantity: panelQuantity || calculatePanelNumber(formValues.roof.area),
    panelManufacturer: "Phonosolar",
    panelWattage: 310,
    systemSize: 0,
    specificYield: 0,
    annualYield: 0,
    irradienceZone: 0,
    roofPitch: formValues.roof.inclination, // will be 0, 15, 30, 40
    azimuth: Math.abs(Math.round(formValues.roof.azimuth / 5) * 5), // to nearest 5
    roofType: "Concrete",
    panels: "Blue",
    scaffold: "No",
    storageSize: storageSize || 5,
    postcodeShort: "",
    title: "Mr/s.",
    name: formValues.name,
    houseNumber: formValues.houseNumber,
    street: formValues.street,
    town: formValues.town,
    postcode: formValues.postcode,
    phone: formValues.phone,
    email: formValues.email,
    additionalItems: [],
    margin: 0.325, // 32.5%
    vat: 0.05, // 5%
    discount: formValues.discount, // special price thing
  }
  inputs.projectReference = `${getDateSerial(new Date())}${inputs.postcode}`
  inputs.annualCost = inputs.eac * inputs.ppw + inputs.standingCharge * 365
  inputs.systemSize = (inputs.panelQuantity * inputs.panelWattage) / 1000
  const [irradience, shortPc] = module.exports.getIrradienceZone(
    inputs.postcode
  )
  inputs.postcodeShort = shortPc
  inputs.irradienceZone = irradience
  inputs.specificYield = module.exports.getSpecificYield(
    irradience,
    inputs.roofPitch,
    inputs.azimuth,
    workbook
  )
  inputs.annualYield = inputs.specificYield * inputs.systemSize
  inputs.additionalItems = this.getAdditionalCosts(inputs.systemSize)
  return inputs
}

module.exports.getAdditionalCosts = systemSize => {
  const additionalItems = []
  if (systemSize > 10) {
    additionalItems.push({ "Grid Application 2": 650 })
    return additionalItems
  }
  if (systemSize > 4) {
    additionalItems.push({ "Grid Application": 160 })
    if (systemSize < 5) {
      additionalItems.push({
        "Sofar Solar 4000 HYD Hybrid Inverter": 699.5 - 92 * systemSize,
      })
    } else if (systemSize < 6) {
      additionalItems.push({
        "Sofar Solar 5000 HYD Hybrid Inverter": 764.4 - 92 * systemSize,
      })
    } else if (systemSize < 7) {
      additionalItems.push({
        "Sofar Solar 6000 HYD Hybrid Inverter": 799.68 - 92 * systemSize,
      })
    }
  }
  return additionalItems
}
