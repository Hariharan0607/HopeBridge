const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  addRequirement,
  getRequirement,
  updateRequirement,
} = require("../controllers/requirementController");

router.post("/", protect, addRequirement);

router.get("/", protect, getRequirement);

router.put("/", protect, updateRequirement);

module.exports = router;