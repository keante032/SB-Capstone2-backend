require("dotenv").config();
require("colors");

const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";

const PORT = +process.env.PORT || 3001;

// pick right database for the mode we're in (dev/test/prod)
function getDatabaseUri() {
    return (process.env.NODE_ENV === "test")
        ? "postgres://@localhost:5433/recipe_app_test"
        : process.env.DATABASE_URL || "postgres://@localhost:5433/recipe_app";
}

// if we're in test mode, speed up bcrypt
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

console.log("Recipe App Config:".green);
console.log("SECRET_KEY:".yellow, SECRET_KEY);
console.log("PORT:".yellow, PORT.toString());
console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR);
console.log("Database:".yellow, getDatabaseUri());
console.log("---");

module.exports = {
    SECRET_KEY,
    PORT,
    BCRYPT_WORK_FACTOR,
    getDatabaseUri,
};
