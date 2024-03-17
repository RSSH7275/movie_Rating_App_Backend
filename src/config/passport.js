require("dotenv").config();
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { tokenType } = require("./token");
const { User } = require("../models");

const jwtOptions = {
  secretOrKey: process.env.JWT_SCRT,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
//   console.log("what is payld", payload);

  try {
    if (payload.type !== tokenType.ACCESS) {
      throw new Error("Invalid token type");
    }

    const checkUser = await User.findById(payload.sub);

    if (checkUser) {
      return done(null, checkUser);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy,
};
