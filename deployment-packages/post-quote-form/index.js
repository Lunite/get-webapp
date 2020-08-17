const fs = require("fs")
const { authorize } = require("./gmailAuth")
const { sendEmail } = require("./gmailFns")
const { calculateQuote } = require("./quote")

const sampleFormValues = {
  name: "Kilian Seifert",
  email: "kisele606@gmail.com",
  phone: "07731894329",
  houseNumber: "34",
  street: "Manor Way",
  town: "Mitcham",
  postcode: "SY20 5EE",
  roof: {
    azimuth: 0,
    inclination: 20,
    area: 50,
  },
  property: {
    bedrooms: 3,
    eCar: false,
    pump: false,
    pool: false,
    heater: false,
  },
  eac: 100,
  ppw: 100,
  standingCharge: 100,
  discount: false, // -10%
}

// entry point for request
exports.handler = (req, res) => {
  // Load client secrets from a local file.
  // fs.readFile("credentials.json", (err, content) => {
  //   if (err) return console.log("Error loading client secret file:", err)
  //   // Authorize a client with credentials, then call the Gmail API.
  //   authorize(JSON.parse(content), sendEmail) // Authorizes using locally stored id then calls callback
  // })

  calculateQuote(sampleFormValues)
}
