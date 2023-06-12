// Packages
const router = require("express").Router();

// Project dependencies
const {
  signup,
  verifyEmail,
  login,
  getCurrentUser,
} = require("../controllers");
const { authenticate } = require("../middleware/authMiddleware");

// @Desc      : Signup A New User
// @Method    : [POST]
// @Route     : /api/v1/auth/signup
router.post("/signup", signup);

// @Desc      : Verify the user token
// @Method    : [GET]
// @Route     : /api/v1/auth/verify/:token
router.get("/verify/:token", verifyEmail);

// @Desc      : Login A User
// @Method    : [POST]
// @Route     : /api/v1/auth/login
router.post("/login", login);

// @Desc      : GEt Current User
// @Method    : [GET]
// @Route     : /api/v1/auth/current-user
router.get("/current-user", authenticate, getCurrentUser);

module.exports = router;
