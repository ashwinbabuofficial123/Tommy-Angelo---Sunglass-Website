const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/tommy-angelo").then(() => {
  console.log("Database Connected");
});

module.exports = mongoose;
