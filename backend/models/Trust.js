const mongoose = require("mongoose");

const trustSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    trustName: {
      type: String,
      required: true,
    },

    registrationNumber: {
      type: String,
      required: true,
      unique: true,
    },

    category: {
      type: String,
      enum: ["Orphanage", "Old Age Home", "NGO", "Trust"],
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      required: true,
    },

    beneficiaries: {
      type: Number,
      default: 0,
    },

    certificate: {
      type: String,
      default: "",
    },

    verificationStatus: {
      type: String,
      enum: ["Pending", "Verified", "Rejected"],
      default: "Pending",
    },

    priorityScore: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Trust", trustSchema);