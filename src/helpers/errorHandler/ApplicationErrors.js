const { NO_CONTENT,
    INTERNAL_SERVER_ERROR,
    UNAUTHORIZED,
    FORBIDDEN,
    NOT_FOUND,
    BAD_REQUEST,
    CONFLICT,
    getStatusText } = require('http-status-codes');
const config = require('../../../config');

/**
 * Clase generica para un error en la aplicación Club
 * heredada de Error JS para obtener el strack trace.
 */
class ApplicationError extends Error {
    /**
     * 
     * @param {string} message - Mensaje del error
     * @param {number} status - Estado del error. HTTP protocol
     */
    constructor(message, status) {
        super();
        if (config.env !== 'production') {
            Error.captureStackTrace(this, this.constructor);
        }

        this.name = this.constructor.name;
        this.status = status;
        this.codError = status || INTERNAL_SERVER_ERROR;
        this.message = message || 'Something went wrong. Please try again.';
    }
}

/**
 * 404 - Error para notificar que la solicitud se ha cursado sin contenido
 */
class NoContentError extends ApplicationError {
    constructor(message) {
        super(message || getStatusText(NO_CONTENT), NO_CONTENT);
    }
}

/**
 * 
 */
class NoCredentialsProvided extends ApplicationError {
    constructor(message) {
        super(message || getStatusText(UNAUTHORIZED), UNAUTHORIZED);
    }
}

class AccessDeniedError extends ApplicationError {
    constructor(message) {
        super(message || getStatusText(FORBIDDEN), FORBIDDEN);
    }
}

class InternalServerError extends ApplicationError {
    constructor(message) {
        super(message || getStatusText(INTERNAL_SERVER_ERROR), INTERNAL_SERVER_ERROR);
    }
}


class NotFoundError extends ApplicationError {
    /** Construye el objeto de error para un codigo  */
    constructor(message) {
        super(message || getStatusText(NOT_FOUND), NOT_FOUND);
    }
}

class BadRequestError extends ApplicationError {
    constructor(message) {
        super(message || getStatusText(BAD_REQUEST), BAD_REQUEST);
    }
}


class AlreadyExistsError extends ApplicationError {
    constructor(message) {
        super(message || getStatusText(CONFLICT), CONFLICT);
    }
}
module.exports = {
    ApplicationError,
    NoContentError,
    InternalServerError,
    NoCredentialsProvided,
    AccessDeniedError,
    NotFoundError,
    BadRequestError,
    AlreadyExistsError
};