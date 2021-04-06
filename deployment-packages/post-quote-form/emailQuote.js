const sgMail = require("@sendgrid/mail")
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const fs = require("fs")
const { PDFDocument } = require("pdf-lib")

const pdfFilename = "QUOTE_TOOL_PDF.pdf"
const nameFieldName = "Text Field 10"
const oneYearBillFieldName = "Text Field 7"
const tenYearBillFieldName = "Text Field 8"
const twentyYearBillFieldName = "Text Field 9"

const buildPDF = async formData => {
  const sourcePDFBytes = fs.readFileSync(`${__dirname}/${pdfFilename}`)
  const pdfDoc = await PDFDocument.load(sourcePDFBytes)
  const form = pdfDoc.getForm()
  const nameField = form.getTextField(nameFieldName)
  const oneYearBillField = form.getTextField(oneYearBillFieldName)
  const tenYearBillField = form.getTextField(tenYearBillFieldName)
  const twentyYearBillField = form.getTextField(twentyYearBillFieldName)

  nameField.setText(formData.name)
  oneYearBillField.setText(formData.oneYearBill)
  tenYearBillField.setText(formData.tenYearBill)
  twentyYearBillField.setText(formData.twentyYearBill)

  nameField.enableReadOnly()
  oneYearBillField.enableReadOnly()
  tenYearBillField.enableReadOnly()
  twentyYearBillField.enableReadOnly()

  return await pdfDoc.saveAsBase64()
}

module.exports.emailQuote = async data => {
  const customerAddr = data.inputs.email
  const agentAddr ="bensinclair@lunite.co.uk" // TODO change email addr
  const fromAddr = "quotes@lunite.co.uk" // TODO change email addr
  const subject = "Green Energy Together Solar Quote" // TODO Get preferred subject
  const customerText = "We've attached your Solar quotation" // TODO Get preferred wording and use dynamic template

  const pdfFormData = {
    name: String(data.inputs.name),
    oneYearBill: String(data.result.twentyYearOutlook[0].billBefore), // TOOD Round this and format with £
    tenYearBill: String(data.result.twentyYearOutlook[9].billBefore), // TOOD Round this and format with £
    twentyYearBill: String(data.result.twentyYearOutlook[19].billBefore), // TOOD Round this and format with £
  }

  const filledPDFQuote = await buildPDF(pdfFormData)

  const customerEmailData = {
    to: customerAddr,
    from: { email: fromAddr, name: "Green Energy Together" },
    subject,
    text: customerText,
    attachments: [
      {
        content: filledPDFQuote,
        filename: "Your_Solar_Quote.pdf", // TODO Get preffered wording
        type: "application/pdf",
        disposition: "attachment",
      },
    ],
  }

  const agentEmailData = {
    to: agentAddr,
    from: fromAddr,
    subject,
    text: JSON.stringify(data.inputs), // TODO Get preferred formatting
    attachments: [
      {
        content: filledPDFQuote,
        filename: "Your_Solar_Quote.pdf", // TODO Get preffered wording
        type: "application/pdf",
        disposition: "attachment",
      },
    ],
  }
  return await sgMail.send([customerEmailData, agentEmailData])
}
