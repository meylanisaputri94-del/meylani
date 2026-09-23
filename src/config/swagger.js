const swaggerUiPath = swaggerUiDist.getAbsoluteFSPath();

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
  <link rel="stylesheet" href="/api-docs/swagger-ui.css">
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