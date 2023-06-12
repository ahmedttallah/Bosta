// Packages
const router = require("express").Router();

// Project dependencies
const { authenticate } = require("../middleware/authMiddleware");
const {
  createURLCheck,
  getAllURLChecks,
  getURLCheckById,
  updateURLCheck,
  deleteURLCheck,
  generateUptimeReport,
  getReportsByTag,
} = require("../controllers");

// Protect routes that require authentication
router.use(authenticate);

// @Desc      : Create a new URL Check
// @Method    : [POST]
// @Route     : /api/v1/url-check/
router.post("/", createURLCheck);

// @Desc      : Get all URL Checks
// @Method    : [GET]
// @Route     : /api/v1/url-check/
router.get("/", getAllURLChecks);

// @Desc      : Get a specific URL Check by ID
// @Method    : [GET]
// @Route     : /api/v1/url-check/:id
router.get("/:id", getURLCheckById);

// @Desc      : Update a specific URL Check by ID
// @Method    : [PUT]
// @Route     : /api/v1/url-check/:id
router.put("/:id", updateURLCheck);

// @Desc      : Delete a specific URL Check by ID
// @Method    : [DELETE]
// @Route     : /api/v1/url-check/:id
router.delete("/:id", deleteURLCheck);

// @Desc      : Generate uptime report for a URL Check
// @Method    : [GET]
// @Route     : /api/v1/url-check/:id/reports
router.get("/:id/reports",  generateUptimeReport);

// @Desc      : Get reports by tag
// @Method    : [GET]
// @Route     : /api/v1/url-check/tags/:tagId/reports
router.get("/tags/:tagId/reports",  getReportsByTag);

module.exports = router;
