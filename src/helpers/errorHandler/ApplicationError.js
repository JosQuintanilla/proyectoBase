const {
    NO_CONTENT,
    INTERNAL_SERVER_ERROR,
    UNAUTHORIZED,
    FORBIDDEN,
    NOT_FOUND,
    BAD_REQUEST,
    CONFLICT,
    LOCKED,
    getStatusText
} = require('http-status-codes');

class ApplicationError extends Error {
    constructor(message, status) {
        super();

        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name;

        this.message = message ||
            'Something went wrong. Please try again.';

        this.status = status || 500;
    }
}

class NoCredentialsProvided extends ApplicationError {
    constructor(message) {
        super(message || getStatusText(UNAUTHORIZED), UNAUTHORIZED);
    }
}

module.exports = {
    NoCredentialsProvided,
    ApplicationError
};
