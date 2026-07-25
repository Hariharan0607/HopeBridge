const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createTrustProfile,
  getTrustProfile,
  updateTrustProfile,
  verifyTrust
} = require("../controllers/trustController");

router.post("/", protect, createTrustProfile);

router.get("/", protect, getTrustProfile);

router.put("/", protect, updateTrustProfile);

router.put("/verify/:id", protect, verifyTrust);

module.exports = router;