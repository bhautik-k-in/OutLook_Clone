const Joi = require('joi');

exports.login = {
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
}

exports.register = {
    body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })
}

exports.send_mail = {
    body: Joi.object({
        sender: Joi.string().email().required(),
        receiver:Joi.string().email().required(),
        subject: Joi.string().required().min(2).max(100),
        body: Joi.string().required().min(15).max(1500)
    })
}