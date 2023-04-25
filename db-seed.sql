INSERT INTO users (username, password, is_admin)
VALUES (
    'admin_kev',
    '$2b$12$4wasFQyGVqZv1Uu3MdGC.er1zYgbpYpsrwrsSlIi.HVshcuGmWhH6',
    TRUE
);

INSERT INTO recipes (owner_id, publicly_shared, name, description, ingredients, directions)
VALUES (
    1,
    TRUE,
    'PBJ',
    'A classic peanut butter & jelly sandwich.',
    '[
        "2 slices of bread",
        "peanut butter",
        "jelly"
    ]',
    '[
        "Spread the peanut butter on one slice of bread.",
        "Spread the jelly on the other slice of bread.",
        "Put the two slices of bread together to form the sandwich."
    ]'
),
(
    1,
    TRUE,
    'Taco Pie',
    'I learned this one from my grandma.',
    '[
        "1 pound ground beef",
        "1 packet taco seasoning",
        "0.5 cup water",
        "1 cup sour cream",
        "1 cup shredded cheddar cheese",
        "2 cups crushed taco chips",
        "1 8-ounce can crescent rolls",
        "lettuce",
        "taco sauce"
    ]',
    '[
        "Brown the ground beef. Drain the fat if you like, or not.",
        "Add taco seasoning and water, then simmer for 10 minutes.",
        "Remove pan from heat, then add sour cream.",
        "Grease a 9-inch pie pan, then pound the crescent roll dough into it to make a pie shell.",
        "Add about half of the crushed taco chips as the first layer in the pie, followed by the meat mixture, then the shredded cheese, and, finally, top with the rest of the chips.",
        "Bake in the oven at 375 degrees for 20 to 25 minutes.",
        "Set out lettuce and taco sauce for topping individual servings."
    ]'
);
