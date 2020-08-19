// fns to calculate actualy quote values
const lookup = require("./lookupTables")
const savings = require("./useageAndSavings")

exports.calculateQuote = async formValues => {
  const inputs = await lookup.getInputs(formValues)
  let result = lookup.getResultsTemplate(inputs)
  const [cost, vat] = getTotalCost(inputs)
  result.totalCost = cost
  result.vat = vat
  result = savings.getUseAndSavings(inputs, result)
  return result
}

// calculates total cost of installation
// assumed: in roof panels, 5kW battery equipment, no scaffolding,
const getTotalCost = inputs => {
  let cost = 0
  let vat = 0
  const addMarginVat = basecost => {
    let adjustedCost = basecost * (1 + inputs.margin)
    console.log("Margin", adjustedCost - basecost)
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
  // cost of 5kW battery equipment
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
  console.log("Final Cost", cost)
  cost = addMarginVat(cost)
  return [cost, vat]
}

// gets total enery savings, as well as 20 year savings + time to pay back
const getEnergySavings = (inputs, result) => {}
