const yearInterface = {
  year: 1,
  eac: 5000,
  unitCost: 0.1,
  billBefore: 1222,
  solarGeneration: 123,
  collectorEfficiency: 100,
  electriciyUseFromSolar: 123,
  savingsFromSolar: 123,
  billAfter: 123,
  roi: 123,
  totalSaving: 123,
}

const monthlyUseCoefficients = [
  0.101246,
  0.08853,
  0.09024,
  0.077976,
  0.07492,
  0.069078,
  0.07049,
  0.071698,
  0.074252,
  0.084896,
  0.0932,
  0.1034,
]

exports.getUseAndSavings = (inputs, result) => {
  const twentyYearOutlook = []
  return result
}

const energyUseCalculation = inputs => {
  const yearlyCalcs = {
    // each array length 12 -> i=month
    demand: [],
    solar: [],
    export: [],
    selfConsumptionWithoutBattery: [],
    demandAfterSolar: [],
    exportAfterBattery: [],
    selfConsumptionTotal: [],
    demandTotal: [],
  }
  yearlyCalcs.demand = monthlyUseCoefficients.map(coef => {
    return inputs.eac * coef
  })
}
