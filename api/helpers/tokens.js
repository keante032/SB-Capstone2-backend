const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

/** accept user data, return signed JWT */
function createToken(user) {
    let payload = {
        username: user.username,
        isAdmin: user.isAdmin || false
    };

    return jwt.sign(payload, SECRET_KEY);
}

module.exports = { createToken };