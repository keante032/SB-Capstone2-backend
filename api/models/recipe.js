const db = require("../db");

/**
 * Recipe model has static methods that handle communicating with PostgreSQL to make changes to the recipes table
 */
class Recipe {
    /**
     * Add a new recipe in the database
     * This is done by finding the user in the user table to get the user_id
     * Then we insert the recipe into the recipes table
     */
    static async add(username, { public, name, description, ingredients, directions }) {
        // find user in database
        const userResult = await db.query(
            `SELECT id, username
            FROM users
            WHERE username = $1`,
            [username]
        );
        const user = userResult.rows[0];

        // add new recipe to database, then return recipe object
        const result = await db.query(
            `INSERT INTO recipes
            (owner_id, public, name, description, ingredients, directions)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, owner_id AS "ownerId", public, name, description, ingredients, directions`,
            [user.id, public, name, description, ingredients, directions]
        );
        const recipe = result.rows[0];

        return recipe;
    }

    /**
     * Get one recipe from the database
     */
    static async get(username, recipeId) {
        // find recipe in database
        const result = await db.query(
            `SELECT id, owner_id AS "ownerId", public, name, description, ingredients, directions
            FROM recipes
            WHERE id = $1`,
            [recipeId]
        );
        const recipe = result.rows[0];

        if (!recipe.public) {
            // find user in database
            const userResult = await db.query(
                `SELECT id, username, is_admin AS "isAdmin"
                FROM users
                WHERE username = $1`,
                [username]
            );
            const user = userResult.rows[0];

            // check if user is not an admin and not the owner
            if (!user.isAdmin && recipe.ownerId !== user.id) {
                throw new Error(`Unauthorized`);
            }
        }

        

        return recipe;
    }

    /**
     * Edit a recipe in the database
     */
    static async edit(username, recipeId, { public, name, description, ingredients, directions }) {
        // find user in database
        const userResult = await db.query(
            `SELECT id, username
            FROM users
            WHERE username = $1`,
            [username]
        );
        const user = userResult.rows[0];

        // find recipe in database
        const result = await db.query(
            `SELECT id, owner_id AS "ownerId"
            FROM recipes
            WHERE id = $1`,
            [recipeId]
        );
        const recipe = result.rows[0];

        // check if user is not an admin and not the owner
        if (!user.isAdmin && recipe.ownerId !== user.id) {
            throw new Error(`Unauthorized`);
        }

        // edit recipe in database
        const editResult = await db.query(
            `UPDATE recipes
            SET public = $1, name = $2, description = $3, ingredients = $4, directions = $5
            WHERE id = $6
            RETURNING id, owner_id AS "ownerId", public, name, description, ingredients, directions`,
            [public, name, description, ingredients, directions, recipeId]
        );
        const editedRecipe = editResult.rows[0];

        return editedRecipe;
    }

    /**
     * Delete a recipe from the database
     */
    static async delete(username, recipeId) {
        // find user in database
        const userResult = await db.query(
            `SELECT id, username
            FROM users
            WHERE username = $1`,
            [username]
        );
        const user = userResult.rows[0];

        // find recipe in database
        const result = await db.query(
            `SELECT id, owner_id AS "ownerId"
            FROM recipes
            WHERE id = $1`,
            [recipeId]
        );
        const recipe = result.rows[0];

        // check if user is the owner
        if (recipe.ownerId !== user.id) {
            throw new Error(`Unauthorized`);
        }

        // delete recipe from database
        const deleteResult = await db.query(
            `DELETE FROM recipes
            WHERE id = $1`,
            [recipeId]
        );

        // returns undefined
    }
}

module.exports = Recipe;