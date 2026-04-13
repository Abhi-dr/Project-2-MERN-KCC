const mongoose = require("mongoose");

const MONGODB_URI = "apni mongo ka url enter kro";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.log("MongoDB error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;