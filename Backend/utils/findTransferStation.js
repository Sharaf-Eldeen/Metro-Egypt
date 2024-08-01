const Station = require("../models/metroStationsModel.js");

const findTransferStation = async (srcLine, destLine, srcIndex) => {
  const stationsAtSrcLineArr = await Station.find({ line: srcLine });

  const transferStationIndexes = stationsAtSrcLineArr
    .map((station, index) => ({
      station,
      index,
    }))
    .filter(({ station }) => station.interchangeWith.includes(destLine))
    .map(({ index }) => index);

  if (transferStationIndexes.length === 0) {
    return null;
  }

  let nearestIndex = transferStationIndexes[0];
  let minDistance = Math.abs(srcIndex - nearestIndex);

  transferStationIndexes.forEach((index) => {
    const distance = Math.abs(srcIndex - index);
    if (distance < minDistance) {
      nearestIndex = index;
      minDistance = distance;
    }
  });

  return stationsAtSrcLineArr[nearestIndex].name;
};

module.exports = findTransferStation;
