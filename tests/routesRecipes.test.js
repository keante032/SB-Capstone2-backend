/** tests for ../routes/recipes.js */
const request = require('supertest');
const app = require('../app');
const db = require('../db');
const Recipe = require('../models/recipe');
const User = require('../models/user');
const { createToken } = require('../helpers/tokens');

let testUser;
let testRecipe;
let testUser2;

beforeEach(async () => {
    await db.query('DELETE FROM users');
    await db.query('DELETE FROM recipes');
    testUser = await User.register('testuser', 'password');
    testUser.token = createToken(testUser);
    testRecipe = await Recipe.add(testUser.username, {
        name: 'test recipe',
        description: 'test description',
        ingredients: ['test ing 1', 'test ing 2'],
        directions: ['test dir 1', 'test dir 2'],
    });
    testUser2 = await User.register('testuser2', 'password');
    testUser2.token = createToken(testUser2);
});

afterEach(async () => {
    await db.query('DELETE FROM users');
    await db.query('DELETE FROM recipes');
});

afterAll(async () => {
    await db.end();
});

describe('GET /recipes/search/:searchTerm', () => {
    test('should return a list of recipes', async () => {
        const response = await request(app)
            .get('/recipes/search/test')
            .set({ authorization: testUser.token });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            recipes: expect.any(Array)
        });
    });

    test('should return a 401 if no token is provided', async () => {
        const response = await request(app)
            .get('/recipes/search/test');
        expect(response.statusCode).toBe(401);
    });

    test('should return a 401 if an invalid token is provided', async () => {
        const response = await request(app)
            .get('/recipes/search/test')
            .set({ authorization: 'invalidtoken' });
        expect(response.statusCode).toBe(401);
    });

    test('should return empty list if no public recipes or recipes belonging to user in db', async () => {
        const response = await request(app)
            .get('/recipes/search/test')
            .set({ authorization: testUser2.token });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            recipes: []
        });
    });
});

describe('GET /recipes/my', () => {
    test('should return a list of recipes', async () => {
        const response = await request(app)
            .get('/recipes/my')
            .set({ authorization: testUser.token });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            recipes: expect.any(Array)
        });
    });

    test('should return a 401 if no token is provided', async () => {
        const response = await request(app)
            .get('/recipes/my');
        expect(response.statusCode).toBe(401);
    });

    test('should return a 401 if an invalid token is provided', async () => {
        const response = await request(app)
            .get('/recipes/my')
            .set({ authorization: 'invalidtoken' });
        expect(response.statusCode).toBe(401);
    });

    test('should return empty list if no recipes belonging to user in db', async () => {
        const response = await request(app)
            .get('/recipes/my')
            .set({ authorization: testUser2.token });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            recipes: []
        });
    });
});

describe('GET /recipes/public', () => {
    test('should return a list of recipes', async () => {
        const response = await request(app)
            .get('/recipes/public')
            .set({ authorization: testUser.token });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            recipes: []
        });
    });
});

describe('GET /recipes/:id', () => {
    test('should return a recipe', async () => {
        const response = await request(app)
            .get(`/recipes/${testRecipe.id}`)
            .set({ authorization: testUser.token });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            recipe: {
                id: testRecipe.id,
                ownerId: testUser.id,
                ownerName: testUser.username,
                publiclyShared: testRecipe.publiclyShared,
                name: testRecipe.name,
                description: testRecipe.description,
                ingredients: testRecipe.ingredients,
                directions: testRecipe.directions,
            }
        });
    });

    test('should return a 404 if recipe is not found', async () => {
        const response = await request(app)
            .get('/recipes/0')
            .set({ authorization: testUser.token });
        expect(response.statusCode).toBe(404);
    });
});

