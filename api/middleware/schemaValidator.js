/** These middlewares separate the validation logic from the route logic. */

const jsonschema = require("jsonschema");
const userAuthSchema = require("../schemas/userAuth.json");
const recipeSchema = require("../schemas/recipe.json");

function validateUserAuthSchema(req, res, next) {
    const validator = jsonschema.validate(req.body, userAuthSchema);
    if (!validator.valid) {
        let listOfErrors = validator.errors.map(error => error.stack);
        let error = new Error(listOfErrors);
        error.status = 400;
        return next(error);
    }
}

function validateRecipeSchema(req, res, next) {
    const validator = jsonschema.validate(req.body, recipeSchema);
    if (!validator.valid) {
        let listOfErrors = validator.errors.map(error => error.stack);
        let error = new Error(listOfErrors);
        error.status = 400;
        return next(error);
    }
}

module.exports = { validateUserAuthSchema, validateRecipeSchema };