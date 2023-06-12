const {
  signup,
  verifyEmail,
  login,
  getCurrentUser,
} = require("./authController");

const {
  createURLCheck,
  getAllURLChecks,
  getURLCheckById,
  updateURLCheck,
  deleteURLCheck,
  generateUptimeReport,
  getReportsByTag,
} = require("./urlCheckController");

module.exports = {
  signup,
  verifyEmail,
  login,
  getCurrentUser,
  createURLCheck,
  getAllURLChecks,
  getURLCheckById,
  updateURLCheck,
  deleteURLCheck,
  generateUptimeReport,
  getReportsByTag,
};
