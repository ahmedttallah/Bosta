const router = require("express").Router();

// @Desc      : Authentication Routes
// @Route     : /api/v1/auth
router.use("/auth", require("./authRoutes"));

// @Desc      : URL Check Routes
// @Route     : /api/v1/url-check
router.use("/url-check", require("./urlCheckRoutes"));

module.exports = router;
