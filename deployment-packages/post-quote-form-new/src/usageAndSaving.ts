const ex = require("exceljs")

const monthIndexToDays = {
  0: 31,
  1: 28,
  2: 31,
  3: 30,
  4: 31,
  5: 30,
  6: 31,
  7: 31,
  8: 30,
  9: 31,
  10: 30,
  11: 31,
}


const calculateUsageAndSaving = async () => {
  // cost including vat
  const costIncVat = -6271.08 // need to make cost negative
  //   const {
  //     pricePerKwh,
  //     panelsQuantity,
  //     shading,
  //     pannelWattage,
  //     specificYield,
  //   } = inputs

  let pricePerKwh = 0.17556
  let annualYieldCalc = 2615.53

  // get value from crazy work thing

const electricityKwhFromSolar = await energyUseCalculation({eac: 4000, annualYield: 2615.53, storageSize: 5 })
  
// values that incrememt per year
  let predictedUnitCost = pricePerKwh
  const assumedAnnualEnergyInflation = 0.07 // 7%

  let collectorEfficiency = 1 // 100%

  let exportedRevenue = 0.055
  const RPI = 0.03

  let results = []
  let newPrice = costIncVat
  let accumlativeTotal = 0
  let i = 0

  
  
  do {
    i = i + 1
    accumlativeTotal += await workoutSaving(
      predictedUnitCost,
      collectorEfficiency,
      exportedRevenue,
      electricityKwhFromSolar,
      annualYieldCalc
    )
    predictedUnitCost =
      predictedUnitCost + predictedUnitCost * assumedAnnualEnergyInflation
    collectorEfficiency = collectorEfficiency - 0.005
    exportedRevenue = exportedRevenue + exportedRevenue * RPI

    results.push({
      year: i,
      quotedPrice: costIncVat,
      profits: newPrice + accumlativeTotal,
      accumlativeTotal,
    })
  } while (i < 20)
  console.log(results)
  return results
}

const workoutSaving = async (
  predictedUnitCost,
  collectorEfficiency,
  exportedRevenue,
  electricityKwhFromSolar,
  annualYieldCalc
) => {

  const savingFromSolar = electricityKwhFromSolar * predictedUnitCost
  //console.log("solar saving", savingFromSolar) //384

  const generation = annualYieldCalc * collectorEfficiency
  //console.log("generation", generation) // 2615.53

  const elecUsedOnSite = electricityKwhFromSolar

  const exportedPower = generation - elecUsedOnSite
  //console.log("export power", exportedPower) // 427.89

  const revenueFromPower = exportedPower * exportedRevenue
  //console.log("revenueFrom power", revenueFromPower) // 23.52

  const totalForTheYear = savingFromSolar + revenueFromPower
  //console.log("total", totalForTheYear)

  return totalForTheYear
}

// left side of accumlative total equation

// Electricity Used on Site (kWh) from Solar & Storage = (=Calculation!$KY$9) - some random number on the calculation page = £2,187.64
// Predicted Unit Cost Plus Inflation = (=Input!D6 = price of electricity per kWh) for first year ----- second year is (Predicted Unit Cost Plus Inflation + (Predicted Unit Cost Plus Inflation * Assumed Annual Energy Inflation(7%) ))
// Saving from Energy Used From Solar Consumed following Solar & Storage = (Electricity Used on Site (kWh) from Solar & Storage * Predicted Unit Cost Plus Inflation )

// above outputs Saving from Energy Used From Solar Consumed following Solar & Storage

// ***********************************************************************************************************

// right side of accumlative total equation

// shading factor = 100% - MCS shading check (5% i think)

// System Size/Calculated kW dc = (panels number * pannel wattage)/1000

// Annual yield calculation = (specific yield/Annual kWh per KW (input from ui) * System Size/Calculated kW dc) * shading factor)

// Collector Efficiency of Solar System = 100% first year then (Collector Efficiency of Solar System - 0.005)
// Estimated Generation (kWh) Of Solar System = (=Input!$D$15 (Annual yield calculation) * Collector Efficiency of Solar System)

// Electricity Used on Site (kWh) from Solar & Storage = (=Calculation!$KY$9) - some random number on the calculation page = £2,187.64

// Exported Power (kWh) = (Estimated Generation (kWh) Of Solar System - Electricity Used on Site (kWh) from Solar & Storage)

// ***********************************************************************************************************

// Exported Revenue Rate Per Year = for first year = 0.055 incrememnted per year with (Exported Revenue Rate Per Year + (Exported Revenue Rate Per Year * Assumed Annual Inflation (RPI) (3%)  ))
// Revenue from Exported Power = (Exported Power (kWh) * Exported Revenue Rate Per Year)

