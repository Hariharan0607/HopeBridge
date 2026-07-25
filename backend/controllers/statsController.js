const Donation = require("../models/Donation");

exports.getStats = async (req,res)=>{

    try{

        const total=await Donation.aggregate([
            {
                $group:{
                    _id:null,
                    amount:{
                        $sum:"$amount"
                    }
                }
            }
        ]);

        res.json({

            success:true,

            totalDonation:total[0]?.amount||0

        });

    }catch(err){

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

}