const Joi = require("@hapi/joi");

function commentsValidation(data) {
    const schema= Joi.object({
        name: Joi.string().min(3).max(60).required(),
        email: Joi.string().min(5).max(60).email().required(),
        comment: Joi.string().min(2).max(200).required()
    });
    return schema.validate(data);
}

module.exports.commentsValidation = commentsValidation;