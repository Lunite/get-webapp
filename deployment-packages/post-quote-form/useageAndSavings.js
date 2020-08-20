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

exports.getUseAndSavings = async (inputs, result) => {
  const firstYearUse = await energyUseCalculation(inputs)
  console.log("First year use is", firstYearUse)
  const sum = arr => {
    return arr.reduce((a, b) => {
      return a + b
    }, 0)
  }
  const rnd = num => {
    return Math.round((num + Number.EPSILON) * 100) / 100
  }
  const firstYearTotals = {
    demand: inputs.eac,
    unitCost: inputs.ppw,
    billBefore: rnd(inputs.ppw * inputs.eac + 365 * inputs.standingCharge),
    solarGeneration: inputs.annualYield,
    collectorEfficiency: 1,
    electriciyUseFromSolar: rnd(sum(firstYearUse.selfConsumptionTotal)),
    savingsFromSolar: rnd(sum(firstYearUse.selfConsumptionTotal) * inputs.ppw),
  }
  firstYearTotals.billAfter = rnd(
    firstYearTotals.billBefore - firstYearTotals.savingsFromSolar
  )
  firstYearTotals.roi = rnd(firstYearTotals.savingsFromSolar - result.totalCost)
  firstYearTotals.totalSaving = firstYearTotals.savingsFromSolar
  console.log("First year use is", firstYearTotals)
  const twentyYearOutlook = [firstYearTotals]
  for (let i = 1; i < 20; i++) {
    const lastYear = twentyYearOutlook[i - 1]
    const thisYear = {
      demand: lastYear.demand,
      unitCost: rnd(lastYear.unitCost * 1.04), // 4% inflation yearly
      collectorEfficiency: lastYear.collectorEfficiency - 0.005,
      electriciyUseFromSolar: lastYear.electriciyUseFromSolar,
    }
    thisYear.billBefore = rnd(
      thisYear.unitCost * inputs.eac + 365 * inputs.standingCharge
    )
    thisYear.solarGeneration = rnd(
      lastYear.solarGeneration * thisYear.collectorEfficiency
    )
    thisYear.savingsFromSolar = rnd(
      thisYear.unitCost * thisYear.electriciyUseFromSolar
    )
    thisYear.billAfter = thisYear.billBefore - thisYear.savingsFromSolar
    thisYear.roi = rnd(lastYear.roi + thisYear.savingsFromSolar)
    thisYear.totalSaving = rnd(lastYear.totalSaving + thisYear.savingsFromSolar)
    twentyYearOutlook.push(thisYear)
  }
  result.twentyYearOutlook = twentyYearOutlook
  result.firstYearUse = firstYearUse
  return result
}

const energyUseCalculation = async inputs => {
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
  const workbook = new ex.Workbook()
  await workbook.xlsx.readFile("./spreadsheet.xlsx")
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
