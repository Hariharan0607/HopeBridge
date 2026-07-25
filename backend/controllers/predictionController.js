const Trust = require("../models/Trust");
const Requirement = require("../models/Requirement");

const predictRequirement =
require("../ml/predictor");

exports.predict = async (req,res)=>{

try{

const trust=await Trust.findOne({

userId:req.user.id

});

const requirement=await Requirement.findOne({

trustId:trust._id

});

const prediction=predictRequirement(

trust.beneficiaries,

requirement.fundsNeeded,

trust.priorityScore

);

res.json({

success:true,

prediction

});

}

catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

}