const Trust = require("../models/Trust");
const Requirement = require("../models/Requirement");
const Donation = require("../models/Donation");

const PriorityQueue = require("../utils/priorityQueue");

exports.calculatePriority = async (req, res) => {

    try {

        const queue = new PriorityQueue();

        const trusts = await Trust.find();

        for (const trust of trusts) {

            const requirement = await Requirement.findOne({
                trustId: trust._id
            });

            if (!requirement) continue;

            const donations = await Donation.find({
                trustId: trust._id
            });

            const received = donations.reduce(
                (sum, donation) => sum + donation.amount,
                0
            );

            const urgencyMap = {
                Low: 1,
                Medium: 2,
                High: 3
            };

            const urgency =
                urgencyMap[requirement.urgencyLevel] || 1;

            const score =
                (urgency * 50) +
                (trust.beneficiaries || 0)* 0.2 +
                (requirement.fundsNeeded / 1000) -
                (received / 1000);

            trust.priorityScore = score;

            await trust.save();

            queue.enqueue(trust);

        }

        res.json({

            success: true,

            priorityList: queue.getAll()

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};