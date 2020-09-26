const Joi = require('@hapi/joi');

function articlesValidation(data) {
    const schema = Joi.object({
        image: Joi.string().min(4).required(),
        title: Joi.string().min(3).max(100).required(),
        content: Joi.string().min(10).max(1000).required()
    });

    return schema.validate(data);
}

module.exports.articlesValidation= articlesValidation;