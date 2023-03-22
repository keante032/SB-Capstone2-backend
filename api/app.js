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

/** Avoid CORS issues */
app.use(function (req, res, next) {
    // TODO: update '*' to match the domain of deployed frontend
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

/** Handle 404 errors for everything that doesn't match a route */
app.use(function (req, res, next) {
    return next(new Error("Not Found"));
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
    // log the error stack in development and production modes, but not in test mode
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    // the default status is 500 Internal Server Error
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error: { message, status }
    });
});

module.exports = app;