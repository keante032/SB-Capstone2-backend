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
    static async add(username, { publiclyShared=false, name, description, ingredients, directions }) {
        // find user in database
        const userResult = await db.query(
            `SELECT id, username
            FROM users
            WHERE username = $1`,
            [username]
        );
        const user = userResult.rows[0];

        // JSON.stringify the arrays so Postgres can store them as JSON
        ingredients = JSON.stringify(ingredients);
        directions = JSON.stringify(directions);

        // add new recipe to database, then return recipe object
        const result = await db.query(
            `INSERT INTO recipes
            (owner_id, publicly_shared, name, description, ingredients, directions)
            VALUES ($1, $2, $3, $4, $5::json, $6::json)
            RETURNING id, owner_id AS "ownerId", publicly_shared AS "publiclyShared", name, description, ingredients, directions`,
            [user.id, publiclyShared, name, description, ingredients, directions]
        );
        const recipe = result.rows[0];

        return recipe;
    }

    /**
     * Get all own recipes
     */
    static async getMine(username) {
        // find user in database
        const userResult = await db.query(
            `SELECT id, username, is_admin AS "isAdmin"
            FROM users
            WHERE username = $1`,
            [username]
        );
        const user = userResult.rows[0];

        // find recipes in database, do not return ingredients or directions
        const result = await db.query(
            `SELECT id, owner_id AS "ownerId", publicly_shared AS "publiclyShared", name, description
            FROM recipes
            WHERE owner_id = $1`,
            [user.id]
        );
        const recipes = result.rows;

        return recipes;
    }

    /**
     * Get all public recipes
     */
    static async getPublic() {
        // find recipes in database, do not return ingredients or directions
        const result = await db.query(
            `SELECT id, owner_id AS "ownerId", publicly_shared AS "publiclyShared", name, description
            FROM recipes
            WHERE publicly_shared = true`
        );
        const recipes = result.rows;

        return recipes;
    }

    /**
     * Find recipes matching the search criteria
     */
    static async find(username, searchTerm) {
        // find user in database
        const userResult = await db.query(
            `SELECT id, username, is_admin AS "isAdmin"
            FROM users
            WHERE username = $1`,
            [username]
        );
        const user = userResult.rows[0];

        // find recipes in database, do not return ingredients or directions
        const result = await db.query(
            `SELECT id, owner_id AS "ownerId", publicly_shared AS "publiclyShared", name, description
            FROM recipes
            WHERE name ILIKE $1
            OR description ILIKE $1
            OR ingredients::json#>>'{0,item}' ILIKE $1
            OR ingredients::json#>>'{1,item}' ILIKE $1
            OR ingredients::json#>>'{2,item}' ILIKE $1
            OR ingredients::json#>>'{3,item}' ILIKE $1
            OR ingredients::json#>>'{4,item}' ILIKE $1
            OR ingredients::json#>>'{5,item}' ILIKE $1
            OR ingredients::json#>>'{6,item}' ILIKE $1
            OR ingredients::json#>>'{7,item}' ILIKE $1
            OR ingredients::json#>>'{8,item}' ILIKE $1
            OR ingredients::json#>>'{9,item}' ILIKE $1
            OR ingredients::json#>>'{10,item}' ILIKE $1
            OR ingredients::json#>>'{11,item}' ILIKE $1
            OR ingredients::json#>>'{12,item}' ILIKE $1
            OR ingredients::json#>>'{13,item}' ILIKE $1
            OR ingredients::json#>>'{14,item}' ILIKE $1
            OR ingredients::json#>>'{15,item}' ILIKE $1
            OR ingredients::json#>>'{16,item}' ILIKE $1
            OR ingredients::json#>>'{17,item}' ILIKE $1
            OR ingredients::json#>>'{18,item}' ILIKE $1
            OR ingredients::json#>>'{19,item}' ILIKE $1
            OR ingredients::json#>>'{20,item}' ILIKE $1
            OR directions::text ILIKE $1`,
            [`%${searchTerm}%`]
        );
        const recipes = result.rows;

        // if user is not an admin, filter to only recipes that are publicly shared or owned by the user
        if (!user.isAdmin) {
            return recipes.filter(r => r.publiclyShared || r.ownerId === user.id);
        }

        return recipes;
    }

    /**
     * Get one recipe from the database
     */
    static async get(username, recipeId) {
        // find recipe in database
        const result = await db.query(
            `SELECT id, owner_id AS "ownerId", publicly_shared AS "publiclyShared", name, description, ingredients, directions
            FROM recipes
            WHERE id = $1`,
            [recipeId]
        );
        const recipe = result.rows[0];
        const nameResult = await db.query(
            `SELECT username
            FROM users
            WHERE id = $1`,
            [recipe.ownerId]
        );
        recipe.ownerName = nameResult.rows[0].username;

        if (!recipe.publiclyShared) {
            // find user in database
            const userResult = await db.query(
                `SELECT id, username, is_admin AS "isAdmin"
                FROM users
                WHERE username = $1`,
                [username]
            );
            const user = userResult.rows[0];

            // check if user is not an admin and not the owner
            if (!user || (!user.isAdmin && recipe.ownerId !== user.id)) {
                throw new Error(`Unauthorized`);
            }
        }

        

        return recipe;
    }

    /**
     * Edit a recipe in the database
     */
    static async edit(username, recipeId, { publiclyShared=null, name=null, description=null, ingredients=null, directions=null }) {
        // // find user in database
        // const userResult = await db.query(
        //     `SELECT id, username
        //     FROM users
        //     WHERE username = $1`,
        //     [username]
        // );
        // const user = userResult.rows[0];

        // // find recipe in database
        // const result = await db.query(
        //     `SELECT id, owner_id AS "ownerId"
        //     FROM recipes
        //     WHERE id = $1`,
        //     [recipeId]
        // );
        // const recipe = result.rows[0];

        // // check if user is not an admin and not the owner
        // if (!user.isAdmin && recipe.ownerId !== user.id) {
        //     throw new Error(`Unauthorized`);
        // }

        // // JSON.stringify the arrays so Postgres can store them as JSON
        // ingredients = JSON.stringify(ingredients);
        // directions = JSON.stringify(directions);

        // // edit recipe in database
        // const editResult = await db.query(
        //     `UPDATE recipes
        //     SET publicly_shared = $1, name = $2, description = $3, ingredients = $4, directions = $5
        //     WHERE id = $6
        //     RETURNING id, owner_id AS "ownerId", publicly_shared AS "publiclyShared", name, description, ingredients, directions`,
        //     [publiclyShared, name, description, ingredients, directions, recipeId]
        // );
        // const editedRecipe = editResult.rows[0];

        // return editedRecipe;

        // refactor the above code so that it only updates the fields that are passed in
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

        // JSON.stringify the arrays so Postgres can store them as JSON
        // but only if they are not null
        if (ingredients !== null) ingredients = JSON.stringify(ingredients);
        if (directions !== null) directions = JSON.stringify(directions);

        // edit recipe in database, modifying only the fields that are passed in while leaving the others unchanged
        const editResult = await db.query(
            `UPDATE recipes
            SET publicly_shared = COALESCE($1, publicly_shared), name = COALESCE($2, name), description = COALESCE($3, description), ingredients = COALESCE($4, ingredients), directions = COALESCE($5, directions)
            WHERE id = $6
            RETURNING id, owner_id AS "ownerId", publicly_shared AS "publiclyShared", name, description, ingredients, directions`,
            [publiclyShared, name, description, ingredients, directions, recipeId]
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
            `SELECT id, owner_id AS "ownerId", name
            FROM recipes
            WHERE id = $1`,
            [recipeId]
        );
        const recipe = result.rows[0];

        // check if user is not an admin and not the owner
        if (!user.isAdmin && recipe.ownerId !== user.id) {
            throw new Error(`Unauthorized`);
        }

        // delete recipe from database
        const deleteResult = await db.query(
            `DELETE FROM recipes
            WHERE id = $1`,
            [recipe.id]
        );

        return {
            recipeId: `${recipe.id}`,
            recipeName: `${recipe.name}`,
            message: `Recipe deleted`
        };
    }
}

module.exports = Recipe;