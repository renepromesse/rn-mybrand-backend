const Joi = require('@hapi/joi');

const contactValidation = data =>{
    const schema= Joi.object({
        name: Joi.string()
        .min(3)
        .max(50).required(),
        email:Joi.string()
        .min(5).max(100).email().required(),
        message:Joi.string().min(2).max(300).required()
    });

    return schema.validate(data);
}

module.exports.contactValidation= contactValidation;

