const ApplicationError = require('./ApplicationError');

class AccessDeniedError extends ApplicationError {
    constructor(message) {
        super(message || 'Access denied.', 403);
    }
}
module.exports = AccessDeniedError;