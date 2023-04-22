/** These middlewares separate the validation logic from the route logic. */

const jsonschema = require("jsonschema");
const userAuthSchema = require("../schemas/userAuth.json");
const newRecipeSchema = require("../schemas/recipeNew.json");
const editRecipeSchema = require("../schemas/recipePatch.json");
const { BadRequestError } = require("../helpers/errorWithStatusCode");

function validateUserAuthSchema(req, res, next) {
    const validator = jsonschema.validate(req.body, userAuthSchema);
    if (!validator.valid) {
        let listOfErrors = validator.errors.map(error => error.stack);
        let error = new Error(listOfErrors);
        error.status = 400;
        return next(error);
    }
    next();
}

function validateNewRecipeSchema(req, res, next) {
    const validator = jsonschema.validate(req.body, newRecipeSchema);
    if (!validator.valid) {
        let listOfErrors = validator.errors.map(error => error.stack);
        let error = new BadRequestError(listOfErrors);
        return next(error);
    }
    next();
}

function validateEditRecipeSchema(req, res, next) {
    const validator = jsonschema.validate(req.body, editRecipeSchema);
    if (!validator.valid) {
        let listOfErrors = validator.errors.map(error => error.stack);
        let error = new BadRequestError(listOfErrors);
        return next(error);
    }
    next();
}

module.exports = { validateUserAuthSchema, validateNewRecipeSchema, validateEditRecipeSchema };