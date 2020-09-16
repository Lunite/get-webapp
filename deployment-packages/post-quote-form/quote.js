// fns to calculate actualy quote values
const lookup = require("./lookupTables")
const savings = require("./useageAndSavings")
const ex = require("exceljs")

const sum = arr => {
  return arr.reduce((a, b) => {
    return a + b
  }, 0)
}

module.exports.calculateQuote = async formValues => {
  const workbook = new ex.Workbook()
  await workbook.xlsx.readFile("./spreadsheet.xlsx")
  const inputs = lookup.getInputs(formValues, workbook)
  console.log("Using Inputs", inputs)
  const quantities = []
  for (let index = 6; index < inputs.panelQuantity + 1; index++) {
    quantities.push(index)
  }

  let results = []
  let proms = quantities.map(async quantity => {
    let localResults = []
    let ps = [0, 2.5, 5, 7.5, 10].map(async size => {
      const localInput = {
        ...lookup.getInputs(formValues, workbook, quantity, size),
      } // deep copy to avoid referencing outside of async code
      let tResult = lookup.getResultsTemplate(localInput)
      const [cost, vat] = getTotalCost(localInput)
      tResult.totalCost = cost
      tResult.vat = vat
      tResult = savings.getUseAndSavings(localInput, tResult, workbook)
      console.log({
        panelQuantity: quantity,
        storageSize: size,
        roi: tResult.twentyYearOutlook[19].roi,
        consumtion: `${
          100 *
          (
            sum(tResult.firstYearUse.selfConsumptionTotal) /
            sum(tResult.firstYearUse.solar)
          ).toFixed(2)
        }%`,
      })
      localResults.push(tResult)
    })
    await Promise.all(ps)

    let bestRoi = localResults[0].twentyYearOutlook[19].roi
    let result = localResults[0]
    localResults.forEach(r => {
      if (r.twentyYearOutlook[19].roi > bestRoi) {
        bestRoi = r.twentyYearOutlook[19].roi
        result = r
      }
    })
    let set = false
    result.twentyYearOutlook.forEach((y, i) => {
      result.co2Savings = result.co2Savings + (0.517 * y.solarGeneration) / 1000
      if (!set && y.roi > 0) {
        result.yearsToPayback = i
        set = true
      }
    })
    if (!set) {
      result.yearsToPayback = "20+"
    }
    results.push(result)
  })
  await Promise.all(proms)
  results.sort(
    (a, b) => a.twentyYearOutlook[19].roi - b.twentyYearOutlook[19].roi
  )
  const bestInputs = lookup.getInputs(
    formValues,
    workbook,
    results.panelQuantity,
    results.storageSize
  )
  return [results[results.length - 1], bestInputs]
}

// calculates total cost of installation
// assumed: in roof panels, 5kW battery equipment, no scaffolding,
const getTotalCost = inputs => {
  let cost = 0
  let vat = 0
  const addMarginVat = basecost => {
    let adjustedCost = basecost * (1 + inputs.margin)
    let lvat = adjustedCost * inputs.vat
    vat += lvat
    adjustedCost += lvat
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
