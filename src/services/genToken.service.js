require("dotenv").config();
const jsonToken =require("jsonwebtoken");
const {tokenType}=require("../config/token");



const tokenCreate = (id, expires, type, secret = process.env.JWT_SCRT) => {
    const payload={
      sub:id,
      type:type,
      exp:expires,
      iat:Date.now()/1000,
    }
  
    const token=jsonToken.sign(payload,secret);
    return token;
  };

  
  const jwtTokenGenrate = async (userDat) => {
    // console.log(userDat);
    const tokenValidTimer= Math.floor(Date.now()/1000) + process.env.JWT_ACSS_EXPIR_TIMER_IN_MIN*60 ;  // convert this into secs
    const tokenKey= await tokenCreate(userDat._id,tokenValidTimer,tokenType.ACCESS);
    const result={token: {key: tokenKey,expireIn: new Date(tokenValidTimer*1000)}};
    // console.log("result",result);
    return result;  
  };
  
  module.exports = {
    tokenCreate,
    jwtTokenGenrate,
  };
  