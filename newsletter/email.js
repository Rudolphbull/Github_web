require("dotenv").config();
const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: 'apikey', // this literally stays as 'apikey'
    pass: process.env.SENDGRID_API_KEY
  }
});

async function sendWelcomeEmail(email, firstName) {
  try {
    const info = await transport.sendMail({
      from: 'GMA Technologies <info@gmatechnologies.com>',
      to: email,
      subject: 'Welcome to GMA Technologies!',
      html: `<p>Hi ${firstName},</p><p>Welcome aboard! 🎉</p>`
    });
    console.log("Email sent:", info.messageId);
  } catch (err) {
    console.error("Error sending email:", err);
  }
}

module.exports = sendWelcomeEmail;
