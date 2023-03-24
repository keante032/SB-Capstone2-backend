const express = require("express");

const User = require("../models/user");
const { ensureCorrectUserOrAdmin } = require("../middleware/auth");

const router = new express.Router();

/** Get details of user (don't actually see a use for this yet)
 * GET /users/:username
 * expects req.headers.authorization to be a valid token obtained from /auth/register or /auth/token
 * returns { user: { id, username, isAdmin } }
 */
router.get("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        const user = await User.get(req.params.username);
        return res.json({ user });
    } catch (err) {
        return next(err);
    }
});

// I am leaving out a patch or put route for now
// I can add it later if I want to allow users to change their username or password

// I am leaving out a delete route for now
// I can add it later if I want to allow users to delete their accounts

module.exports = router;