describe('POST /recipes', () => {
	test('should return a recipe', async () => {
        const response = await request(app)
            .post('/recipes')
            .send({
                publiclyShared: true,
                name: 'test recipe 2',
                description: 'test description 2',
                ingredients: ['test ing 1', 'test ing 2'],
                directions: ['test dir 1', 'test dir 2'],
            })
            .set({ authorization: testUser.token });
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({
            recipe: {
                id: expect.any(Number),
                ownerId: testUser.id,
                publiclyShared: true,
                name: 'test recipe 2',
                description: 'test description 2',
                ingredients: ['test ing 1', 'test ing 2'],
                directions: ['test dir 1', 'test dir 2']
            }
        });
    });

    test('should return a 401 if no token is provided', async () => {
        const response = await request(app)
            .post('/recipes')
            .send({
                publiclyShared: true,
                name: 'test recipe 3',
                description: 'test description 3',
                ingredients: ['test ing 1', 'test ing 2'],
                directions: ['test dir 1', 'test dir 2']
            });
        expect(response.statusCode).toBe(401);
    });

    test('should return a 401 if an invalid token is provided', async () => {
        const response = await request(app)
            .post('/recipes')
            .send({
                publiclyShared: true,
                name: 'test recipe 4',
                description: 'test description 4',
                ingredients: ['test ing 1', 'test ing 2'],
                directions: ['test dir 1', 'test dir 2']
            })
            .set({ authorization: 'invalidtoken' });
        expect(response.statusCode).toBe(401);
    });

    test('should return a 400 if name is not provided', async () => {
        const response = await request(app)
            .post('/recipes')
            .send({
                publiclyShared: true,
                description: 'test description 5',
                ingredients: ['test ing 1', 'test ing 2'],
                directions: ['test dir 1', 'test dir 2']
            })
            .set({ authorization: testUser.token });
        expect(response.statusCode).toBe(400);
    });

    test('if publiclyShared is not provided, it should default to false', async () => {
        const response = await request(app)
            .post('/recipes')
            .send({
                name: 'test recipe 6',
                description: 'test description 6',
                ingredients: ['test ing 1', 'test ing 2'],
                directions: ['test dir 1', 'test dir 2']
            })
            .set({ authorization: testUser.token });
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({
            recipe: {
                id: expect.any(Number),
                ownerId: testUser.id,
                publiclyShared: false,
                name: 'test recipe 6',
                description: 'test description 6',
                ingredients: ['test ing 1', 'test ing 2'],
                directions: ['test dir 1', 'test dir 2']
            }
        });
    });
});

describe('PATCH /recipes/:id', () => {
	test('should return a recipe', async () => {
        const response = await request(app)
            .patch(`/recipes/${testRecipe.id}`)
            .send({ description: 'UPDATED TEST DESCRIPTION' })
            .set({ authorization: testUser.token });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            recipe: {
                id: testRecipe.id,
                ownerId: testUser.id,
                publiclyShared: testRecipe.publiclyShared,
                name: testRecipe.name,
                description: 'UPDATED TEST DESCRIPTION',
                ingredients: testRecipe.ingredients,
                directions: testRecipe.directions
            }
        });
    });

    test('should return a 401 if no token is provided', async () => {
        const response = await request(app)
            .patch(`/recipes/${testRecipe.id}`)
            .send({ description: 'UPDATED TEST DESCRIPTION' });
        expect(response.statusCode).toBe(401);
    });

    test('should return a 401 if an invalid token is provided', async () => {
        const response = await request(app)
            .patch(`/recipes/${testRecipe.id}`)
            .send({ description: 'UPDATED TEST DESCRIPTION' })
            .set({ authorization: 'invalidtoken' });
        expect(response.statusCode).toBe(401);
    });

    test('should return a 401 if token does not match owner of recipe', async () => {
        const response = await request(app)
            .patch(`/recipes/${testRecipe.id}`)
            .send({ description: 'UPDATED TEST DESCRIPTION' })
            .set({ authorization: testUser2.token });
        expect(response.statusCode).toBe(401);
    });
});

describe('DELETE /recipes/:id', () => {
	test('should return an object with message', async () => {
        const response = await request(app)
            .delete(`/recipes/${testRecipe.id}`)
            .set({ authorization: testUser.token });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            deleted: {
                recipeId: testRecipe.id.toString(),
                recipeName: testRecipe.name,
                message: 'Recipe deleted'
            }
        });
    });

    test('should return a 401 if no token is provided', async () => {
        const response = await request(app)
            .delete(`/recipes/${testRecipe.id}`);
        expect(response.statusCode).toBe(401);
    });

    test('should return a 401 if an invalid token is provided', async () => {
        const response = await request(app)
            .delete(`/recipes/${testRecipe.id}`)
            .set({ authorization: 'invalidtoken' });
        expect(response.statusCode).toBe(401);
    });

    test('should return a 401 if token does not match owner of recipe', async () => {
        const response = await request(app)
            .delete(`/recipes/${testRecipe.id}`)
            .set({ authorization: testUser2.token });
        expect(response.statusCode).toBe(401);
    });
});