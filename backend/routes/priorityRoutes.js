const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    calculatePriority
} = require("../controllers/priorityController");

router.get("/", protect, calculatePriority);

module.exports = router;