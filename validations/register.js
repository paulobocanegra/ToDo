const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function (data) { 
    let errors = {};

    data.email = validText(data.email) ? data.email : "";
    data.username = validText(data.username) ? data.username : "";
    data.password = validText(data.password) ? data.password : "";

    if (!Validator.isLength(data.password, { min: 2, max: 30 })) {
        errors.password = "invalid password"
    }

    if (!Validator.isLength(data.username, { min: 4, max: 30 })) {
        errors.username = "invalid username"
    }

    if (!Validator.isEmail(data.email)) errors.email = "invalid Email";
    if (Validator.isEmpty(data.email)) errors.email = "email required";

    if (Validator.isEmpty(data.password)) errors.password = "password Required";
        

    return {
        errors,
        isValid: Object.keys(errors).length === 0, 
    }


}