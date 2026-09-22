const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Todo List API",
      version: "1.0.0",
      description: "Dokumentasi API Todo List"
    },

    servers: [
      {
        url: "/"
      }
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  },

  apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;