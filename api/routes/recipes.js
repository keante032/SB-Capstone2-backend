const express = require("express");

const router = new express.Router();

router.get("/", function (req, res, next) {
    // TODO: retrieve recipe data from database and put it in res.send()
});

router.post("/", function (req, res, next) {
    // TODO: add new recipe to database
});

router.patch("/", function (req, res, next) {
    // TODO: update existing recipe in database
});

router.delete("/", function (req, res, next) {
    // TODO: delete recipe from database
});


module.exports = router;