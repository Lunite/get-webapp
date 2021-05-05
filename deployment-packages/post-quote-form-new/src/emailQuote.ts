const sgMail = require("@sendgrid/mail")
import * as fs from "fs"
import { PDFDocument, rgb, TextAlignment } from "pdf-lib"
import * as fontkit from "@pdf-lib/fontkit"
const XlsxPopulate = require("xlsx-populate")
import { ReqBody, Result } from "."

const DOMESTIC_AGENT_EMAIL =
  process.env.DOMESTIC_AGENT_EMAIL || "domestic.quotes@get-uk.com"
// "bensinclair@lunte.co.uk"
const COMMERCIAL_AGENT_EMAIL =
  process.env.COMMERCIAL_AGENT_EMAIL || "commercial.quotes@get-uk.com"
// "bensinclair@lunite.co.uk"

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const pdfFilename = "QUOTE_TOOL_PDF.pdf"
const nameFieldName = "Text Field 10"
const oneYearBillFieldName = "Text Field 7"
const tenYearBillFieldName = "Text Field 8"
const twentyYearBillFieldName = "Text Field 9"
const overallPriceFieldName = "Text1"
const solarLine1FieldName = "Text2"
const solarLine2FieldName = "Text3"
const solarLine3FieldName = "Text4"
const batteryLine1FieldName = "Text5"
const batteryLine2FieldName = "Text6"
const batteryLine3FieldName = "Text7"
const inverterLine1FieldName = "Text8"
const inverterLine2FieldName = "Text9"
const inverterLine3FieldName = "Text10"

const convertRoofTypeIdentifierToExcelOption = roofType => {
  switch (roofType) {
    case "concreteRoof":
      return "Concrete"
    case "slateRoof":
      return "Slate"
    case "rosemary":
      return "Rosemary"
    case "flatRoof":
      return "Flat Roof"
    case "trapezoidal":
      return "Trapezoidal"
    case "groundMounted":
      return "Ground Mounted"
    case "inRoof":
      return "In Roof"
    case "dekra":
      return "Dekra"
    default:
      return roofType
  }
}

const convertPanelIdentifierToExcelOption = panel => {
  switch (panel) {
    case "blue":
      return "Blue"
    case "black":
      return "Black"
    default:
      return panel
  }
}

const convertAdditionalItemIdentifierToExcelOption = additionalItem => {
  switch (additionalItem) {
    case "Grid Application":
      return "Grid Application - Sub 5kW System"
    case "Grid Application 2":
      return "Grid Application - Over 5kW System"
    default:
      return additionalItem
  }
}

