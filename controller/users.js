const { USERS, SENTMAILS } = require("../config/connection");
const APIError = require("../utils/APIError");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

/**
 * SEND EMAIL
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.sendMail = async (req, res, next) => {
    try {
        const { sender, receiver, subject, body } = req.body;
        if (sender != req.user.email) throw new APIError({ status: 422, data: `You can not use ${sender} to send mail. Please use your account email id` })

        const newMail = await SENTMAILS.create({ sender, receiver, subject, body });

        return res.sendJson(200, "Mail sent successfully", newMail);

    } catch (error) { next(error); }
}


/**
 * LOGIN USER
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const isUserExist = await USERS.findOne({ email: email });
        if (!isUserExist) throw new APIError({ status: 404, message: 'User not found with the given email' });

        const isPasswordValid = await bcrypt.compare(password, isUserExist.password);
        if (!isPasswordValid) throw new APIError({ status: 401, message: 'Email or Password is wrong' });

        const token = jwt.sign(isUserExist.toJSON(), "IUHGUIFIVARGIOIJOI34R53498RFHI34UT9");

        return res.sendJson(200, "USER LOGGED IN SUCCESSFUL", token)

    } catch (error) {
        next(error);
    }
}


/**
 * REGISTER A USER
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const isUserExist = await USERS.findOne({ email: email });
        if (isUserExist) throw new APIError({ status: 422, message: 'User already exists' });

        let newUser = (await USERS.create({ name, email, password })).toObject();
        delete newUser.password;

        return res.sendJson(201, "NEW USER CREATED", newUser);
    } catch (error) {
        next(error);
    }
}

exports.outbox = async (req, res, next) => {
    try {
        const { email } = req.user;

        const isUserExist = await USERS.findOne({ sender: email });
        if (!isUserExist) throw new APIError({ status: 404, message: "User does not exist"});
        
        const mails = await SENTMAILS.find({ sender: email }).sort('-createdAt');
        if (!mails.length) return res.sendJson(404, "No mails found for this user");

        return res.sendJson(200, "Mails", mails);

    } catch (error) {
        next(error);
    }
}

exports.inbox = async (req, res, next) => {
    try {
        const { email } = req.user;

        const isUserExist = await USERS.findOne({ sender: email });
        if (!isUserExist) throw new APIError({ status: 404, message: "User does not exist"});
        
        const mails = await SENTMAILS.find({ receiver: email }).sort('-createdAt');
        if (!mails.length) return res.sendJson(404, "No mails found for this user");

        return res.sendJson(200, "Mails", mails);

    } catch (error) {
        next(error);
    }
}