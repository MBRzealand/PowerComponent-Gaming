const mongoose = require("mongoose");

const connectDB = (DB_URL) => {mongoose.connect(DB_URL)};

module.exports = connectDB;
