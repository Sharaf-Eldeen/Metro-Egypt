const express = require("express");
const router = express.Router();
const metroController = require("../controllers/metroStationsController.js");

router.get("/getStations", metroController.getAllStations);
router.post("/getPath", metroController.findMetroPath);

module.exports = router;
