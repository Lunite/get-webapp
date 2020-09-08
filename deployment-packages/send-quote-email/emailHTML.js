/* eslint-disable operator-linebreak */
/* eslint-disable indent */
const rnd = (num) =>
  (Math.round((num + Number.EPSILON) * 100) / 100).toFixed(2);
const sum = (arr) => arr.reduce((a, b) => a + b, 0);

module.exports.getEmailHTML = (results, extra = '') => `
<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        line-height: 1.78;
        font-size: 18px;
        font-weight: 300;
        font-family: gotham, sans-serif;
        color: #333;
      }
      div {
        box-sizing: border-box;
        display: block;
      }
      .yourquote-container {
        width: 100%;
        margin: auto;
        border: 1px solid black;
      }

      h1,
      h2 {
        color: white;
      }

      .green{
          background-color: rgba(0,255,0,0.5)
      }
      .red{
        background-color: rgba(255,0,0,0.5)
        }
      .yq-header {
        width: 100%;
        text-align: center;
        padding: 25px 0;
        background-color: #3c96c5;
      }

      .yq-total {
        width: 100%;
        font-size: 20px;
      }

      .yq-subheading {
        background-color: #3c96c5;
        text-align: center;
        padding: 15px;
      }

      .yq-paymentterms-table > div {
        display: flex;
      }

      .yq-paymentterms-table > span {
        box-sizing: border-box;
        border-bottom: 1px solid black;
        width: 50%;
        padding: 20px 15px;
      }

      .yq-right {
        display: flex;
        justify-content: space-between;
        border-left: 1px solid black;
      }

      table {
        border-spacing: 0px;
        width: 100%;
      }
      th,
      td {
        text-align: left;
        padding: 5px 5px;
        border: black 0.5px solid;
      }
      td {
        text-align: center;
      }
      .tr-lg {
        background-color: lightgrey;
      }

      .text-left {
        text-align: left;
      }

      .td-price {
        display: inline-flex;
        justify-content: space-between;
      }
    </style>
  </head>
  <body>
    <div class="yourquote-container">
      <div class="yq-header"><h1>Your Quotation (Inclusive of VAT)</h1></div>
      <table class="yq-total">
        <td style="text-align: left; border-right:none; padding-left: 10px;">£</td>
        <th style="text-align: right; border-left:none; padding-right: 10px">${rnd(
          results.totalCost,
        )}</th>
      </table>
      <div class="yq-subheading"><h2>Payment Terms</h2></div>
      <table>
        <tr>
          <th>
            Payment 1 @ 60% 14 Days prior to Installation Date
          </th>
          <td>${rnd(results.totalCost * 0.6)}</td>
        </tr>
        <tr>
          <th>
            Payment 2 @ 40% 7 days post Completion of Installation
          </th>
          <td>${rnd(results.totalCost * 0.4)}</td>
        </tr>
        <tr>
          <th>
            Estimated Years to Payback
          </th>
          <td>${results.yearsToPayback} years</td>
        </tr>
        <tr>
          <th>
            System Size
          </th>
          <td>${results.systemSize} kWdc</td>
        </tr>
        <tr>
          <th>
            Quantity of Panels
          </th>
          <td>${results.panelQuantity} Panels</td>
        </tr>
        <tr>
          <th>
            Battery Storage Size
          </th>
          <td>${results.batterySize} kWdc</td>
        </tr>
      </table>
      <div class="yq-subheading hide-mob">
        <h2>Breakdown of Performance</h2>
      </div>
      <table class="hide-mob">
        <tr class="tr-lg">
          <th>Description</th>
          <th>Jan</th>
          <th>Feb</th>
          <th>Mar</th>
          <th>Apr</th>
          <th>May</th>
          <th>Jun</th>
          <th>Jul</th>
          <th>Aug</th>
          <th>Sep</th>
          <th>Oct</th>
          <th>Nov</th>
          <th>Dec</th>
          <th>Total</th>
        </tr>
        <tr>
          <td class="text-left">Grid Usage</td>
          <td>${rnd(results.firstYearUse.demand[0])}</td>
          <td>${rnd(results.firstYearUse.demand[1])}</td>
          <td>${rnd(results.firstYearUse.demand[2])}</td>
          <td>${rnd(results.firstYearUse.demand[3])}</td>
          <td>${rnd(results.firstYearUse.demand[4])}</td>
          <td>${rnd(results.firstYearUse.demand[5])}</td>
          <td>${rnd(results.firstYearUse.demand[6])}</td>
          <td>${rnd(results.firstYearUse.demand[7])}</td>
          <td>${rnd(results.firstYearUse.demand[8])}</td>
          <td>${rnd(results.firstYearUse.demand[9])}</td>
          <td>${rnd(results.firstYearUse.demand[10])}</td>
          <td>${rnd(results.firstYearUse.demand[11])}</td>
          <td>${rnd(sum(results.firstYearUse.demand))}</td>
        </tr>
        <tr>
          <td class="text-left">Solar Generation</td>
          <td>${rnd(results.firstYearUse.solar[1])}</td>
          <td>${rnd(results.firstYearUse.solar[0])}</td>
          <td>${rnd(results.firstYearUse.solar[2])}</td>
          <td>${rnd(results.firstYearUse.solar[3])}</td>
          <td>${rnd(results.firstYearUse.solar[4])}</td>
          <td>${rnd(results.firstYearUse.solar[5])}</td>
          <td>${rnd(results.firstYearUse.solar[6])}</td>
          <td>${rnd(results.firstYearUse.solar[7])}</td>
          <td>${rnd(results.firstYearUse.solar[8])}</td>
          <td>${rnd(results.firstYearUse.solar[9])}</td>
          <td>${rnd(results.firstYearUse.solar[10])}</td>
          <td>${rnd(results.firstYearUse.solar[11])}</td>
          <td>${rnd(sum(results.firstYearUse.solar))}</td>
        </tr>
        <tr>
          <td class="text-left">Solar Exported to Grid</td>
          <td>${rnd(results.firstYearUse.exportAfterBattery[0])}</td>
          <td>${rnd(results.firstYearUse.exportAfterBattery[2])}</td>
          <td>${rnd(results.firstYearUse.exportAfterBattery[1])}</td>
          <td>${rnd(results.firstYearUse.exportAfterBattery[3])}</td>
          <td>${rnd(results.firstYearUse.exportAfterBattery[4])}</td>
          <td>${rnd(results.firstYearUse.exportAfterBattery[5])}</td>
          <td>${rnd(results.firstYearUse.exportAfterBattery[6])}</td>
          <td>${rnd(results.firstYearUse.exportAfterBattery[7])}</td>
          <td>${rnd(results.firstYearUse.exportAfterBattery[8])}</td>
          <td>${rnd(results.firstYearUse.exportAfterBattery[9])}</td>
          <td>${rnd(results.firstYearUse.exportAfterBattery[10])}</td>
          <td>${rnd(results.firstYearUse.exportAfterBattery[11])}</td>
          <td>${rnd(sum(results.firstYearUse.exportAfterBattery))}</td>
        </tr>
        <tr>
          <td class="text-left">Solar Used at Home</td>
          <td>${rnd(results.firstYearUse.selfConsumptionTotal[0])}</td>
          <td>${rnd(results.firstYearUse.selfConsumptionTotal[1])}</td>
          <td>${rnd(results.firstYearUse.selfConsumptionTotal[4])}</td>
          <td>${rnd(results.firstYearUse.selfConsumptionTotal[2])}</td>
          <td>${rnd(results.firstYearUse.selfConsumptionTotal[5])}</td>
          <td>${rnd(results.firstYearUse.selfConsumptionTotal[3])}</td>
          <td>${rnd(results.firstYearUse.selfConsumptionTotal[6])}</td>
          <td>${rnd(results.firstYearUse.selfConsumptionTotal[7])}</td>
          <td>${rnd(results.firstYearUse.selfConsumptionTotal[8])}</td>
          <td>${rnd(results.firstYearUse.selfConsumptionTotal[9])}</td>
          <td>${rnd(results.firstYearUse.selfConsumptionTotal[10])}</td>
          <td>${rnd(results.firstYearUse.selfConsumptionTotal[11])}</td>
          <td>${rnd(sum(results.firstYearUse.selfConsumptionTotal))}</td>
        </tr>
        <tr>
          <td class="text-left">Grid Usage with Solar</td>
          <td>${rnd(results.firstYearUse.demandTotal[0])}</td>
          <td>${rnd(results.firstYearUse.demandTotal[1])}</td>
          <td>${rnd(results.firstYearUse.demandTotal[3])}</td>
          <td>${rnd(results.firstYearUse.demandTotal[2])}</td>
          <td>${rnd(results.firstYearUse.demandTotal[4])}</td>
          <td>${rnd(results.firstYearUse.demandTotal[5])}</td>
          <td>${rnd(results.firstYearUse.demandTotal[6])}</td>
          <td>${rnd(results.firstYearUse.demandTotal[7])}</td>
          <td>${rnd(results.firstYearUse.demandTotal[8])}</td>
          <td>${rnd(results.firstYearUse.demandTotal[9])}</td>
          <td>${rnd(results.firstYearUse.demandTotal[10])}</td>
          <td>${rnd(results.firstYearUse.demandTotal[11])}</td>
          <td>${rnd(sum(results.firstYearUse.demandTotal))}</td>
        </tr>
      </table>
      <div class="yq-subheading">
        <h2>Your Predicted System Performance</h2>
      </div>
      <div class="scale-mob">
        <table>
          <tr class="tr-lg">
            <th colspan="3">The Assumptions we have made are based on...</th>
            <th>Environmental Impact...</th>
            <th colspan="4">Address and Climate Data</th>
          </tr>
          <tr>
            <th>Predicted System Output</th>
            <th>Assumed Annual Inflation</th>
            <th>Assumed On-Site Energy Consumption</th>
            <th>CO<sub>2</sub> Savings</th>
            <th>Project Reference</th>
            <th>Postcode</th>
            <th>Irradience Zone</th>
            <th>Roof Pitch</th>
          </tr>
          <tr>
            <td>${rnd(results.annualYield)} kWh/annum</td>
            <td>3%</td>
            <td>${rnd(
              100 *
                (sum(results.firstYearUse.selfConsumptionTotal) /
                  sum(results.firstYearUse.solar)),
            )}
              %</td>
            <td>0.517kg saved per PV kWh</td>
            <td>${results.projectReference}</td>
            <td>${results.postcode}</td>
            <td>${results.irradienceZone}</td>
            <td>${results.roofPitch}</td>
          </tr>
          <tr>
            <th>Our Proposal Installation Cost</th>
            <th>Assumed Energy Unit Cost</th>
            <th>Assumed Annual Energy Inflation</th>
            <th>CO² Savings Over 20 Years</th>
            <th colspan="2">Address</th>
            <th>Irradiation Level</th>
            <th>Degree's From South</th>
          </tr>
          <tr>
            <td>£${rnd(results.totalCost)}</td>
            <td>£${results.energyUnitCost}</td>
            <td>4%</td>
            <td>${rnd(results.co2Savings)} tonnes</td>
            <td colspan="2">${results.address}</td>
            <td>${results.irradiationLevel}</td>
            <td>${results.azimuth}&#176;</td>
          </tr>
        </table>
      </div>
      <div class="yq-subheading hide-mob">
        <h2>Your Predicted System Performance - 20 Year Outlook</h2>
      </div>
      <table class="hide-mob">
        <tr class="tr-lg">
          <th>Year</th>
          <th>Estimated Yearly Energy</th>
          <th>Predicted Unit Cost</th>
          <th>Predicted Bill Without Solar</th>
          <th>Estimated Solar Generation</th>
          <th>Solar Collector Efficiency</th>
          <th>Solar Energy Used on Site</th>
          <th>Saving from Solar Energy</th>
          <th>Predicted Bill With Solar</th>
          <th>Return on Investment</th>
          <th>Total Savings</th>
        </tr>
        ${results.twentyYearOutlook
          .map(
            (year, i) => `<tr>
                <td>${i + 1}</td>
                <td>${year.demand}kWh</td>
                <td>${rnd(year.unitCost)}</td>
                <td>£${rnd(year.billBefore)}</td>
                <td>${rnd(year.solarGeneration)}kWh</td>
                <td>${rnd(year.collectorEfficiency * 100)}%</td>
                <td>${rnd(year.electricityUseFromSolar)}kWh</td>
                <td>£${rnd(year.savingsFromSolar)}</td>
                <td>£${rnd(year.billAfter)}</td>
                <td class="${year.roi > 0 ? 'green' : 'red'}">£${rnd(
              year.roi,
            )}</td>
                <td>£${rnd(year.totalSaving)}</td>
              </tr>`,
          )
          .join('')}
      </table>
      <div class="yq-subheading"><h2>Order Summary</h2></div>
      <table>
        <tr>
          <th>Quote Reference</th>
          <td>${results.projectReference}</td>
        </tr>
        <tr class="tr-lg">
          <th>Item</th>
          <th>Description</th>
        </tr>
        <tr>
          <td>1</td>
          <td>
            Supply, Installation, Commissioning and Handover of Solar
            Photovoltaic System ( ${results.systemSize} kWdc )
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>
            Supply, Installation, Commissioning and Handover of Battery Storage
            System ( ${results.batterySize} kWdc )
          </td>
        </tr>
        <tr class="tr-lg">
          <th>Item</th>
          <th>Additional Items</th>
        </tr>
        ${results.additionalItems
          .map(
            (item, i) => `<tr>
                <td>${i + 3}</td>
                <td>${Object.keys(item)[0]}</td>
              </tr>`,
          )
          .join('')}
        <tr>
          <td>VAT @ ${results.vatRate * 100}%</td>
          <td>£${rnd(results.vat)}</td>
        </tr>
        <tr class="tr-lg">
          <th colspan="2" style="text-align: center; padding: 10px;">
            Total Price
          </th>
        </tr>
        <tr>
          <td colspan="2" style="padding: 15px; font-size: 1.3em;">
            <em
              ><span style="float: left;">£</span
              ><span style="float: right;">${rnd(results.totalCost)}</span></em
            >
          </td>
        </tr>
        <tr>
          <th>Address:</th>
          <td>${results.address}</td>
        </tr>
        <tr>
          <th>Name:</th>
          <td>Mr/s. ${results.name}</td>
        </tr>
      </table>
    </div>

    
    ${extra}
  </body>
</html>

  `;
