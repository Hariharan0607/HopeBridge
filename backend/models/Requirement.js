const mongoose = require("mongoose");

const requirementSchema = new mongoose.Schema(
  {
    trustId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trust",
      required: true,
    },

    foodNeeded: {
      type: Number,
      default: 0,
    },

    clothesNeeded: {
      type: Number,
      default: 0,
    },

    medicineNeeded: {
      type: Number,
      default: 0,
    },

    educationNeeded: {
      type: Number,
      default: 0,
    },

    fundsNeeded: {
      type: Number,
      default: 0,
    },

    urgencyLevel: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Requirement", requirementSchema);