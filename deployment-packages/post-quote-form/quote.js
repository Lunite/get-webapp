// fns to calculate actualy quote values
const lookup = require("./lookupTables")
const savings = require("./useageAndSavings")

exports.calculateQuote = async formValues => {
  const inputs = await lookup.getInputs(formValues)
  console.log("Using Inputs", inputs)
  let results = []
  let ps = [0, 2.5, 5, 7.5, 10].map(async size => {
    const localInput = { ...inputs, storageSize: size } // deep copy to avoid referencing outside of async code
    let tResult = lookup.getResultsTemplate(localInput)
    const [cost, vat] = getTotalCost(localInput)
    tResult.totalCost = cost
    tResult.vat = vat
    tResult = await savings.getUseAndSavings(localInput, tResult)
    results.push(tResult)
  })
  await Promise.all(ps)
  let bestRoi = results[0].twentyYearOutlook[19].roi
  let result = results[0]
  results.forEach(r => {
    if (r.twentyYearOutlook[19].roi > bestRoi) {
      bestRoi = r.twentyYearOutlook[19].roi
      result = r
    }
  })
  let set = false
  result.twentyYearOutlook.forEach((y, i) => {
    result.co2Savings = result.co2Savings + (0.517 * y.solarGeneration) / 1000
    if (!set && y.roi > 0) {
      result.yearsToPayback = i + 1
      set = true
    }
  })
  return result
}

// calculates total cost of installation
// assumed: in roof panels, 5kW battery equipment, no scaffolding,
const getTotalCost = inputs => {
  let cost = 0
  let vat = 0
  const addMarginVat = basecost => {
    let adjustedCost = basecost * (1 + inputs.margin)
    let lvat = adjustedCost * inputs.vat
    lvat = Math.round((lvat + Number.EPSILON) * 100) / 100
    vat += lvat
    adjustedCost += lvat
    adjustedCost = Math.round((adjustedCost + Number.EPSILON) * 100) / 100
    return adjustedCost
  }
  // cost of in roof solar panels (concrete)
  cost = 75.59 * inputs.systemSize
  // cost of ancillary materials
  cost += 40 * inputs.systemSize
  // cost of blue solar modules
  cost += 210 * inputs.systemSize
  // cost of inverter
  cost += 92 * inputs.systemSize
  // cost of metering equipment
  cost += 120.5
  // cost of battery equipment
  switch (inputs.storageSize) {
    case 2.5:
      cost += 850
      break
    case 5:
      cost += 1330
      break
    case 7.5:
      cost += 1850
      break
    case 10:
      cost += 2330
      break
    default:
      break
  }
  cost += 1330
  // labour cost
  cost += 160 * inputs.systemSize
  // HS & project management
  cost += 50
  // commissioning
  cost += 50
  // packaging and delivery
  cost += 150
  // admin fees
  cost += 500
  // registrations
  cost += 105
  const additionalCosts = inputs.additionalItems.map(item => {
    return Object.values(item)[0]
  })
  additionalCosts.forEach(c => {
    cost += c
  })
  if (inputs.discount) {
    cost += 600 // DWMSpecialPrice "discount"
  }
  cost = addMarginVat(cost)
  return [cost, vat]
}
