const express=require("express");
const router=express.Router();
const logRoute=require("../controllers/loginUser");



// login route

router.post("/login",logRoute.loginUser);


module.exports=router;