const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    getDonorDashboard,
    getTrustDashboard,
    getAdminDashboard
} = require("../controllers/dashboardController");

router.get("/donor", protect, getDonorDashboard);

router.get("/trust", protect, getTrustDashboard);

router.get("/admin", protect, getAdminDashboard);

module.exports = router;