/** tests for ../routes/users.js */
const request = require('supertest');
const app = require('../app');
const db = require('../db');
const User = require('../models/user');
const { createToken } = require('../helpers/tokens');

let testUser;
let testUser2;
let adminUser;

beforeEach(async () => {
    await db.query('DELETE FROM users');
    testUser = await User.register('testuser', 'password');
    testUser.token = createToken(testUser);
    testUser2 = await User.register('testuser2', 'password');
    testUser2.token = createToken(testUser2);
    adminUser = await User.register('adminuser', 'password', true);
    adminUser.token = createToken(adminUser);
});

afterEach(async () => {
    await db.query('DELETE FROM users');
});

afterAll(async () => {
    await db.end();
});

describe('GET /users/:username', () => {
    test('works for admin', async () => {
        const response = await request(app)
            .get(`/users/${testUser.username}`)
            .set({ authorization: adminUser.token });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            user: {
                id: testUser.id,
                username: testUser.username,
                isAdmin: testUser.isAdmin
            }
        });
    });

    test('works for correct user', async () => {
        const response = await request(app)
            .get(`/users/${testUser.username}`)
            .set({ authorization: testUser.token });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            user: {
                id: testUser.id,
                username: testUser.username,
                isAdmin: testUser.isAdmin
            }
        });
    });

    test('unauth for incorrect user', async () => {
        const response = await request(app)
            .get(`/users/${testUser2.username}`)
            .set({ authorization: testUser.token });
        expect(response.statusCode).toBe(401);
    });

    test('unauth for anon', async () => {
        const response = await request(app)
            .get(`/users/${testUser.username}`);
        expect(response.statusCode).toBe(401);
    });
});