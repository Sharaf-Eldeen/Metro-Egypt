const mongoose = require("mongoose");
const stationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  line: {
    type: String,
    required: true,
  },
  transitive: {
    type: Boolean,
    required: true,
  },
  interchangeWith: {
    type: [String],
    default: [],
  },
});

const stationModel = mongoose.model("Station", stationSchema);
module.exports = stationModel;
