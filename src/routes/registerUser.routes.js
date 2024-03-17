const express=require("express");
const router=express.Router();
const regisUser=require("../controllers/registerUser");

// register route
router.post("/register",regisUser.createUser);

module.exports=router;