const fs = require("fs")
const readline = require("readline")
const { google } = require("googleapis")
const { getNewToken, authorize } = require("./gmailAuth")

exports.handler = (req, res) => {
  // Load client secrets from a local file.
  fs.readFile("credentials.json", (err, content) => {
    if (err) return console.log("Error loading client secret file:", err)
    // Authorize a client with credentials, then call the Gmail API.
    authorize(JSON.parse(content))
  })
}
