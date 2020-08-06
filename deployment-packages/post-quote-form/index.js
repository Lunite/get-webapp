const fs = require("fs")
const { google } = require("googleapis")
const { authorize } = require("./gmailAuth")

exports.handler = (req, res) => {
  // Load client secrets from a local file.
  fs.readFile("credentials.json", (err, content) => {
    if (err) return console.log("Error loading client secret file:", err)
    // Authorize a client with credentials, then call the Gmail API.
    authorize(JSON.parse(content), sendEmail)
  })
}

function makeBody(to, from, subject, message) {
  var str = [
    'Content-Type: text/plain; charset="UTF-8"\n',
    "MIME-Version: 1.0\n",
    "Content-Transfer-Encoding: 7bit\n",
    "to: ",
    to,
    "\n",
    "from: ",
    from,
    "\n",
    "subject: ",
    subject,
    "\n\n",
    message,
  ].join("")

  var encodedMail = new Buffer(str)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
  return encodedMail
}

const sendEmail = auth => {
  var raw = makeBody(
    "seifk007.319@wcgs.foliotrust.uk",
    "admin@get-uk.com",
    "This is your subject",
    "I got this working finally!!!"
  )
  const gmail = google.gmail({ version: "v1", auth })
  gmail.users.messages.send(
    {
      auth: auth,
      userId: "me",
      resource: {
        raw: raw,
      },
    },
    function (err, response) {
      return err || response
    }
  )
}

exports.handler("a", "b")
