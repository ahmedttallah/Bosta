// Mock the notification service
const { sendEmailNotification } = require("../controllers/notificationController");
const {sendWebhookNotification} = require("../controllers/webhookController");

jest.mock("../controllers/notificationController");
jest.mock("../controllers/webhookController");

describe("Notification Sending", () => {
  it("should send email notification", async () => {
    // Mock the sendEmailNotification function
    sendEmailNotification.mockResolvedValue(true);

    // Call the function that triggers the email notification
    const result = await sendEmailNotification();

    expect(result).toBe(true);
    expect(sendEmailNotification).toHaveBeenCalledTimes(1);
  });

  it("should send webhook notification", async () => {
    // Mock the sendWebhookNotification function
    sendWebhookNotification.mockResolvedValue(true);

    // Call the function that triggers the webhook notification
    const result = await sendWebhookNotification();

    expect(result).toBe(true);
    expect(sendWebhookNotification).toHaveBeenCalledTimes(1);
  });
});
