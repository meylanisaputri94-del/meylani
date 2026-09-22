require("dotenv").config();

const app = require("../src/app");
const connectDB = require("../src/config/db");

let isConnected = false;

module.exports = (req, res) => {
  if (!isConnected) {
    return connectDB()
      .then(() => {
        isConnected = true;
        app(req, res);
      })
      .catch((error) => {
        console.error("Serverless error:", error);

        res.status(500).json({
          message: "Internal Server Error",
          error: error.message
        });
      });
  }

  return app(req, res);
};