const {
    BAD_REQUEST_CODE,
    UNAUTHORIZED_CODE,
    NOT_FOUND_CODE,
    CONFLICT_CODE,
    VALIDATION_ERROR_CODE, FORBIDDEN_CODE
} = require('./status-code');
const {
    VALIDATION_ERROR,
    SOMETHING_WENT_WRONG } = require('../utils/constants');

class AuthError extends Error {
    status = UNAUTHORIZED_CODE;
    message;
    errors;

    constructor(message, errors = null) {
        super();
        this.message = message;
        this.errors = errors;
    }
}

class BadRequest extends Error {
    status = BAD_REQUEST_CODE;
    message;
    errors
    constructor(message, errors = null) {
        super();
        this.message = message;
        this.errors = errors
    }
}

class Conflict extends Error {
    status = CONFLICT_CODE;
    message;
    errors;

    constructor(message, errors = null) {
        super();
        this.message = message;
        this.errors = errors;
    }
}

class NotFound extends Error {
    status = NOT_FOUND_CODE;
    message;
    errors;

    constructor(message, errors = null) {
        super();
        this.message = message;
        this.errors = errors;
    }
}

class ValidationError extends Error {
    status = VALIDATION_ERROR_CODE;
    message = VALIDATION_ERROR;
    errors;

    constructor(errors) {
        super();
        this.errors = errors;
    }
}

class ServiceUnavailable extends Error {
    status = BAD_REQUEST_CODE;
    message = SOMETHING_WENT_WRONG;
    errors;

    constructor(message, errors = null) {
        super();

        if (errors) {
            this.message = message;
            this.errors = errors;
        } else {
            if (typeof message === 'string') {
                this.message = message;
            } else {
                this.errors = message;
            }
        }
    }
}

class AccessClosed extends Error {
    status = FORBIDDEN_CODE;
    message;
    errors
    constructor(message, errors = null) {
        super();
        this.message = message;
        this.errors = errors;
    }
}

module.exports = {
    BadRequest,
    Conflict,
    ValidationError,
    AuthError,
    NotFound,
    ServiceUnavailable,
    AccessClosed
}