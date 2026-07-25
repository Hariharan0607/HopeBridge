const express=require("express");

const router=express.Router();

const protect=require("../middleware/authMiddleware");

const {

predict

}=require("../controllers/predictionController");

router.get("/",protect,predict);

module.exports=router;