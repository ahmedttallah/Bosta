// Packages
const express = require("express");
const basicAuth = require("express-basic-auth");
const swaggerUi = require("swagger-ui-express");
const helmet = require("helmet");
const logger = require("morgan");
const cors = require("cors");
const hpp = require("hpp");
const xss = require("xss-clean");
const bodyParser = require("body-parser");

// Swagger Documentation
const swaggerDocs = require("./DOCS/Swagger");

// ENV Variables
require("dotenv").config();

// Create Server
const app = express();

// Initialize Swagger
// Define your basic auth options
const authOptions = {
  users: {
    admin: "admin@123",
  },
  challenge: true,
  realm: "Bosta",
};
app.use(
  "/api-docs",
  basicAuth(authOptions),
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs)
);

// Middlewares
app.use(cors());

app.use(logger("dev"));

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

// Prevent Http param pollution
app.use(hpp());

// Prevent XSS attacks
app.use(xss());

// Expose User Images
app.use(express.static(__dirname + "/public"));

// Routes
app.use("/api/v1", require("./routes"));

// Listening
const PORT = process.env.PORT;
app.listen(
  PORT,
  console.log(`[OK] Listening on http://localhost:${PORT} `)
);

module.exports = app;