const buildSpreadsheet = async (req: ReqBody, result: Result) => {
  const workbook = await XlsxPopulate.fromFileAsync("./new-spreadsheet.xlsx")
  const inputSheet = workbook.sheet("Input")

  const electricityDemandCell = "D5"
  const priceOfElectricityCell = "D6"
  const standingChargeCell = "D7"
  const quantityOfPanelsCell = "D9"
  const panelWattageCell = "D11"
  const specificYieldCell = "D13"
  const shadingFactorCell = "D14"
  const roofPitchCell = "D17"
  const azimuthCell = "D18"
  const roofTypeCell = "D19"
  const panelsCell = "D20"
  const scaffoldRequiredCell = "D21"
  const storageSizeCell = "D22"
  const postcodeShortCell = "D23"
  const titleCell = "D24"
  const firstNameCell = "D25"
  const lastNameCell = "D26"
  const houseNumberCell = "D27"
  const streetNameCell = "D28"
  const townCell = "D29"
  const postCodeCell = "D30"
  const telephoneNumberCell = "D31"
  const salesmanDiscountCell = "D32"
  const mainMarginCell = "D33"
  const finalMarginCell = "D34"
  const vatLevelCell = "D35"
  const additionalItem1Cell = "D36"
  const additionalItem2Cell = "D37"
  const additionalItem3Cell = "D38"
  const additionalItem4Cell = "D39"

  inputSheet.cell(electricityDemandCell).value(result.inputs.electricityDemand)
  inputSheet
    .cell(priceOfElectricityCell)
    .value(result.inputs.priceOfElectricity)
  inputSheet.cell(standingChargeCell).value(result.inputs.standingCharge)
  inputSheet.cell(quantityOfPanelsCell).value(result.inputs.quantityOfPanels)
  inputSheet.cell(panelWattageCell).value(result.inputs.panelWattage)
  inputSheet.cell(specificYieldCell).value(result.inputs.specificYield)
  inputSheet.cell(shadingFactorCell).value(result.inputs.shadingFactor)
  inputSheet.cell(roofPitchCell).value(result.inputs.roofPitch)
  inputSheet.cell(azimuthCell).value(result.inputs.azimuth)
  inputSheet
    .cell(roofTypeCell)
    .value(convertRoofTypeIdentifierToExcelOption(result.inputs.roofType))
  inputSheet
    .cell(panelsCell)
    .value(convertPanelIdentifierToExcelOption(result.inputs.panels))
  inputSheet
    .cell(scaffoldRequiredCell)
    .value(result.inputs.scaffoldRequired ? "Yes" : "No")
  inputSheet.cell(storageSizeCell).value(result.inputs.storageSize)
  inputSheet.cell(postcodeShortCell).value(result.inputs.postcodeShort)
  // inputSheet.cell("D24").value(req.title); // TODO Get title
  const nameParts = req.name.split(" ") // TODO Maybe handle this better
  inputSheet.cell(firstNameCell).value(nameParts[0])
  inputSheet.cell(lastNameCell).value(nameParts.length >= 2 ? nameParts[1] : "")
  inputSheet.cell(houseNumberCell).value(req.houseNumber)
  inputSheet.cell(streetNameCell).value(req.street)
  inputSheet.cell(townCell).value(req.town)
  inputSheet.cell(postCodeCell).value(req.postcode)
  inputSheet.cell(telephoneNumberCell).value(req.phone)
  inputSheet.cell(salesmanDiscountCell).value(result.inputs.salesmanDiscount)
  inputSheet.cell(mainMarginCell).value(result.inputs.mainMargin)
  inputSheet.cell(finalMarginCell).value(result.inputs.finalMargin)
  inputSheet.cell(vatLevelCell).value(result.inputs.VATLevel)
  inputSheet.cell(additionalItem1Cell).value("None")
  inputSheet.cell(additionalItem2Cell).value("None")
  inputSheet.cell(additionalItem3Cell).value("None")
  inputSheet.cell(additionalItem4Cell).value("None")

  const additionalItemsNames = []
  Object.keys(result.inputs.additionalItems).forEach(k => {
    additionalItemsNames.push(convertAdditionalItemIdentifierToExcelOption(k))
  })

  additionalItemsNames.forEach((v, i) => {
    switch (i) {
      case 0:
        inputSheet.cell(additionalItem1Cell).value(v)
        break
      case 1:
        inputSheet.cell(additionalItem2Cell).value(v)
        break
      case 2:
        inputSheet.cell(additionalItem3Cell).value(v)
        break
      case 3:
        inputSheet.cell(additionalItem4Cell).value(v)
        break
      default:
        break
    }
  })

  return await workbook.outputAsync("base64")
}

