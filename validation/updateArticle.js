const Joi = require('@hapi/joi');

function updateValidation(data) {
    const schema = Joi.object({
        image: Joi.string().min(4),
        title: Joi.string().min(3).max(100),
        content: Joi.string().min(10).max(1000)
    });

    return schema.validate(data);
}

module.exports.updateValidation= updateValidation;