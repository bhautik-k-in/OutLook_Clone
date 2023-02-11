const APIError = require("../utils/APIError");
const jwt = require('jsonwebtoken');
const { USERS } = require("../config/connection");

/**
 * AUTHENTICATION
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.isAuth = (req, res, next) => async (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        if (!token) throw new APIError({ status: 401, message: "TOKEN IS REQUIRED" })

        jwt.verify(token, "IUHGUIFIVARGIOIJOI34R53498RFHI34UT9", async (err, result) => {
            if (err) throw new APIError({ status: 401, message: err.message });

            const isUserExist = await USERS.findOne({ email: result.email });
            if (!isUserExist) return res.sendJson(404, "User does not exist")
            req.user = isUserExist;
            next();
        })

    } catch (error) {
        next(error);
    }
}