class APIError extends Error {
    constructor({ message, error, status = 500, stack, data }) {
        super(message);
        this.message = message;
        this.error = error;
        this.status = status;
        this.stack = stack;
        this.data = data;
    }
}

module.exports = APIError;