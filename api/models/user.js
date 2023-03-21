const db = require("../db");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config.js");

class User {
    static async authenticate(username, password) {
        const result = await db.query(
            `SELECT username,
                    password,
                    email,
                    is_admin AS "isAdmin"
            FROM users
            WHERE username = $1`,
            [username]
        );
        const user = result.rows[0];
        const isValid = await bcrypt.compare(password, user.password);
        if (isValid === true) {
            delete user.password;
            return user;
        }

        // TODO: throw error here because username/password did not authenticate
    }

    static async register({ username, password, email, isAdmin }) {
        const checkForDuplicate = await db.query(
            `SELECT username
            FROM users
            WHERE username = $1`,
            [username]
        );
        if (duplicateCheck.rows[0]) {
            // TODO: throw error here because someone already has this username
        }
        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
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
}