const express = require("express");
const cors = require("cors");
const swaggerSpec = require("./config/swagger");

const todoRoutes = require("./routes/todo.routes");
const authRoutes = require("./routes/auth.routes");
const statsRoutes = require("./routes/stats.routes");

const logger = require("./middlewares/logger.middleware");
const notFound = require("./middlewares/notFound.middleware");
const errorHandler = require("./middlewares/errorHandler.middleware");

const app = express();

app.use(cors());
app.use(logger);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Todo API is running" });
});

// =========================
// SWAGGER API DOCUMENTATION
// =========================
app.get("/api-docs", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Todo List API - Swagger UI</title>
      <link
        rel="stylesheet"
        href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css"
      />
    </head>

    <body>
      <div id="swagger-ui"></div>

      <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
      <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-standalone-preset.js"></script>

      <script>
        window.onload = function () {
          const spec = ${JSON.stringify(swaggerSpec)};

          window.ui = SwaggerUIBundle({
            spec: spec,
            dom_id: "#swagger-ui",
            deepLinking: true,
            presets: [
              SwaggerUIBundle.presets.apis,
              SwaggerUIStandalonePreset
            ],
            layout: "StandaloneLayout"
          });
        };
      </script>
    </body>
    </html>
  `);
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/stats", statsRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;