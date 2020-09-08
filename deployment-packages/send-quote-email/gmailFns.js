const { google } = require('googleapis');
const { getEmailHTML } = require('./emailHTML');

const makeBody = (to, from, subject, message) => {
  const str = [
    'Content-Type: text/html; charset="UTF-8"\n',
    'MIME-Version: 1.0\n',
    'Content-Transfer-Encoding: 7bit\n',
    'to: ',
    to,
    '\n',
    'from: ',
    from,
    '\n',
    'subject: ',
    subject,
    '\n\n',
    message,
  ].join('');

  // eslint-disable-next-line no-undef
  const encodedMail = Buffer.from(str)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
  return encodedMail;
};

module.exports.sendEmail = (auth, results) => {
  let raw = makeBody(
    results.email,
    'admin@get-uk.com',
    'Your Quote',
    getEmailHTML(results),
  );
  const gmail = google.gmail({ version: 'v1', auth });
  gmail.users.messages.send(
    {
      auth,
      userId: 'me',
      resource: {
        raw,
      },
    },
    (err, response) => err || response,
  );
  raw = makeBody(
    'admin@get-uk.com',
    'admin@get-uk.com',
    'Your Quote',
    getEmailHTML(results, `Results JSON: ${results}`),
  );
  const gmail = google.gmail({ version: 'v1', auth });
  gmail.users.messages.send(
    {
      auth,
      userId: 'me',
      resource: {
        raw,
      },
    },
    (err, response) => err || response,
  );
};
