// Project Dependencies
const { URLCheck, User, Report, Tag } = require("../models");
const { sendEmailNotification } = require("./notificationController");
const { sendWebhookNotification } = require("./webhookController");

// Create a new URL check
const createURLCheck = async (req, res) => {
  try {
    const {
      name,
      url,
      protocol,
      path,
      port,
      webhook,
      timeout,
      interval,
      threshold,
      authenticationUsername,
      authenticationPassword,
      ignoreSSL,
      tags,
    } = req.body;
    const userId = req.userId;

    // Create the URL check
    const urlCheck = await URLCheck.create({
      name,
      url,
      protocol,
      path,
      port,
      webhook,
      timeout,
      interval,
      threshold,
      authenticationUsername,
      authenticationPassword,
      ignoreSSL,
      UserId: userId,
    });

    // Add tags to the URL check
    if (tags && Array.isArray(tags) && tags.length > 0) {
      const tagInstances = await Tag.bulkCreate(
        tags.map((tagName) => ({ name: tagName })),
        { ignoreDuplicates: true }
      );
      await urlCheck.addTags(tagInstances);
    }

    res.status(201).json({ success: true, data: urlCheck });
  } catch (error) {
    console.log("Error creating URL check:", error);
    res.status(400).json({ success: false, message: "Failed to create URL check" });
  }
};


// Get all URL checks for the authenticated user
const getAllURLChecks = async (req, res) => {
  try {
    const userId = req.userId; // Get the user ID from the authenticated user

    // Retrieve all URL checks associated with the authenticated user
    const urlChecks = await URLCheck.findAll({ where: { UserId: userId } });

    res.status(200).json({ success: true, data: urlChecks });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Failed to get URL checks" });
  }
};

// Get a specific URL check by ID for the authenticated user
const getURLCheckById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId; // Get the user ID from the authenticated user

    // Retrieve the URL check by ID and associated with the authenticated user
    const urlCheck = await URLCheck.findOne({ where: { id, UserId: userId } });

    if (!urlCheck) {
      return res
        .status(404)
        .json({ success: false, message: "URL check not found" });
    }

    res.status(200).json({ success: true, data: urlCheck });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Failed to get URL check" });
  }
};

// Update a specific URL check by ID for the authenticated user
const updateURLCheck = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, webhook } = req.body;

    // Find the URL Check by ID
    const urlCheck = await URLCheck.findByPk(id);

    // Check if the URL Check exists
    if (!urlCheck) {
      return res.status(404).json({
        success: false,
        message: "URL Check not found",
      });
    }

    // Update the URL Check status
    urlCheck.status = status;
    await urlCheck.save();

    // Get the associated user
    const user = await User.findByPk(urlCheck.UserId);

    // Send email notification to the user
    const subject = `URL Check Status Update`;
    const message = `The status of your URL check (${urlCheck.name}) has been updated to ${status}.`;
    await sendEmailNotification(user.email, subject, message);

    // Send webhook notification if webhook URL is provided
    if (webhook) {
      const data = {
        urlCheckId: urlCheck.id,
        status: urlCheck.status,
      };
      await sendWebhookNotification(webhook, data);
    }

    res.status(200).json({
      success: true,
      message: "URL Check updated successfully",
      data: urlCheck,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update URL Check",
      error: error.message,
    });
  }
};

// Delete a specific URL check by ID for the authenticated user
const deleteURLCheck = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId; // Get the user ID from the authenticated user

    // Find the URL check by ID and associated with the authenticated user
    const urlCheck = await URLCheck.findOne({ where: { id, UserId: userId } });

    if (!urlCheck) {
      return res
        .status(404)
        .json({ success: false, message: "URL check not found" });
    }

    // Delete the URL check
    await urlCheck.destroy();

    res.status(200).json({ success: true, message: "URL check deleted" });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Failed to delete URL check" });
  }
};

// Generate uptime report for a URL Check
const generateUptimeReport = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the URL Check by ID
    const urlCheck = await URLCheck.findByPk(id);

    // Check if the URL Check exists
    if (!urlCheck) {
      return res.status(404).json({
        success: false,
        message: "URL Check not found",
      });
    }

    // Retrieve the reports for the URL Check
    const reports = await Report.findAll({
      where: {
        URLCheckId: id,
      },
      order: [["createdAt", "ASC"]],
    });

    // Calculate availability, average response time, total uptime/downtime, and other metrics
    const availability = calculateAvailability(reports);
    const averageResponseTime = calculateAverageResponseTime(reports);
    const totalUptime = calculateTotalUptime(reports);
    const totalDowntime = calculateTotalDowntime(reports);

    res.status(200).json({
      success: true,
      data: {
        availability,
        averageResponseTime,
        totalUptime,
        totalDowntime,
        reports,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to generate uptime report",
      error: error.message,
    });
  }
};

// Calculate the availability percentage based on the reports
const calculateAvailability = (reports) => {
  // Calculate the total number of reports
  const totalReports = reports.length;

  // Calculate the number of successful reports
  const successfulReports = reports.filter(
    (report) => report.status === "UP"
  ).length;

  // Calculate the availability percentage
  const availability = (successfulReports / totalReports) * 100;

  return availability;
};

// Calculate the average response time based on the reports
const calculateAverageResponseTime = (reports) => {
  // Calculate the total number of reports
  const totalReports = reports.length;

  // Calculate the sum of response times
  const sumResponseTime = reports.reduce(
    (total, report) => total + report.responseTime,
    0
  );

  // Calculate the average response time
  const averageResponseTime = sumResponseTime / totalReports;

  return averageResponseTime;
};

// Calculate the total uptime based on the reports
const calculateTotalUptime = (reports) => {
  // Filter the reports with status "UP"
  const uptimeReports = reports.filter((report) => report.status === "UP");

  // Calculate the total uptime in seconds
  const totalUptime = uptimeReports.reduce(
    (total, report) => total + report.uptime,
    0
  );

  return totalUptime;
};

// Calculate the total downtime based on the reports
const calculateTotalDowntime = (reports) => {
  // Filter the reports with status "DOWN"
  const downtimeReports = reports.filter((report) => report.status === "DOWN");

  // Calculate the total downtime in seconds
  const totalDowntime = downtimeReports.reduce(
    (total, report) => total + report.downtime,
    0
  );

  return totalDowntime;
};

// Get reports by tag
const getReportsByTag = async (req, res) => {
  try {
    const { tagId } = req.params;

    // Find the tag by ID
    const tag = await Tag.findByPk(tagId);

    // Check if the tag exists
    if (!tag) {
      return res.status(404).json({
        success: false,
        message: "Tag not found",
      });
    }

    // Retrieve the reports for the tag
    const reports = await Report.findAll({
      include: [
        {
          model: URLCheck,
          where: {},
          include: [
            {
              model: Tag,
              where: { id: tagId },
              through: { attributes: [] },
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      data: {
        tag,
        reports,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get reports by tag",
      error: error.message,
    });
  }
};

module.exports = {
  createURLCheck,
  getAllURLChecks,
  getURLCheckById,
  updateURLCheck,
  deleteURLCheck,
  generateUptimeReport,
  getReportsByTag,
};
