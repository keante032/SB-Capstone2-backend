const db = require("../db");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config.js");

/**
 * User model has static methods that handle communicating with PostgreSQL to make changes to the users table 
 */
class User {
    /**
     * Authenticate a user by comparing the provided password to the hashed password in the database
     */
    static async authenticate(username, password) {
        // find user in database
        const result = await db.query(
            `SELECT username, password, email, is_admin AS "isAdmin"
            FROM users
            WHERE username = $1`,
            [username]
        );
        const user = result.rows[0];

        // compare password to hashed password found in database
        const isValid = await bcrypt.compare(password, user.password);

        // if passwords match, we'll return the user object
        // but we remove the password from that object before we return it
        if (isValid === true) {
            delete user.password;
            return user;
        }

        // if we get here, then one or both of the username and the password must have been incorrect
        // TODO: determine if this basic error is okay, or should do something fancier with some error classes
        throw new Error('Invalid username or password');
    }

    /**
     * Add a new user in the database
     */
    static async register({ username, password, email, isAdmin }) {
        // query user table for this username, throw error if found
        const checkForDuplicate = await db.query(
            `SELECT username
            FROM users
            WHERE username = $1`,
            [username]
        );
        if (duplicateCheck.rows[0]) throw new Error('That username already exists.')

        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

        // add new user to database, then return details less the password
        const result = await db.query(
            `INSERT INTO users
            (username, password, email, is_admin)
            VALUES ($1, $2, $3, $4)
            RETURNING username, email, is_admin AS "isAdmin"`,
            [username, hashedPassword, email, isAdmin]
        );
        const user = result.rows[0];
        return user;
    }

    /**
     * Get user details from the database
     */
    static async get(username) {
        // find user in database
        const result = await db.query(
            `SELECT username, email, is_admin AS "isAdmin"
            FROM users
            WHERE username = $1`,
            [username]
        );
        const user = result.rows[0];

        // if user not found, throw error
        if (!user) throw new Error(`No user: ${username}`);

        // else return user object
        return user;
    }

    // I am leaving out an update method for now
    // I can add it later if I want to allow users to change their username, email, or password

    // I am leaving out a delete method for now
    // I can add it later if I want to allow users to delete their accounts

    /**
     * Save a recipe to the user's list of saved recipes
     */
    static async saveRecipe(username, recipeId) {
        // find user in database
        const result = await db.query(
            `SELECT id
            FROM users
            WHERE username = $1`,
            [username]
        );
        const user = result.rows[0];

        // if user not found, throw error
        if (!user) throw new Error(`No user: ${username}`);

        // add new row to saves table
        const saveResult = await db.query(
            `INSERT INTO saves
            (user_id, recipe_id)
            VALUES ($1, $2)
            RETURNING id`,
            [user.id, recipeId]
        );
        const save = saveResult.rows[0];

        // return save object
        return save;
    }
}

module.exports = User;