const buildPDF = async formData => {
  const sourcePDFBytes = fs.readFileSync(`./${pdfFilename}`)
  const pdfDoc = await PDFDocument.load(sourcePDFBytes)
  pdfDoc.registerFontkit(fontkit)

  const arialmtFontBytes = fs.readFileSync("./arialmt.ttf")
  const arialmtFont = await pdfDoc.embedFont(arialmtFontBytes, { subset: true })

  const form = pdfDoc.getForm()

  // Slight hack to set text form colours
  form.acroForm.getAllFields().forEach(v => {
    switch (v[0].getFullyQualifiedName()) {
      case nameFieldName:
      case overallPriceFieldName:
        v[0].setDefaultAppearance("1 g /ArialMT 0 Tf")
        break
      case solarLine1FieldName:
      case batteryLine1FieldName:
      case inverterLine1FieldName:
        v[0].setDefaultAppearance("0 g /ArialMT 15 Tf")
        break
      case solarLine2FieldName:
      case solarLine3FieldName:
      case batteryLine2FieldName:
      case batteryLine3FieldName:
      case inverterLine2FieldName:
      case inverterLine3FieldName:
        v[0].setDefaultAppearance("1 g /ArialMT 11 Tf")
        break
      default:
        break
    }
  })

  const nameField = form.getTextField(nameFieldName)
  const oneYearBillField = form.getTextField(oneYearBillFieldName)
  const tenYearBillField = form.getTextField(tenYearBillFieldName)
  const twentyYearBillField = form.getTextField(twentyYearBillFieldName)
  const overallPriceField = form.getTextField(overallPriceFieldName)
  const solarLine1Field = form.getTextField(solarLine1FieldName)
  const solarLine2Field = form.getTextField(solarLine2FieldName)
  const solarLine3Field = form.getTextField(solarLine3FieldName)
  const batteryLine1Field = form.getTextField(batteryLine1FieldName)
  const batteryLine2Field = form.getTextField(batteryLine2FieldName)
  const batteryLine3Field = form.getTextField(batteryLine3FieldName)
  const inverterLine1Field = form.getTextField(inverterLine1FieldName)
  const inverterLine2Field = form.getTextField(inverterLine2FieldName)
  const inverterLine3Field = form.getTextField(inverterLine3FieldName)

  nameField.setText(formData.name)
  oneYearBillField.setText(formData.oneYearBill)
  tenYearBillField.setText(formData.tenYearBill)
  twentyYearBillField.setText(formData.twentyYearBill)
  overallPriceField.setText(`${formData.lowerPrice}`)
  overallPriceField.setAlignment(TextAlignment.Center)
  solarLine1Field.setText(`${formData.solarLine1}`)
  solarLine2Field.setText(`${formData.solarLine2}`)
  solarLine3Field.setText(`${formData.solarLine3}`)
  batteryLine1Field.setText(`${formData.batteryLine1}`)
  batteryLine2Field.setText(`${formData.batteryLine2}`)
  batteryLine3Field.setText(`${formData.batteryLine3}`)
  inverterLine1Field.setText(`${formData.inverterLine1}`)
  inverterLine2Field.setText(`${formData.inverterLine2}`)
  inverterLine3Field.setText(`${formData.inverterLine3}`)

  const systemPage = pdfDoc.getPage(8)

  nameField.enableReadOnly()
  oneYearBillField.enableReadOnly()
  tenYearBillField.enableReadOnly()
  twentyYearBillField.enableReadOnly()
  overallPriceField.enableReadOnly()
  solarLine1Field.enableReadOnly()
  solarLine2Field.enableReadOnly()
  solarLine3Field.enableReadOnly()
  batteryLine1Field.enableReadOnly()
  batteryLine2Field.enableReadOnly()
  batteryLine3Field.enableReadOnly()
  inverterLine1Field.enableReadOnly()
  inverterLine2Field.enableReadOnly()
  inverterLine3Field.enableReadOnly()

  // Block out inverter if not used
  if (!formData.includeInverters) {
    inverterLine1Field.setText(undefined)
    inverterLine2Field.setText(undefined)
    inverterLine3Field.setText(undefined)
    systemPage.drawRectangle({
      x: 55,
      y: 105,
      height: 65,
      width: 220,
      borderWidth: 0,
      color: rgb(0.235, 0.588, 0.772),
    })
  }

  form.updateFieldAppearances(arialmtFont)
  return await pdfDoc.saveAsBase64()
}

