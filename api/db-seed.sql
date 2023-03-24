INSERT INTO users (username, password, is_admin)
VALUES (
    'admin_kev',
    '$2b$12$4wasFQyGVqZv1Uu3MdGC.er1zYgbpYpsrwrsSlIi.HVshcuGmWhH6',
    TRUE
);

INSERT INTO recipes (owner_id, public, name, description, ingredients, directions)
VALUES (
    1,
    TRUE,
    'PBJ',
    'A classic peanut butter & jelly sandwich.',
    '[
        {
            "item": "bread",
            "count": 2,
            "unit": "slices"
        },
        {
            "item": "peanut butter"
        },
        {
            "item": "jelly"
        }
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
        {
            "item": "ground beef",
            "count": 1,
            "unit": "pound"
        },
        {
            "item": "taco seasoning",
            "count": 1,
            "unit": "packet"
        },
        {
            "item": "water",
            "count": 0.5,
            "unit": "cup"
        },
        {
            "item": "sour cream",
            "count": 1,
            "unit": "cup"
        },
        {
            "item": "shredded cheddar cheese",
            "count": 1,
            "unit": "cup"
        },
        {
            "item": "crushed taco chips",
            "count": 2,
            "unit": "cups"
        },
        {
            "item": "crescent rolls",
            "count": 1,
            "unit": "8-ounce can"
        },
        {
            "item": "lettuce"
        },
        {
            "item": "taco sauce"
        }
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
