/**
 * GENERATE GLOBAL RESPONSE SENDER
 * @param {*} status 
 * @param {*} message 
 * @param {*} response 
 * @returns 
 */
exports.sendJson = async function(status = 200, message = null, response = null) {
    let res = {
        status: status,
        message: message,
        data: response instanceof Array ? response : response instanceof Object ? response : typeof response === 'string' ? response : []
    }

    return this.status(200).send(res);
}