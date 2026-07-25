console.log("APP LOADED");
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const trustRoutes = require("./routes/trustRoutes"); 
const requirementRoutes = require("./routes/requirementRoutes");
const donationRoutes=require("./routes/donationRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const priorityRoutes = require("./routes/priorityRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const activityRoutes = require("./routes/activityRoutes");
const predictionRoutes=require("./routes/predictionRoutes");

console.log("AUTH ROUTES IMPORTED");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 HopeBridge Backend Running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/trust", trustRoutes);
app.use("/api/requirements", requirementRoutes);
app.use("/api/donations",donationRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/priority", priorityRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/predict",predictionRoutes);

module.exports = app;