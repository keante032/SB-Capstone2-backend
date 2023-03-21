const express = require("express");
const morgan = require('morgan');
const authRoutes = require("./routes/auth");
const recipesRoutes = require("./routes/recipes");
const usersRoutes = require("./routes/users");

const app = express();

app.use(express.json());
app.use(morgan('tiny'));

app.use("/auth", authRoutes);
app.use("/recipes", recipesRoutes);
app.use("/users", usersRoutes);

app.use(function (req, res, next) {
    // TODO: update '*' to match the domain of deployed frontend
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

module.exports = app;