class NoCredentialsProvided extends Error {
    constructor(message, status) {
        super();

        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name;

        this.message = message ||
            'Please provide user and password';

        this.status = status || 400;
    }
}

module.exports = NoCredentialsProvided;