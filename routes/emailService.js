// emailService.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',  // or use SMTP details
  auth: {
    user: 'krishnasingh040902@gmail.com',  // your email
    pass: 'fmmonulrkgumzpyj',  // your email password or app password
  },
});

async function sendOrderConfirmationEmail(to) {
  const mailOptions = {
    from: 'krishnasingh040902@gmail.com',
    to: to,
    subject: 'Login Successful',
    text: 'You have just logged in to Arjun Jewellers. Thankyou for visiting. Happy Shopping!',
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Log in email sent successfully.');
  } catch (error) {
    console.error('Error sending login email:', error);
  }
}

module.exports = { sendOrderConfirmationEmail };
