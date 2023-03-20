const express = require("express");

const app = express();

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); // TODO: update '*' to match the domain of deployed frontend
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get("/", function (req, res, next) {
    // TODO: retrieve user or recipe data from database and put it in res.send()
});

app.post("/", function (req, res, next) {
    // TODO: add new recipe to database
});

app.patch("/", function (req, res, next) {
    // TODO: update existing recipe in database
});

app.delete("/", function (req, res, next) {
    // TODO: delete recipe from database
});