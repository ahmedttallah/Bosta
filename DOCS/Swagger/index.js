// Apis
const authRoutesDocs = require("./auth.docs");

const swaggerDoc = {
  openapi: "3.0.0",
  info: {
    title: "Bosta Test API",
    version: "1.0.0",
    description: "A Library API for Bosta Test app.",
  },
  servers: [
    {
      url: `/api/v1`,
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [{ bearerAuth: [] }],
  paths: {
    ...authRoutesDocs,
  },
};

// Set dynamic host parameter in Swagger doc
swaggerDoc.host = "${req.headers.host}";

module.exports = swaggerDoc;
