// extend the Error class to add a status code
class ErrorWithStatusCode extends Error {
    constructor(message, status) {
        super();
        this.message = message;
        this.status = status;
    }
}

// extend ErrorWithStatusCode into several specific errors
class BadRequestError extends ErrorWithStatusCode {
    constructor(message = 'Bad Request') {
        super(message, 400);
    }
}

class UnauthorizedError extends ErrorWithStatusCode {
    constructor(message = 'Unauthorized') {
        super(message, 401);
    }
}

class NotFoundError extends ErrorWithStatusCode {
    constructor(message = 'Not Found') {
        super(message, 404);
    }
}

class InternalServerError extends ErrorWithStatusCode {
    constructor(message = 'Internal Server Error') {
        super(message, 500);
    }
}

module.exports = {
    ErrorWithStatusCode,
    BadRequestError,
    UnauthorizedError,
    NotFoundError,
    InternalServerError
};