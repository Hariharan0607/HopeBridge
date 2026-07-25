const Donation = require("../models/Donation");
const Trust = require("../models/Trust");

// Create Donation
exports.createDonation = async (req,res)=>{

    try{

        const donation = await Donation.create({

            donorId:req.user._id,

            trustId:req.body.trustId,

            amount:req.body.amount

        });

        res.status(201).json({

            success:true,

            message:"Donation Successful",

            data:donation

        });

    }catch(err){

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

};


// My Donations

exports.getMyDonations = async(req,res)=>{

    try{

        const donations = await Donation.find({

            donorId:req.user._id

        }).populate("trustId");

        res.json({

            success:true,

            data:donations

        });

    }catch(err){

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

};

// Smart Donation
exports.smartDonation = async (req, res) => {
    try {

        const trust = await Trust.findOne()
            .sort({ priorityScore: -1 });

        if (!trust) {
            return res.status(404).json({
                success: false,
                message: "No Trust Found"
            });
        }

        const donation = await Donation.create({
            donorId: req.user._id,
            trustId: trust._id,
            amount: req.body.amount
        });

        res.status(201).json({
            success: true,
            message: "Donation Allocated Successfully",
            allocatedTrust: trust.trustName,
            data: donation
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};