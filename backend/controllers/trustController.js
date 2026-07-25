const Trust = require("../models/Trust");

// Create Trust Profile
exports.createTrustProfile = async (req, res) => {
  try {
    const existing = await Trust.findOne({ userId: req.user._id });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Trust profile already exists",
      });
    }

    const trust = await Trust.create({
      userId: req.user._id,
      ...req.body,
    });

    res.status(201).json({
      success: true,
      message: "Trust profile created successfully",
      data: trust,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Trust Profile
exports.getTrustProfile = async (req, res) => {
  try {
    const trust = await Trust.findOne({ userId: req.user._id });

    if (!trust) {
      return res.status(404).json({
        success: false,
        message: "Trust profile not found",
      });
    }

    res.json({
      success: true,
      data: trust,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Trust Profile
exports.updateTrustProfile = async (req, res) => {
  try {
    const trust = await Trust.findOneAndUpdate(
      { userId: req.user._id },
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      message: "Trust profile updated",
      data: trust,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin Verify Trust
exports.verifyTrust = async (req, res) => {
    try {

        const trust = await Trust.findByIdAndUpdate(
            req.params.id,
            {
                verificationStatus: "Verified"
            },
            {
                new: true
            }
        );

        res.json({
            success: true,
            message: "Trust Verified Successfully",
            data: trust
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};