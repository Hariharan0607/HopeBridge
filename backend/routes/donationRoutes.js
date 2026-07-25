const express=require("express");

const router=express.Router();

const protect=require("../middleware/authMiddleware");

const {
createDonation,
getMyDonations,
smartDonation
}=require("../controllers/donationController");

router.post("/",protect,createDonation);

router.post("/smart", protect, smartDonation);

router.get("/",protect,getMyDonations);

module.exports=router;