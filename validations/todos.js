const Validator = require("validator");
const validText = require("./valid-text")

module.exports = function validateTodoInput(data){
    let errors = {};

    data.title = validText(data.title) ? data.title : ""
    data.body = validText(data.body) ? data.body : ""

    if(!Validator.isLength(data.title, {min:4, max:140})){
        errors.text = 'Title must be at least 4 characters long, no more than 140'
    }

    if(!Validator.isLength(data.body, {min:4, max:140})){
        errors.body = 'Body must be at least 4 characters long, no more than 140'
    }

    if (Validator.isEmpty(data.title)){
        errors.title = "Title required"
    }
    
    if (Validator.isEmpty(data.body)){
        errors.body = "Body required"
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}