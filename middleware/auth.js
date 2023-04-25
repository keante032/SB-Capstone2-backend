const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../helpers/errorWithStatusCode");

/**
 * Verify token and, if valid, store its payload (username and isAdmin) on res.locals.
 * If no token was provided or if it is invalid, we don't throw an error, we just
 * leave res.locals.user undefined.
 * 
 * This one is used on everything.
 */
function authenticateJWT(req, res, next) {
    try {
        const authHeader = req.headers && req.headers.authorization;
        if (authHeader) {
            const token = authHeader.trim();
            res.locals.user = jwt.verify(token, SECRET_KEY);
        }
        return next();
    } catch (err) {
        return next();
    }
}

function ensureLoggedIn(req, res, next) {
    try {
        if (!res.locals.user) throw new UnauthorizedError();
        return next();
    } catch (err) {
        return next(err);
    }
}

function ensureCorrectUserOrAdmin(req, res, next) {
    try {
        const user = res.locals.user;
        if (!(user && (user.isAdmin || user.username === req.params.username))) {
            throw new UnauthorizedError();
        }
        return next();
    } catch (err) {
        return next(err);
    }
}

module.exports = {
    authenticateJWT,
    ensureLoggedIn,
    ensureCorrectUserOrAdmin
};