const emailQuote = async (req: ReqBody, result: Result) => {
  const isCommercial = !!req.isCommercial
  const customerAddr = req.email
  const agentAddr = isCommercial ? COMMERCIAL_AGENT_EMAIL : DOMESTIC_AGENT_EMAIL
  const fromAddr = agentAddr
  const fromName = "GetUK Sales Team"
  const subject = "GetUK Online Quote"
  const customerEmailTemplateId = "d-71e5e0ca2d374004875986255d702dff"
  const agentEmailTemplateId = "d-a25939651df745eea315c5f58ac2f3f2"

  const billFormatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  })

  const totalPriceFormatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumSignificantDigits: 3,
    maximumFractionDigits: 0,
  })

  let inverterDescription = ""
  Object.keys(result.inputs.additionalItems).forEach(k => {
    if (k !== "Grid Application") {
      inverterDescription = k
    }
  })

  const pdfFormData = {
    name: String(req.name),
    oneYearBill: billFormatter.format(
      result.usageAndSaving[0].electricityBillBefore
    ),
    tenYearBill: billFormatter.format(
      result.usageAndSaving[9].electricityBillBefore
    ),
    twentyYearBill: billFormatter.format(
      result.usageAndSaving[19].electricityBillBefore
    ),
    solarLine1: `${result.inputs.quantityOfPanels}x Solar panels`,
    solarLine2: "Monocrystalline Modules", // TODO Find out if this is dynamic
    solarLine3: `${result.inputs.panelWattage} Watts`, // TODO Decide how range should work
    batteryLine1: "1 Battery Module",
    batteryLine2: `${result.inputs.storageSize}kWh Capacity`,
    batteryLine3: "",
    includeInverters: Object.keys(result.inputs.additionalItems).length > 1,
    inverterLine1: `${
      Object.keys(result.inputs.additionalItems).length > 1 ? 1 : 0
    } Inverter`, // TODO This is a bit janky, we need to work out how "Grid Application is handled"
    inverterLine2: "", // Removed on request, use inverterDescription var above if required again
    inverterLine3: "", // Removed on request
    upperPrice: totalPriceFormatter.format(result.cost.totalSaleIncVAT),
    lowerPrice: totalPriceFormatter.format(result.cost.totalSaleIncVAT),
  }

  const filledPDFQuote = await buildPDF(pdfFormData)
  const filledAgentSpreadsheet = await buildSpreadsheet(req, result)

  const customerEmailData = {
    to: customerAddr,
    from: { email: fromAddr, name: fromName },
    subject,
    templateId: customerEmailTemplateId,
    dynamicTemplateData: {
      customer_name: req.name,
    },
    attachments: [
      {
        content: filledPDFQuote,
        filename: "Your_Solar_Quote.pdf",
        type: "application/pdf",
        disposition: "attachment",
      },
    ],
  }

  const agentEmailData = {
    to: agentAddr,
    from: fromAddr,
    subject,
    templateId: agentEmailTemplateId,
    dynamicTemplateData: {
      name: req.name,
      email: req.email,
      phone: req.phone,
      houseNumber: req.houseNumber,
      street: req.street,
      town: req.town,
      postcode: req.postcode,
      locationLat: req.location.lat,
      locationLng: req.location.lng,
      companyName: req.companyName,
      isCommercial: isCommercial,
      roofAzimuth: req.roof.azimuth,
      roofInclination: req.roof.inclination,
      roofArea: req.roof.area,
      roofMaterial: req.roof.roofMaterial,
      propertyECar: req.property.eCar,
      propertyPool: req.property.pool,
      propertyHeater: req.property.heater,
      propertyEHeater: req.property.eHeater,
      propertyPump: req.property.pump,
      propertyHotTub: req.property.hotTub,
      propertyOwnsHouse: req.property.ownsHouse,
      propertyBedrooms: req.property.bedrooms,
      propertyFlat: req.property.flat,
      propertyBuildingType: req.property.buildingType,
      propertyHouseType: req.property.houseType,
      eac: req.eac,
      ppw: req.ppw,
      standingCharge: req.standingCharge,
      discount: req.discount,
      worksFromHome: req.worksFromHome,
      salesTimescale: req.sales.timescale,
      salesPaymentMethod: req.sales.paymentMethod, // TODO Add commercial details
    },
    attachments: [
      {
        content: filledPDFQuote,
        filename: "Your_Solar_Quote.pdf",
        type: "application/pdf",
        disposition: "attachment",
      },
      {
        content: filledAgentSpreadsheet,
        filename: "Sales_Pack.xlsx",
        disposition: "attachment",
      },
    ],
  }
  return await sgMail.send([customerEmailData, agentEmailData])
}

export default emailQuote
