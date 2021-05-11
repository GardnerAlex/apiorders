const sgMail = require('@sendgrid/mail');
const validator = require('email-validator');
require('dotenv').config();

export async function sendMail(req) {
  const parsedBody = { ...req };
  let sendResult;
  try {
    // console.log('req', req);
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const default_email = process.env.DEFAULT_EMAIL;
    let email;
    parsedBody.phone = `${parsedBody.phone}`;
    if (validator.validate(parsedBody.email)) {
      email = parsedBody.email;
    } else {
      email = default_email;
    }
    delete parsedBody.email;
    if (validator.validate(email)) {
      const msg = {
        to: email,
        from: 'sber.inapp@yandex.ru',
        subject: 'Письмо от авто рассылки',
        text: JSON.stringify(parsedBody),
      };
      await sgMail.send(msg)
        .then((res) => {
          sendResult = { success: true, error: null };
        })
        .catch(e => {
          console.log('sendMail error', e);
          sendResult = { success: false, error: e };
        });
    }
  } catch (e) {
    console.log('sendMail module general error', e);
    sendResult = { success: false, error: e };
  }
  return sendResult;
}
