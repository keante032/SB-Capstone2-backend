const express = require("express");

const router = new express.Router();

router.get("/", function (req, res, next) {
    // TODO: retrieve user data from database and put it in res.send()
});

router.post("/", function (req, res, next) {
    // TODO: probably eliminate this; user registration under auth routes?
});

router.patch("/", function (req, res, next) {
    // TODO: update existing user in database
});

router.delete("/", function (req, res, next) {
    // TODO: delete user from database
});


module.exports = router;