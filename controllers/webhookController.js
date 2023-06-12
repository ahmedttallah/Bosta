const axios = require("axios");

// Send webhook notification
const sendWebhookNotification = async (webhookUrl, data) => {
  try {
    await axios.post(webhookUrl, data);
    console.log("Webhook notification sent successfully");
  } catch (error) {
    console.error("Failed to send webhook notification:", error.message);
  }
};

module.exports = {
  sendWebhookNotification,
};
