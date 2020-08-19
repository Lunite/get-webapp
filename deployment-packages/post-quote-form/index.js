const fs = require("fs")
const { authorize } = require("./gmailAuth")
const { sendEmail } = require("./gmailFns")
const { calculateQuote } = require("./quote")

const sampleFormValues = {
  name: "Bob Stevens",
  email: "bob@gmail.com",
  phone: "000-000-000",
  houseNumber: "17",
  street: "Severn Rd",
  town: "Stoke-On-Trent",
  postcode: "GL20 5AF",
  roof: {
    azimuth: 13,
    inclination: 30,
    area: 100,
  },
  property: {
    bedrooms: 3,
    eCar: false,
    pool: true,
    heater: false,
  },
  aec: 3500,
  ppw: 20,
  standingChange: 20,
  discount: false,
}

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.handler = async (req, res) => {
  // Load client secrets from a local file.
  // fs.readFile("credentials.json", (err, content) => {
  //   if (err) return console.log("Error loading client secret file:", err)
  //   // Authorize a client with credentials, then call the Gmail API.
  //   authorize(JSON.parse(content), sendEmail) // Authorizes using locally stored id then calls callback
  // })

  res.set("Access-Control-Allow-Origin", "*")
  res.set("Access-Control-Allow-Methods", "POST")
  res.set("Access-Control-Allow-Headers", "Content-Type")
  console.log("inputs", req.body)
  try {
    const result = await calculateQuote(req.body)
    console.log(result)
    res.json(result)
  } catch (error) {
    res.json(error)
  }
}
