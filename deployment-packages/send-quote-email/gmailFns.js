const { google } = require("googleapis")

exports.sendEmail = auth => {
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

const makeBody = (to, from, subject, message) => {
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

  // eslint-disable-next-line no-undef
  var encodedMail = new Buffer(str)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
  return encodedMail
}