// ***********************************************************************************************************

// accumlative total = (Saving from Energy Used From Solar Consumed following Solar & Storage + Revenue from Exported Power)


export const energyUseCalculation = async ( inputs: {
  eac, annualYield, storageSize
  }) => {

  const workbook = new ex.Workbook()
  await workbook.xlsx.readFile("./new-spreadsheet.xlsx")
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
  const profile = workbook.getWorksheet("Profile")
  const solarCoef = profile.getColumn("E").values.slice(2)
  const consumptionCoef = profile.getColumn("F").values.slice(2)
  
  let yearConVals = []
  let yearSolVals = []
  let yearBatteryUse = []
  let cumlIdx = 0
  let batteryCurrentCharge = 0
  for (let month = 0; month < 12; month++) {
    let monthConVals = []
    let monthSolVals = []
    yearlyCalcs.export.push([])
    yearlyCalcs.selfConsumptionWithoutBattery.push([])
    yearlyCalcs.demandAfterSolar.push([])
    yearBatteryUse.push([])
    for (let day = 0; day < monthIndexToDays[month]; day++) {
      let dayConVals = []
      let daySolVals = []
      yearlyCalcs.export[month].push([])
      yearlyCalcs.selfConsumptionWithoutBattery[month].push([])
      yearlyCalcs.demandAfterSolar[month].push([])
      yearBatteryUse[month].push([])
      for (let hhour = 0; hhour < 48; hhour++) {
        dayConVals[hhour] = consumptionCoef[cumlIdx] * inputs.eac || 0
        daySolVals[hhour] = solarCoef[cumlIdx] * inputs.annualYield || 0
        yearlyCalcs.export[month][day][hhour] = Math.max(
          daySolVals[hhour] - dayConVals[hhour],
          0
        )
        yearlyCalcs.selfConsumptionWithoutBattery[month][day][hhour] =
          daySolVals[hhour] - yearlyCalcs.export[month][day][hhour]
        yearlyCalcs.demandAfterSolar[month][day][hhour] =
          dayConVals[hhour] -
          yearlyCalcs.selfConsumptionWithoutBattery[month][day][hhour]
        yearBatteryUse[month][day][hhour] = Math.max(
          Math.min(
            yearlyCalcs.export[month][day][hhour] + batteryCurrentCharge,
            inputs.storageSize
          ) - yearlyCalcs.demandAfterSolar[month][day][hhour],
          0
        )
        batteryCurrentCharge = yearBatteryUse[month][day][hhour]
        cumlIdx++
      }
      let dayBatteryUse = Math.max(...yearBatteryUse[month][day])
      dayBatteryUse =
        yearBatteryUse[month][day][47] !== 0
          ? dayBatteryUse - yearBatteryUse[month][day][47]
          : dayBatteryUse - Math.min(...yearBatteryUse[month][day])

      yearBatteryUse[month][day] = dayBatteryUse
      monthConVals[day] = dayConVals
      monthSolVals[day] = daySolVals
    }
    yearConVals[month] = monthConVals
    yearSolVals[month] = monthSolVals
  }
  const sumArray = arr => {
    return arr.map(mArr => {
      return mArr
        .map(dArr => {
          return dArr.reduce((val, acc) => {
            return val + acc
          }, 0)
        })
        .reduce((val, acc) => {
          return val + acc
        }, 0)
    })
  }

  yearlyCalcs.demand = sumArray(yearConVals)
  yearlyCalcs.solar = sumArray(yearSolVals)
  yearlyCalcs.export = sumArray(yearlyCalcs.export)
  yearlyCalcs.selfConsumptionWithoutBattery = sumArray(
    yearlyCalcs.selfConsumptionWithoutBattery
  )
  yearlyCalcs.demandAfterSolar = sumArray(yearlyCalcs.demandAfterSolar)
  yearlyCalcs.exportAfterBattery = yearBatteryUse.map(mArr => {
    return mArr.reduce((a, b) => {
      return a + b
    }, 0)
  })
  yearlyCalcs.selfConsumptionTotal = yearlyCalcs.selfConsumptionWithoutBattery.map(
    (c, i) => {
      return c + yearlyCalcs.exportAfterBattery[i]
    }
  )
  yearlyCalcs.demandTotal = yearlyCalcs.demand.map((d, idx) => {
    return d - yearlyCalcs.selfConsumptionTotal[idx]
  })
  return yearlyCalcs
}

calculateUsageAndSaving()