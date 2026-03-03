const mongoose = require('mongoose');

async function connectDb(req, res) {
  try {
    const conn=await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected sucessfully")
  } catch (err) {
    console.log("Database connection failed", err);
  }
}

module.exports = connectDb;