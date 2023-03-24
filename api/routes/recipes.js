const express = require("express");

const Recipe = require("../models/recipe");
const { ensureLoggedIn } = require("../middleware/auth");
const { validateRecipeSchema } = require("../middleware/schemaValidator");

const router = new express.Router();

/** Get details of recipe
 * GET /recipes/:id
 * expects req.headers.authorization to be a valid token obtained from /auth/register or /auth/token,
 * but only if the recipe is private; if it's publiclyShared, no user info is needed
 * returns { recipe: { id, ownerId, publiclyShared, name, description, ingredients, directions } }
 */
router.get("/:id", async function (req, res, next) {
    try {
        const { username } = res.locals;
        const { id } = req.params;
        const recipe = await Recipe.get(username, id);
        return res.json({ recipe });
    } catch (err) {
        return next(err);
    }
});

/** Add new recipe
 * POST /recipes/
 * expects req.headers.authorization to be a valid token obtained from /auth/register or /auth/token
 * expects { publiclyShared, name, description, ingredients, directions }
 * returns { recipe: { id, ownerId, publiclyShared, name, description, ingredients, directions } }
 */
router.post("/", ensureLoggedIn, validateRecipeSchema, async function (req, res, next) {
    try {
        const { username } = res.locals;
        const recipe = await Recipe.add(username, req.body);
        return res.json({ recipe });
    } catch (err) {
        return next(err);
    }
});

/** Update existing recipe
 * PUT /recipes/:id
 * expects req.headers.authorization to be a valid token obtained from /auth/register or /auth/token
 * expects { publiclyShared, name, description, ingredients, directions }
 * returns { recipe: { id, ownerId, publiclyShared, name, description, ingredients, directions } }
 */
router.put("/:id", ensureLoggedIn, validateRecipeSchema, async function (req, res, next) {
    try {
        const { username } = res.locals;
        const { id } = req.params;
        // inside of Recipe.edit, we will check if the user is the owner of the recipe
        const recipe = await Recipe.edit(username, id, req.body);
        return res.json({ recipe });
    } catch (err) {
        return next(err);
    }
});

/** Delete existing recipe
 * DELETE /recipes/:id
 * expects req.headers.authorization to be a valid token obtained from /auth/register or /auth/token
 * returns { deleted: { recipeId, recipeName, message } }
 */
router.delete("/:id", ensureLoggedIn, async function (req, res, next) {
    try {
        const { username } = res.locals;
        const { id } = req.params;
        // inside of Recipe.delete, we will check if the user is the owner of the recipe
        const deleted = await Recipe.delete(username, id);
        return res.json({ deleted });
    } catch (err) {
        return next(err);
    }
});


module.exports = router;