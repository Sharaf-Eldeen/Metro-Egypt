const Station = require("../models/metroStationsModel.js");
const findTransferStation = require("../utils/findTransferStation.js");

const findMetroPath = async (req, res) => {
  const source = req.body.source;
  const destination = req.body.destination;

  try {
    const srcStation = await Station.findOne({ name: source }).select({
      line: 1,
      _id: 0,
    });
    const destStation = await Station.findOne({ name: destination }).select({
      line: 1,
      _id: 0,
    });

    if (!srcStation || !destStation) {
      return res
        .status(404)
        .json({ message: "One or both stations not found" });
    }

    const srcLine = srcStation.line;
    const destLine = destStation.line;

    const srcLineStations = await Station.find({ line: srcLine });
    const srcIndex = srcLineStations.findIndex(
      (station) => station.name === source
    );

    if (srcLine === destLine) {
      const destIndex = srcLineStations.findIndex(
        (station) => station.name === destination
      );

      if (srcIndex === -1 || destIndex === -1) {
        return res
          .status(404)
          .json({ message: "Source or destination not found on the line" });
      }

      const path =
        srcIndex < destIndex
          ? srcLineStations.slice(srcIndex, destIndex + 1)
          : srcLineStations.slice(destIndex, srcIndex + 1).reverse();

      res.json(path.map((station) => station.name));
    } else {
      const transferStationName = await findTransferStation(
        srcLine,
        destLine,
        srcIndex
      );

      if (!transferStationName) {
        return res
          .status(404)
          .json({ message: "No transfer station found between the lines" });
      }

      const destLineStations = await Station.find({ line: destLine });

      const transferIndex = srcLineStations.findIndex(
        (station) => station.name === transferStationName
      );

      if (srcIndex === -1 || transferIndex === -1) {
        return res.status(404).json({
          message: "Source or transfer station not found on the source line",
        });
      }

      const pathToTransfer =
        srcIndex < transferIndex
          ? srcLineStations.slice(srcIndex, transferIndex + 1)
          : srcLineStations.slice(transferIndex, srcIndex + 1).reverse();
      pathToTransfer.pop();

      const transferToDestIndex = destLineStations.findIndex(
        (station) => station.name === destination
      );

      const transferIndexInDes = destLineStations.findIndex(
        (station) => station.name === transferStationName
      );

      if (transferToDestIndex === -1) {
        return res
          .status(404)
          .json({ message: "Destination not found on the destination line" });
      }

      const pathFromTransfer =
        transferToDestIndex >= transferIndexInDes
          ? destLineStations.slice(transferIndexInDes, transferToDestIndex + 1)
          : destLineStations
              .slice(transferToDestIndex, transferIndexInDes + 1)
              .reverse();

      res.json(
        [...pathToTransfer, ...pathFromTransfer].map((station) => station.name)
      );
    }
  } catch (error) {
    console.error("Error finding route:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

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
