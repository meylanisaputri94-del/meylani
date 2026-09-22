const swaggerPath = swaggerUiDist.getAbsoluteFSPath();

const swaggerCss = fs.readFileSync(
  path.join(swaggerPath, "swagger-ui.css"),
  "utf8"
);

const swaggerBundle = fs.readFileSync(
  path.join(swaggerPath, "swagger-ui-bundle.js"),
  "utf8"
);

const swaggerPreset = fs.readFileSync(
  path.join(swaggerPath, "swagger-ui-standalone-preset.js"),
  "utf8"
);

app.get("/api-docs", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Todo List API</title>

  <style>
    ${swaggerCss}
  </style>
</head>

<body>
  <div id="swagger-ui"></div>

  <script>
    ${swaggerBundle}
  </script>

  <script>
    ${swaggerPreset}
  </script>

  <script>
    window.onload = function () {
      SwaggerUIBundle({
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