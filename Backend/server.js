const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const metroRoute = require("./routes/metro.js");

const PORT = process.env.PORT || 5500;
mongoose
  .connect(process.env.mongoUri, {})
  .then(() => {
    console.log("Connected To DB....");
  })
  .catch((error) => {
    console.log("Failed To Connect To DB....");
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/metro", metroRoute);

app.listen(PORT, (req, res) => {
  console.log(
    `The server is running in ${process.env.env_mode} mode at port ${PORT}`
  );
});
