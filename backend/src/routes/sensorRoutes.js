const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const { registerSensor, addSensorData, getFarmerSensorData, getDailyAverage, getMySensors } = require("../controllers/sensorController");
const { deleteSensor } = require("../controllers/sensorController");

// Only farmers can register sensors
router.post(
  "/register",
  authMiddleware,
  roleMiddleware(["farmer"]),
  registerSensor
);

// ESP32 sends data here (no JWT for now)
router.post("/data", addSensorData);

router.get(
  "/my-data",
  authMiddleware,
  roleMiddleware(["farmer"]),
  getFarmerSensorData
);


router.get(
  "/daily-average",
  authMiddleware,
  roleMiddleware(["farmer"]),
  getDailyAverage
);

router.get("/my-sensors", authMiddleware, roleMiddleware(["farmer"]), getMySensors);
module.exports = router;

router.delete(
  "/:sensorId",
  authMiddleware,
  roleMiddleware(["farmer"]),
  deleteSensor
);