// custom validation function for joi schema
const validPass = (value, helpers) => {
    
    // console.log("value",value);
    // console.log("helper",helpers);

    if (value.length < 8) {
      return helpers.message("password must be at least 8 characters");
    }
    if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
      return helpers.message(
        "password must contain at least 1 Letter and 1 Number"
      );
    }
    return value;
  };


  

module.exports={validPass};