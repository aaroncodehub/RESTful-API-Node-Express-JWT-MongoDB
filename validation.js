// Validation
const Joi = require('@hapi/joi');
const { Schema } = require('mongoose');

// Register Validation
const registerValidation = (data) =>{

   const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data)

}

// Login Validation
const loginValidation = (data) =>{

    const schema = Joi.object({
         email: Joi.string().min(6).required().email(),
         password: Joi.string().min(6).required()
     });
     return schema.validate(data)
 
}
 
// Post Validation
const postValidation = (data) =>{

    const schema = Joi.object({
         title: Joi.string().min(6).required(),
         content: Joi.string().min(6).required()
     });
     return schema.validate(data)
 
 }

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
module.exports.postValidation = postValidation