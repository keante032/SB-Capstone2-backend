const db = require("../db");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config.js");
const { BadRequestError, UnauthorizedError } = require("../helpers/errorWithStatusCode.js");

/**
 * User model has static methods that handle communicating with PostgreSQL
 * to make changes to the users table and the saves table
 */
class User {
    /**
     * Authenticate a user by comparing the provided password to the hashed password in the database
     */
    static async authenticate(username, password) {
        // find user in database
        const result = await db.query(
            `SELECT id, username, password, is_admin AS "isAdmin"
            FROM users
            WHERE username = $1`,
            [username]
        );
        const user = result.rows[0];

        // compare password to hashed password found in database
        const isValid = await bcrypt.compare(password, user.password);

        // if passwords match, we'll return the user object
        // but we remove the password from that object before we return it
        // { id, username, isAdmin }
        if (isValid === true) {
            delete user.password;
            return user;
        }

        // if we get here, then one or both of the username and the password must have been incorrect
        throw new UnauthorizedError('Invalid username or password');
    }

    /**
     * Add a new user in the database
     */
    static async register(username, password, isAdmin=false) {
        // query user table for this username, throw error if found
        const checkForDuplicate = await db.query(
            `SELECT username
            FROM users
            WHERE username = $1`,
            [username]
        );
        if (checkForDuplicate.rows[0]) throw new BadRequestError('That username already exists.')

        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

        // add new user to database, then return details less the password
        // { id, username, isAdmin }
        const result = await db.query(
            `INSERT INTO users
            (username, password, is_admin)
            VALUES ($1, $2, $3)
            RETURNING id, username, is_admin AS "isAdmin"`,
            [username, hashedPassword, isAdmin]
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
            `SELECT id, username, is_admin AS "isAdmin"
            FROM users
            WHERE username = $1`,
            [username]
        );
        const user = result.rows[0];

        // if user not found, throw error
        if (!user) throw new NotFoundError(`No user: ${username}`);

        // else return user object
        // { id, username, isAdmin }
        return user;
    }

    // I am leaving out an update method for now
    // I can add it later if I want to allow users to change their username or password

    // I am leaving out a delete method for now
    // I can add it later if I want to allow users to delete their accounts
}

module.exports = User;