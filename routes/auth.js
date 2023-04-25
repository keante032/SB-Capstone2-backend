const express = require("express");
const { validateUserAuthSchema } = require("../middleware/schemaValidator");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");

const router = new express.Router();

/** Register a new user, provide token
 * POST /auth/register
 * expects { username, password }
 * returns { username, token }
 */
router.post("/register", validateUserAuthSchema, async function (req, res, next) {
    try {
        // if user tries to slip something else in req.body like an isAdmin: true, we'll ignore it
        // we only allow them to set username and password
        const { username, password } = req.body;
        const user = await User.register(username, password);
        const token = createToken(user);
        return res.status(201).json({ username: user.username, token });
    } catch (err) {
        return next(err);
    }
});

/** Provide token for an existing user
 * POST /auth/token
 * expects { username, password }
 * returns { username, token }
 */
router.post("/token", validateUserAuthSchema, async function (req, res, next) {
    try {
        const { username, password } = req.body;
        const user = await User.authenticate(username, password);
        const token = createToken(user);
        return res.json({ username: user.username, token });
    } catch (err) {
        return next(err);
    }
});


module.exports = router;