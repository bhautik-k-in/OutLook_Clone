const { ValidationError } = require('express-validation');
const APIError = require('../utils/APIError');

/**
 * Get Error Message
 * @param {*} err 
 * @returns 
 */
const getErrorMessage = (err, req, res, next) => {
    let error = err.details;
    let validateStack = [];
    if (error.params) error.params.map(item=> validateStack.push(item.message));
    else if (error.body) error.body.map(item => validateStack.push(item.message));
    else if (error.query) error.query.map(item => validateStack.push(item.message));
    return validateStack;
}

/**
 * ERROR HANDLER
 * @param {*} err 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.handler = (err, req, res, next) => {
    let message = err.message || "Something Went Wrong! Please try again later.";
    if (err.status === 422) message = "Invalid or Missing Parameters";
    else if (err.status === 500) {
        err.url = req.url
        err.errMsg = message
        return next(err);
    }
    return res.sendJson(err.status, message, err.data)
}

/**
 * ERROR CONVERTER
 * @param {*} err 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.converter = (err, req, res, next) => {
    let error = err;

    if (err instanceof ValidationError) {
        error = new APIError({ status: 422, data: getErrorMessage(err) });
    } else if (!(err instanceof APIError)) {
        error = new APIError({ status: 500, stack: err })
    }
    return this.handler(error, req, res, next);
}