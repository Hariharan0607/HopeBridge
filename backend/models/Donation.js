const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
{
    donorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    trustId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Trust",
        required:true
    },

    amount:{
        type:Number,
        required:true
    },

    paymentStatus:{
        type:String,
        enum:["Pending","Successful","Failed"],
        default:"Successful"
    }

},
{timestamps:true}
);

module.exports = mongoose.model("Donation", donationSchema);