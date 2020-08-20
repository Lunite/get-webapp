const fs = require('fs');
const { authorize } = require('./gmailAuth');
const { sendEmail } = require('./gmailFns');

/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
exports.handler = (event, context) => {
  //   const message = event.data
  //     ? Buffer.from(event.data, "base64").toString()
  //     : "Hello, World"

  // Reads client secret
  fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Gmail API.
    authorize(JSON.parse(content), sendEmail);
  });
};
