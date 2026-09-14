const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo List API",
      version: "1.0.0",
      description:
        "Dokumentasi API Todo List — dibangun bertahap dari seri artikel backend Node.js",
    },
servers: [
  { url: "/", description: "Current Server (Auto Detect / Vercel)" },
  { url: "http://localhost:3000", description: "Local development server" }, 
], 
 
    components: { 
      securitySchemes: { 
        bearerAuth: { 
          type: "http", 
          scheme: "bearer", 
          bearerFormat: "JWT", 
        }, 
        apiKeyAuth: { 
          type: "apiKey", 
          in: "header", 
          name: "x-api-key", 
        }, 
      }, 
    }, 
  }, 
 
  apis: ["./src/routes/*.js"], 
}; 
 
const swaggerSpec = swaggerJSDoc(options); 
 
module.exports = swaggerSpec; 