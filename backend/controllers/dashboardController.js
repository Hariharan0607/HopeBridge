const Donation = require("../models/Donation");
const Trust = require("../models/Trust");

// Donor Dashboard
exports.getDonorDashboard = async (req, res) => {
    try {

        const donations = await Donation.find({
            donorId: req.user._id
        }).populate("trustId");

        const totalAmount = donations.reduce(
            (sum, donation) => sum + donation.amount,
            0
        );

        //const trusts = await Trust.find({
        //    verificationStatus: "Verified"
        //});

        const trusts = await Trust.find();

        res.json({
            success: true,
            totalDonated: totalAmount,
            totalDonations: donations.length,
            recentDonations: donations,
            verifiedTrusts: trusts
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

// Trust Dashboard

exports.getTrustDashboard = async (req, res) => {

    try {

        const Trust = require("../models/Trust");

        const trust = await Trust.findOne({
            userId: req.user._id
        });

        if (!trust) {
            return res.status(404).json({
                success: false,
                message: "Trust not found"
            });
        }

        const Donation = require("../models/Donation");
        const Requirement = require("../models/Requirement");

        const donations = await Donation.find({
            trustId: trust._id
        });

        const requirement = await Requirement.findOne({
            trustId: trust._id
        });

        const totalFundsReceived = donations.reduce(
            (sum, donation) => sum + donation.amount,
            0
        );

        const remainingFunds =
            (requirement?.fundsNeeded || 0) - totalFundsReceived;

        res.json({
            success: true,
            trust,
            requirement,
            totalFundsReceived,
            remainingFunds,
            totalDonations: donations.length
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// Admin Dashboard

const User = require("../models/User");

exports.getAdminDashboard = async (req, res) => {

    try {

        const Trust = require("../models/Trust");
        const Donation = require("../models/Donation");
        const Requirement = require("../models/Requirement");

        const totalUsers = await User.countDocuments();

        const totalTrusts = await Trust.countDocuments();

        const totalDonations = await Donation.countDocuments();

        const totalDonationAmount = await Donation.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amount" }
                }
            }
        ]);

        const pendingRequirements = await Requirement.countDocuments({
            urgencyLevel: "High"
        });

        res.json({
            success: true,
            totalUsers,
            totalTrusts,
            totalDonations,
            totalDonationAmount:
                totalDonationAmount[0]?.total || 0,
            highPriorityRequirements: pendingRequirements
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};