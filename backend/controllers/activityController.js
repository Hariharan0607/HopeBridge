const ActivityLog = require("../models/ActivityLog");

exports.getActivities = async (req, res) => {

    try {

        const activities = await ActivityLog
            .find()
            .sort({ createdAt: -1 });

        res.json({

            success: true,

            data: activities

        });

    } catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};