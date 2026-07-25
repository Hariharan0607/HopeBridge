const Requirement = require("../models/Requirement");
const Trust = require("../models/Trust");

// Add Requirement
exports.addRequirement = async (req, res) => {
  try {
    const trust = await Trust.findOne({ userId: req.user._id });

    if (!trust) {
      return res.status(404).json({
        success: false,
        message: "Trust not found",
      });
    }

    const requirement = await Requirement.create({
      trustId: trust._id,
      ...req.body,
    });

    res.status(201).json({
      success: true,
      message: "Requirement Added",
      data: requirement,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Requirement
exports.getRequirement = async (req, res) => {
  try {
    const trust = await Trust.findOne({ userId: req.user._id });

    const requirement = await Requirement.findOne({
      trustId: trust._id,
    });

    res.json({
      success: true,
      data: requirement,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Requirement
exports.updateRequirement = async (req, res) => {
  try {
    const trust = await Trust.findOne({ userId: req.user._id });

    const requirement = await Requirement.findOneAndUpdate(
      { trustId: trust._id },
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      message: "Requirement Updated",
      data: requirement,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};