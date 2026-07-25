const Donation = require("../models/Donation");
const Trust = require("../models/Trust");
const Requirement = require("../models/Requirement");

exports.getAnalytics = async (req, res) => {
    try {

        const totalDonation = await Donation.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amount" }
                }
            }
        ]);

        const totalTrusts = await Trust.countDocuments();

        const totalRequirements = await Requirement.countDocuments();

        const highPriority = await Requirement.countDocuments({
            urgencyLevel: "High"
        });

        res.json({
            success: true,
            analytics: {
                totalFunds: totalDonation[0]?.total || 0,
                totalTrusts,
                totalRequirements,
                highPriorityRequirements: highPriority
            }
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};