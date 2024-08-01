const Station = require("../models/metroStationsModel.js");
const findTransferStation = require("../utils/findTransferStation.js");

const getAllStations = async (req, res) => {
  try {
    const stationsObjArr = await Station.find({});
    const stationsNameArr = stationsObjArr.map((station) => station.name);
    const uniquestationsNameArr = [...new Set(stationsNameArr)];
    res.json(uniquestationsNameArr);
  } catch (error) {
    console.error("Error fetching stations:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { findMetroPath, getAllStations };
