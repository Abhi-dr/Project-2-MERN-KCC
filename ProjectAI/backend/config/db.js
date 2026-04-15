const mongoose = require("mongoose");

const MONGODB_URI = "mongodb://piyushsahuys_db_user:lffCThz1I93ChaQB@ac-nobg2ka-shard-00-00.vguaikl.mongodb.net:27017,ac-nobg2ka-shard-00-01.vguaikl.mongodb.net:27017,ac-nobg2ka-shard-00-02.vguaikl.mongodb.net:27017/?ssl=true&replicaSet=atlas-e7aotn-shard-0&authSource=admin&appName=testdb";

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