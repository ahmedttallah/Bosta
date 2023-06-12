const jwt = require("jsonwebtoken");
const { User } = require("../models");

// Middleware to verify the JWT token
const authenticate = (req, res, next) => {
  try {
    // Get the token from the request headers
    const token = req.headers.authorization.split(" ")[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user ID to the request
    req.userId = decoded.userId;

    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

module.exports = { authenticate };
