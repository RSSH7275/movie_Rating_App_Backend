const {regisSchema}=require("../validations/userSchema.validation");
const httpStatus = require("http-status");
const { newUser } = require("../services/regisUser.service");


const createUser = async (req, res) => {
    // console.log("what is req.body",req.body);
    try {
      const result = await regisSchema.body.validateAsync(req.body);
    //   console.log("what is res?",result);
      const userData = await newUser(result);
     //  console.log("userData",userData);
      res.status(httpStatus.CREATED).json(userData);
    } catch (error) {
     //  console.log("fh", error.isJoi);
     if(error.isJoi==true){
        res.status(httpStatus.UNPROCESSABLE_ENTITY).json(error.message);
     }
     else if(error.statusCode===200){
      res.status(httpStatus.OK).json(error.message);   
    }
     else{
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error.message);   
   }
    }
  };
  
  module.exports = { createUser };
  









