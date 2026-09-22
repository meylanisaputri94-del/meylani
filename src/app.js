const express = require("express");
const cors = require("cors");

const swaggerSpec = require("./config/swagger");

const todoRoutes = require("./routes/todo.routes");
const authRoutes = require("./routes/auth.routes");
const statsRoutes = require("./routes/stats.routes");

const app = express();

app.use(cors());
app.use(express.json());

// Home
app.get("/", (req, res) => {
  res.json({
    message: "Todo API is running"
  });
});

// =========================
// SWAGGER UI
// =========================

const swaggerUiPath = require("swagger-ui-dist").getAbsoluteFSPath();

app.use(
  "/api-docs",
  express.static(swaggerUiPath)
);

app.get("/api-docs", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Todo List API</title>

  <link
    rel="stylesheet"
    href="/api-docs/swagger-ui.css"
  >
</head>

<body>
  <div id="swagger-ui"></div>

  <script src="/api-docs/swagger-ui-bundle.js"></script>
  <script src="/api-docs/swagger-ui-standalone-preset.js"></script>

  <script>
    window.onload = function () {
      window.ui = SwaggerUIBundle({
        spec: ${JSON.stringify(swaggerSpec)},
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

app.get("/api-docs/", (req, res) => {
  res.redirect("/api-docs");
});

// =========================
// API ROUTES
// =========================

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/stats", statsRoutes);

// =========================
// 404
// =========================

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});

// =========================
// ERROR HANDLER
// =========================

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error"
  });
});

module.exports = app;