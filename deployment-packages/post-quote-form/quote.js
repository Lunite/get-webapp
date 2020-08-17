// fns to calculate actualy quote values
const lookup = require("./lookupTables")

exports.calculateQuote = async formValues => {
  const inputs = await lookup.getInputs(formValues)
  let result = lookup.getResultsTemplate(inputs)
  const [cost, vat] = getTotalCost(inputs)
  result.totalCost = cost
  result.vat = vat
  result.additionalItems = inputs.additionalItems
  // result = getEnergySavings(inputs, result)
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
    adjustedCost = Number(adjustedCost.toFixed(2))
    console.log(adjustedCost)
    return adjustedCost
  }
  // cost of in roof solar panels (concrete)
  cost = addMarginVat(75.59 * inputs.systemSize)
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
  const additionalCosts = inputs.additionalItems.map(item => {
    console.log(item)
    return Object.values(item)[0]
  })
  additionalCosts.forEach(c => {
    cost += addMarginVat(c)
  })
  if (inputs.discount) {
    cost += 600 // DWMSpecialPrice "discount"
  }
  return [cost.toFixed(2), vat.toFixed(2)]
}

// gets total enery savings, as well as 20 year savings + time to pay back
const getEnergySavings = (inputs, result) => {}
