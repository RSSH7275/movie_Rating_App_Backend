const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");


const userDataSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate: (value) => {
          if (validator.isEmail(value)) {
            return true;
          } else {
            return false;
          }
        },
      },
    password: {
      type: String,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
      required: true,
      trim: true,
      minLength: 8,
    },
  });


  
  userDataSchema.statics.isEmailExist = async function (email) {
    const srchEmail = await this.findOne({ email });
  
    return !!srchEmail;
  };
  
  userDataSchema.methods.isValidPasswrd = async function (password) {
    const isValid = await bcrypt.compare(password, this.password);
    
    return !!isValid;
  };
  
  const User = mongoose.model("userData", userDataSchema);
  
  module.exports = User;