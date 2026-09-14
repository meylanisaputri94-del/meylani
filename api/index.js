require("dotenv").config();

const app = require("../src/app");
const connectDB = require("../src/config/db");

let dbConnection;

async function handler(req, res) {
  try {
    if (!dbConnection) {
      dbConnection = connectDB();
    }

    await dbConnection;

    return app(req, res);
  } catch (error) {
    console.error("Database connection error:", error);
    return res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
}

module.exports = handler;