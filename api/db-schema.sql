CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(32) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,
    owner_id INTEGER
        REFERENCES users ON DELETE CASCADE,
    public BOOLEAN NOT NULL DEFAULT FALSE,
    name TEXT NOT NULL,
    description TEXT,
    ingredients JSONB NOT NULL,
    directions JSONB NOT NULL
);

CREATE TABLE saves (
    id SERIAL PRIMARY KEY,
    user_id INTEGER
        REFERENCES users ON DELETE CASCADE,
    recipe_id INTEGER
        REFERENCES recipes ON DELETE CASCADE
);
