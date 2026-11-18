
require("dotenv").config();

const app = require("../src/app");
const connectDB = require("../src/config/db");

// Export aplikasi sebagai Vercel Serverless Function
module.exports = async (req, res) => {
  try {
    // Pastikan MongoDB terhubung sebelum request diproses
    await connectDB();

    // Jalankan aplikasi Express
    return app(req, res);
  } catch (error) {
    console.error("Database connection error:", error);

    return res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
};
