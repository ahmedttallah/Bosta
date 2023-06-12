// Package
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Function to send email notification
const sendEmailNotification = async (toEmail, subject, message) => {
  try {
    const msg = {
      to: toEmail,
      from: process.env.EMAIL_USERNAME,
      subject: subject,
      text: message,
      html: "<strong>Ahmed Attallah</strong>",
    };

    // Send the email
    await sgMail.send(msg);

    console.log("Email notification sent successfully");
  } catch (error) {
    console.error("Failed to send email notification:", error);
  }
};

module.exports = {
  sendEmailNotification,
};
