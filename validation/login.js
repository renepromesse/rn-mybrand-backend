const Joi = require('@hapi/joi');

const loginValidation = data =>{
    const schema=Joi.object({
        email: Joi.string().min(5).required(),
        password:Joi.string().min(4).required()
    });

    return schema.validate(data);
};

module.exports.loginValidation= loginValidation;

