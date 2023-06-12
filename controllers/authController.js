// Packages
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const { User } = require("../models");

// Helper function to send verification email
async function sendVerificationEmail(user) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const verificationLink = `${process.env.CLIENT_URL}/verify/${user.verificationToken}`;

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: user.email,
    subject: "Verify Your Email",
    html: `
      <h1>Verify Your Email</h1>
      <p>Click the link below to verify your email:</p>
      <a href="${verificationLink}">Verify Email</a>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully.");
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email.");
  }
}

module.exports = {
  signup: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      // Check if the email is already registered
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res
          .status(400)
          .json({ success: false, message: "Email is already registered" });
      }

      // Check if the username is already registered
      const existingUserName = await User.findOne({ where: { username } });
      if (existingUserName) {
        return res
          .status(400)
          .json({ success: false, message: "Username is already registered" });
      }

      // Generate verification token
      const verificationToken = uuidv4();

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the user in the database
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
        verificationToken,
        isVerified: false,
      });

      // Send verification email
      await sendVerificationEmail(user);

      res.status(201).json({
        success: true,
        message:
          "User registered. Please check your email to verify your account.",
      });
    } catch (error) {
      console.log("🚀 ~ file: authController.js:71 ~ signup: ~ error:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to register user" });
    }
  },

  verifyEmail: async (req, res) => {
    try {
      const { token } = req.params;

      // Find user by verification token
      const user = await User.findOne({ where: { verificationToken: token } });
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "Invalid verification token" });
      }

      // Update user's verification status
      user.isVerified = true;
      user.verificationToken = null;
      await user.save();

      res
        .status(200)
        .json({ success: true, message: "Email verified successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Failed to verify email" });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find user by email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid credentials" });
      }

      // Check if the user's email is verified
      if (!user.isVerified) {
        return res
          .status(401)
          .json({ success: false, message: "Email is not verified" });
      }

      // Compare the password
      const isPasswordMatched = await bcrypt.compare(password, user.password);
      if (!isPasswordMatched) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.status(200).json({ success: true, token });
    } catch (error) {
      console.log("🚀 ~ file: authController.js:156 ~ login: ~ error:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to authenticate user" });
    }
  },

  getCurrentUser: async (req, res) => {
    try {
      const { userId } = req;

      // Find user by ID
      const user = await User.findByPk(userId, {
        attributes: { exclude: ["password"] },
      });
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      res.status(200).json({ success: true, user });
    } catch (error) {
      console.log(
        "🚀 ~ file: authController.js:177 ~ getCurrentUser: ~ error:",
        error
      );
      res
        .status(500)
        .json({ success: false, message: "Failed to get current user" });
    }
  },
};
