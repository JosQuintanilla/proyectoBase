const ApplicationError = require('./ApplicationError');

class AlreadyExistsError extends ApplicationError {
    constructor(message) {
        super(`${message} already exist`, 401);
    }
}
const alreadyExistsError = new AlreadyExistsError();

module.exports = {
    AlreadyExistsError,
    alreadyExistsError
};