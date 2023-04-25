/** tests for ../routes/auth.js */
const request = require('supertest');
const app = require('../app');
const db = require('../db');
const User = require('../models/user');

let testUser;
let testUser2;

beforeEach(async () => {
    await db.query('DELETE FROM users');
    testUser = await User.register('testuser', 'password');
    testUser2 = await User.register('testuser2', 'password');
});

afterEach(async () => {
    await db.query('DELETE FROM users');
});

afterAll(async () => {
    await db.end();
});

describe('POST /auth/token', () => {
    test('should login a user', async () => {
        const response = await request(app)
            .post('/auth/token')
            .send({
                username: 'testuser',
                password: 'password'
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            username: 'testuser',
            token: expect.any(String)
        });
    });
    test('should not login a user with invalid credentials', async () => {
        const response = await request(app)
            .post('/auth/token')
            .send({
                username: 'testuser',
                password: 'wrongpassword'
            });
        expect(response.statusCode).toBe(401);
    });
});

describe('POST /auth/register', () => {
    test('should register a user', async () => {
        const response = await request(app)
            .post('/auth/register')
            .send({
                username: 'testuser3',
                password: 'password'
            });
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({
            username: 'testuser3',
            token: expect.any(String)
        });
    });
    test('should not register a user with username that already exists', async () => {
        const response = await request(app)
            .post('/auth/register')
            .send({
                username: 'testuser',
                password: 'password'
            });
        expect(response.statusCode).toBe(400);
    });
});